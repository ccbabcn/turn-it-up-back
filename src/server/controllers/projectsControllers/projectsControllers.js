const debug = require("debug")("turnitup:server:projectsControllers");
const chalk = require("chalk");

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
    const userPopulatedProjects = await User.findOne({ _id: userId }).populate(
      "createdprojects",
      null,
      Project
    );
    debug(chalk.green(`Get projects from ${userId} request completed`));

    res
      .status(200)
      .json({ userProjects: userPopulatedProjects.createdprojects });
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
  const { userId, image, imagebackup } = req;
  try {
    const recieveProject = req.body;
    const newProject = {
      name: recieveProject.name,
      description: recieveProject.description,
      genres: recieveProject.genres,
      roles: recieveProject.roles,
      owner: userId,
      image,
      imagebackup,
    };

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

    const { userId, image, imagebackup } = req;
    projectToEdit.image = image;
    projectToEdit.imagebackup = imagebackup;

    const owner = await User.findById({ _id: userId });
    if (owner.createdprojects.includes(projectId)) {
      await Project.findByIdAndUpdate({ _id: projectId }, projectToEdit, {
        new: true,
      });
      debug(chalk.green("Project edited correctly "));
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

const getProjectById = async (req, res, next) => {
  debug(chalk.yellow("Get project by Id request received"));
  try {
    const { id: projectId } = req.params;
    if (!projectId) {
      const error = customError(400, "Bad request");
      debug(chalk.red("Get project by Id, bad request received"));

      next(error);
    }
    const project = await Project.findById(projectId).populate(
      "owner",
      "name",
      User
    );
    res.status(200).json({ project });
    debug(chalk.green("Get project by ID success"));
  } catch (error) {
    debug(chalk.red("Project not found"));
    error.statusCode = 404;
    error.message = "Not found";

    next(error);
  }
};

module.exports = {
  getProjects,
  deleteProject,
  createProject,
  getProjectsbyUser,
  editProject,
  getProjectById,
};
