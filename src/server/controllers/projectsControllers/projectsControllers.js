const debug = require("debug")("turnitup:server:projectsControllers");
const chalk = require("chalk");
const Project = require("../../../database/models/Project");

const getProjects = async (req, res, next) => {
  try {
    debug(chalk.green("Games request received"));
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    debug(chalk.red("Projects not found"));
    error.statusCode = 404;
    error.message = "Not found";

    next(error);
  }
};

module.exports = { getProjects };
