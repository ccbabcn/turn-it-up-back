const express = require("express");
const {
  getProjects,
} = require("../../controllers/projectsControllers/projectsControllers");
const auth = require("../../middlewares/auth/auth");

const projectsRouter = express.Router();

projectsRouter.get("/projects", auth, getProjects);

module.exports = projectsRouter;
