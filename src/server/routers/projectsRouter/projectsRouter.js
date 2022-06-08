const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getProjects,
  deleteProject,
  createProject,
  getProjectsbyUser,
} = require("../../controllers/projectsControllers/projectsControllers");

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 5000000,
  },
});

const projectsRouter = express.Router();

projectsRouter.get("/", getProjects);
projectsRouter.get("/user", getProjectsbyUser);
projectsRouter.delete("/:id", deleteProject);
projectsRouter.post("/create", upload.single("image"), createProject);

module.exports = projectsRouter;
