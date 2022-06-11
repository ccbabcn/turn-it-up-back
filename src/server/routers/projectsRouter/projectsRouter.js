const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getProjects,
  deleteProject,
  createProject,
  getProjectsbyUser,
  editProject,
  getProjectById,
} = require("../../controllers/projectsControllers/projectsControllers");
const firebaseUploads = require("../../middlewares/firebaseUploads/firebaseUploads");

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: {
    fileSize: 5000000,
  },
});

const projectsRouter = express.Router();

projectsRouter.get("/", getProjects);
projectsRouter.get("/user", getProjectsbyUser);
projectsRouter.get("/:id", getProjectById);

projectsRouter.delete("/:id", deleteProject);
projectsRouter.post(
  "/create",
  upload.single("image"),
  firebaseUploads,
  createProject
);
projectsRouter.put(
  "/:id",
  upload.single("image"),
  firebaseUploads,
  editProject
);

module.exports = projectsRouter;
