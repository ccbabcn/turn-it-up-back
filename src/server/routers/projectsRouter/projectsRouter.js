const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getProjects,
  deleteProject,
  createProject,
} = require("../../controllers/projectsControllers/projectsControllers");

const upload = multer({ dest: path.join("uploads", "images") });

const projectsRouter = express.Router();

projectsRouter.get("/", getProjects);
projectsRouter.delete("/:id", deleteProject);
projectsRouter.post("/create", upload.single("image"), createProject);

module.exports = projectsRouter;
