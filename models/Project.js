const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  team_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Active"
  },
  tasks: [
    {
      name: {
        type: String
      },
      createdAt: {
        type: Date
      },
      description: {
        type: String
      },
      assignTo: {
        type: String
      },
      priority: {
        type: String
      },
      status: {
        type: String,
        default: "Open"
      },
      completed: {
        type: Date
      }
    }
  ]
});

module.exports = Project = mongoose.model("project", ProjectSchema);
