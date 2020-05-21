const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Project = require("../../models/Project");
const Company = require("../../models/Company");
const User = require("../../models/User");

const router = express.Router();

//@ROUTE POST API/TEAMs
//@DESC  create a team
//@ACCESS Private

router.put(
  "/:company_id",
  [
    auth,
    check("name", "Please provide a name for your team")
      .not()
      .isEmpty(),
    check("description", "Please provide a brief description for this team")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;

    try {
      let company = await Company.findOne({
        $and: [
          { _id: req.params.company_id },
          { teams: { $elemMatch: { name: name } } }
        ]
      });
      if (company) {
        return res
          .status(400)
          .json({
            errors: [{ msg: ["The team of this name already exists"] }]
          });
      }
      company = await Company.findById(req.params.company_id);
      let newTeam = {
        name,
        description
      };
      company.teams.unshift(newTeam);
      await company.save();
      return res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@ROUTE put API/TEAMs/add_member/:company_id/:team_id
//@DESC  add new member to your team
//@ACCESS Private + OWNER

router.put(
  "/add_member/:company_id/:team_id",
  [auth, check("email", "Provide email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let company = await Company.findOne({
        $and: [{ _id: req.params.company_id }, { owner: req.user.id }]
      });
      if (!company) {
        return res.status(400).json({ errors: [{ msg: "Not found" }] });
      }
      company = await Company.findOne({
        $and: [
          { _id: req.params.company_id },
          { workers: { $elemMatch: { email: email } } }
        ]
      });

      if (!company) {
        return res.status(400).json({ errors: [{ msg: "Not your worker" }] });
      }

      company = await Company.findOne({
        $and: [
          { _id: req.params.company_id },
          { teams: { $elemMatch: { _id: req.params.team_id } } }
        ]
      });

      if (!company) {
        return res.status(400).json({ errors: [{ msg: "No team found" }] });
      }

      let teams = company.teams;

      let index = teams.findIndex(x => x._id == req.params.team_id);
      let index2 = teams[index].members.includes(email);
      if (!index2) {
        company.teams[index].members.unshift(email);

        await company.save();
        return res.json(company.teams[index]);
      }

      return res
        .status(400)
        .json({ errors: [{ msg: "Already a member of your this team" }] });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@ROUTE get API/TEAMs/:TEAM_ID
//@DESC  get information of team
//@ACCESS Private + email on a list of workers

router.get("/info/:company_id/:team_id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    let team = await Company.findOne({
      $or: [
        {
          $and: [{ _id: req.params.company_id }, { owner: req.user.id }]
        },
        {
          $and: [
            { _id: req.params.company_id },
            { workers: { $elemMatch: { email: user.email } } }
          ]
        }
      ]
    });
    if (!team) {
      return res.status(400).json({ errors: [{ msg: "Not authorized" }] });
    }

    team = await Company.findById(req.params.company_id);

    const teams = team.teams;
    let index = teams.findIndex(x => x._id == req.params.team_id);

    const teamInfo = team.teams[index];
    return res.json(teamInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@ROUTE put API/TEAMs/delete_member/:company_id/:team_id
//@DESC  Delete member from the team
//@ACCESS private + owner

router.put(
  "/delete_member/:company_id/:team_id",
  [
    auth,
    check("email", "Please provide email of the worker to be deleted").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let company = await Company.findOne({
        $and: [{ _id: req.params.company_id }, { owner: req.user.id }]
      });
      if (!company) {
        return res.status(400).json({ errors: [{ msg: "Not authorized" }] });
      }

      const teams = company.teams;
      let index = teams.findIndex(x => x._id == req.params.team_id);

      if (index < 0) {
        return res.status(400).json({ errors: [{ msg: "No team found" }] });
      }
      let myMember = teams[index].members.includes(email);
      if (!myMember) {
        return res.status(400).json({
          errors: [{ msg: "Email address has no accocciated account " }]
        });
      }
      let indexOfEmail = teams[index].members.indexOf(email);

      myMember = teams[index].members.splice(indexOfEmail, 1);
      await company.save();
      return res.json(company.teams[index]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


module.exports = router;
