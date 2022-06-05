const debug = require("debug")("turnitup:server:projectsControllers");
const chalk = require("chalk");
const Project = require("../../../database/models/Project");
const customError = require("../../../utils/customError/customError");

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
module.exports = { getProjects, deleteProject };
