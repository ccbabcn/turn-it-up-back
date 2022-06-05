const debug = require("debug")("turnitup:server:projectsControllers");
const chalk = require("chalk");
const Project = require("../../../database/models/Project");

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
  const { projectId } = req.params;

  try {
    debug(chalk.green("Project delete request received"));
    await Project.findByIdAndDelete({ projectId });
    res.status(200).json({ msg: "Project deleted" });
  } catch (error) {
    debug(chalk.red(`Unable to delete project with ID: ${projectId}`));
    error.statusCode = 404;
    error.message = "Unable to delete project";

    next(error);
  }
};
module.exports = { getProjects, deleteProject };
