/* 


Create / delete /  get info 


*/
const express = require("express");
const User = require("../../models/User");
const Project = require("../../models/Project");

const Company = require("../../models/Company");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const router = express.Router();

//@ROUTE post/ api/projects/:team_id
//@DESC  Create Project
//@ACCESS Private + owner

router.post(
  "/:team_id",
  [
    auth,
    check("projectName", "Please provide a name for your project")
      .not()
      .isEmpty(),
    check("description", "Please provide a brief description")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { projectName, description } = req.body;
    try {
      let company = await Company.findOne({
        teams: { $elemMatch: { _id: req.params.team_id } }
      });
      if (!company) {
        return res.status(400).json({ errors: [{ msg: "No team found" }] });
      }
      if (!company.owner == req.user.id) {
        return res.status(400).json({ errors: [{ msg: "Not authorized" }] });
      }
      const project = new Project({
        projectName,
        team_id: req.params.team_id,
        description
      });
      await project.save();
      const teamInCompany = await Company.findOne({
        teams: { $elemMatch: { _id: req.params.team_id } }
      });

      let teams = teamInCompany.teams;
      let index = teams.findIndex(x => x._id == req.params.team_id);

      teams[index].numberOfProjects++;

      await teamInCompany.save();

      const projects = await Project.find({ team_id: req.params.team_id });

      return res.json(projects);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@ROUTE get api/projects/:team_id
//@DESC  get all projects of one team
//@ACCESS Private + any team member or owner

router.get("/:team_id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let company = await Company.findOne({
      $and: [
        { teams: { $elemMatch: { _id: req.params.team_id } } },
        {
          $or: [
            { owner: req.user.id },
            { workers: { $elemMatch: { email: user.email } } }
          ]
        }
      ]
    });

    if (!company) {
      return res.status(400).json({ errors: [{ msg: "Not Authorized" }] });
    }
    let projects = await Project.find({ team_id: req.params.team_id });
    if (!projects) {
      return res.status(400).json({ errors: [{ msg: "No projects found" }] });
    }

    return res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@ROUTE get api/projects/:project_id
//@DESC  get information about project
//@ACCESS Private + any team member or owner

router.get("/info/:project_id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let project = await Project.findById(req.params.project_id);
    if (!project) {
      return res.status(400).json({ errors: [{ msg: "No project found" }] });
    }

    let company = await Company.findOne({
      $and: [
        { teams: { $elemMatch: { _id: project.team_id } } },
        {
          $or: [
            { owner: req.user.id },
            { workers: { $elemMatch: { email: user.email } } }
          ]
        }
      ]
    });

    if (!company) {
      return res.status(400).json({ errors: [{ msg: "Not Authorized" }] });
    }

    return res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//router.delete();
//@ROUTE delete / api/projects/:project_id
//@DESC  delete project
//@ACCESS Private + owner

router.delete("/:project_id", auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.project_id);
    if (!project) {
      return res.status(400).json({ errors: [{ msg: "No project found" }] });
    }

    let company = await Company.findOne({
      $and: [
        { teams: { $elemMatch: { _id: project.team_id } } },
        {
          owner: req.user.id
        }
      ]
    });

    if (!company) {
      return res.status(400).json({ errors: [{ msg: "Not Authorized" }] });
    }
    await project.delete();
    let projects = await Project.find({ team_id: req.params.team_id }).select(
      "-tasks"
    );
    return res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/add_task/:project_id",
  [
    auth,
    check("name", "Please provide a name for this task")
      .not()
      .isEmpty(),
    check("description", "Please provide a brief description for this task")
      .not()
      .isEmpty(),
    check("priority", "Please provide a level of priority for this task")
      .not()
      .isEmpty(),
    check(
      "assignTo",
      "Please provide namem of responsible person for this task"
    ).isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, priority, assignTo } = req.body;

    try {
      const project = await Project.findById(req.params.project_id);

      const company = await Company.find({
        $and: [
          { teams: { $elemMatch: { teams_id: project.team_id } } },
          { owner: req.user.id }
        ]
      });
      if (!company) {
        return res.status(400).json({ error: [{ msg: "Not Authorized" }] });
      }

      const task = {
        name,
        createdAt: Date(),
        description,
        assignTo,
        priority
      };

      project.tasks.push(task);
      await project.save();
      return res.json(project);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
  }
);
//@ api/projects/:project_id/remove_task/:task_id

router.put("/:project_id/remove_task/:task_id", [auth], async (req, res) => {
  try {
    let project = await Project.findById(req.params.project_id);
    let company = await Company.find({
      $and: [
        { owner: req.user.id },
        {
          teams: { $elemMatch: { id: req.params.team_id } }
        }
      ]
    });
    if (!company) {
      return res.status(400).json({ errors: [{ msg: "Not Authorized" }] });
    }
    let listOfTasks = project.tasks;

    let index = listOfTasks.findIndex(x => x._id == req.params.task_id);

    project.tasks.splice(index, 1);
    await project.save();
    return res.json(project);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//@ api/projects/:project_id/:task_id/complete
router.put("/:project_id/:task_id/complete", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let project = await Project.findOne({
      $and: [
        { _id: req.params.project_id },
        {
          tasks: { $elemMatch: { _id: req.params.task_id } }
        }
      ]
    });

    if (!project) {
      return res.status(400).json({ errors: [{ msg: "Task not found." }] });
    }

    let index = project.tasks.findIndex(x => x._id == req.params.task_id);

    if (!project.tasks[index].assignTo == user.email) {
      return res.status(400).json({ errors: [{ msg: "Not authorized" }] });
    }
    project.tasks[index].status = "Completed";
    project.tasks[index].completed = Date.now();
    await project.save();
    return res.json(project);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//router.delete();
module.exports = router;
