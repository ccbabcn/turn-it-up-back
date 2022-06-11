const { Schema, model, SchemaTypes } = require("mongoose");

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
  imagebackup: { type: String },

  genres: [{ type: String, default: [] }],
  roles: [{ type: String, default: [] }],
  owner: { type: SchemaTypes.ObjectId, ref: "User" },
});

const Project = model("Project", ProjectSchema, "projects");
module.exports = Project;
