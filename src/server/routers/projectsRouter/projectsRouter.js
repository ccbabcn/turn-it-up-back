const express = require("express");
const {
  getProjects,
  deleteProject,
} = require("../../controllers/projectsControllers/projectsControllers");
const auth = require("../../middlewares/auth/auth");

const projectsRouter = express.Router();

projectsRouter.get("/", auth, getProjects);
projectsRouter.delete("/:id", auth, deleteProject);

module.exports = projectsRouter;
