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

const getProjectsbyUser = async (req, res, next) => {
  try {
    const { userId } = req;
    debug(chalk.yellow(`Get projects from ${userId} request received`));
    const userProjects = await User.findOne({ _id: userId }).populate(
      "createdprojects",
      null,
      Project
    );
    debug(chalk.green(`Get projects from ${userId} request completed`));

    res.status(200).json({ userProjects });
  } catch (error) {
    debug(chalk.red("Projects from the user not found"));
    error.statusCode = 404;
    error.message = "Not found";

    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    debug(chalk.green("Project delete request received"));
    const deletedProject = await Project.findByIdAndDelete(id);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { createdprojects: id },
      }
    );

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
      { _id: userId },
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

const editProject = async (req, res, next) => {
  debug(chalk.yellow("received a request to edit project"));
  try {
    const projectToEdit = req.body;
    const { id: projectId } = req.params;
    const { file } = req;
    const { userId } = req;

    if (file) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        (error) => {
          if (error) {
            debug(chalk.red("Error editing project"));
            next(error);
          }
        }
      );
      projectToEdit.image = newFileName;
    }
    const owner = await User.findById({ _id: userId });
    if (owner.createdprojects.includes(projectId)) {
      await Project.findByIdAndUpdate({ _id: projectId }, projectToEdit, {
        new: true,
      });
      res.status(200).json({ msg: "Project edited" });
    } else {
      const error = customError(401, "Unauthorized");
      debug(chalk.red(`${userId} tried to uptade another's user project`));

      next(error);
    }
  } catch (error) {
    error.customMessage = "cannot edit project";
    error.statusCode = 400;
    debug(chalk.red("Error Editing project"));

    next(error);
  }
};

module.exports = {
  getProjects,
  deleteProject,
  createProject,
  getProjectsbyUser,
  editProject,
};
