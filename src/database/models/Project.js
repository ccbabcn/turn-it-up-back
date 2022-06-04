const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: { type: String },
  roles: [{ type: String, default: [] }],
});

const Project = model("Project", ProjectSchema, "projects");
module.exports = Project;
