const debug = require("debug")("turnitup:server:projectsControllers");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const Project = require("../../../database/models/Project");
const customError = require("../../../utils/customError/customError");
const User = require("../../../database/models/User");

const getProjects = async (req, res, next) => {
  try {
    debug(chalk.green("Get projects request received"));
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    debug(chalk.red("Projects not found"));
    error.statusCode = 404;
    error.message = "Not found";

    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    debug(chalk.green("Project delete request received"));
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      res.status(200).json({ msg: "Project deleted" });
    } else {
      const error = customError(404, "Unable to delete project");
      debug(chalk.red(`Unable to delete project with ID: ${id}`));

      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const newProject = req.body;
    const { userId } = req;

    const { file } = req;
    if (file) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        (error) => {
          if (error) {
            debug(chalk.red("Error renaming image of project"));
            next(error);
          }
        }
      );
      newProject.image = newFileName;
    }
    const createdProject = await Project.create(newProject);
    await User.findOneAndUpdate(
      { userId },
      {
        $push: {
          createdprojects: createdProject.id,
        },
      }
    );
    res.status(201).json({ project: createdProject });
    debug(chalk.green("Project created correctly"));
  } catch (error) {
    error.customMessage = "cannot created project";
    error.statusCode = 400;
    debug(chalk.red("Error creating project"));

    next(error);
  }
};

module.exports = { getProjects, deleteProject, createProject };
