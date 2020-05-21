const express = require("express");

const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Note = require("../../models/Note");
const Project = require("../../models/Project");
const router = express.Router();

//@ROUTE post/ api/projects/
//@DESC  Create Project
//@ACCESS Private + owner

router.post(
  "/",
  [
    auth,
    check("note", "Please provide a short description for this note")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { note, company_id, project_id, task_id, userId } = req.body;
    try {
      const newNote = new Note({
        note,
        company_id,
        project_id,
        task_id,
        createdBy: userId
      });
      await newNote.save();

      const notes = await Note.find({ task_id: task_id })
        .populate("project_id")
        .populate("createdBy");

      return res.json(notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@ROUTE get /task/:id
//@DESC  All notes by task id
//@ACCESS Private
router.get("/task/:id", [auth], async (req, res) => {
  let id = req.params.id;

  try {
    const notes = await Note.find({ task_id: id })
      .populate("project_id")
      .populate("createdBy");

    return res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@ROUTE get /task/:id
//@DESC  All notes by company id
//@ACCESS Private
router.get("/company/:id", [auth], async (req, res) => {
  let id = req.params.id;

  try {
    const notes = await Note.find({ company_id: id })
      .populate("project_id")
      .populate("createdBy");

    return res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
