const debug = require("debug")("turnitup:server:projectsControllers");
const chalk = require("chalk");

const Project = require("../../../database/models/Project");
const customError = require("../../../utils/customError/customError");
const User = require("../../../database/models/User");

const getProjects = async (req, res, next) => {
  try {
    const page = +(req.query?.page || 0);
    let pagesize = +(req.query?.pagesize || 6);
    if (pagesize > 6) {
      pagesize = 6;
    }

    let queryNextPrev = "";
    const filter = {};
    if (req.query?.genre) {
      debug(
        chalk.yellow(
          `Get projects by genre: ${req.query?.genre} request received`
        )
      );

      filter.genres = req.query.genre;
      queryNextPrev += `genre=${req.query.genre}`;
    }
    if (req.query?.role) {
      debug(
        chalk.yellow(
          `Get projects by role: ${req.query?.role} request received`
        )
      );

      filter.roles = req.query.role;
      queryNextPrev += `role=${req.query.role}`;
    }

    if (req.query?.user) {
      debug(chalk.yellow(`Get projects by user request received`));

      filter.owner = req.userId;
      queryNextPrev += `user=${req.query.user}`;
    }

    const projects = await Project.find(filter)
      .limit(pagesize)
      .skip(page * pagesize);

    const total = await Project.count(filter);

    const projectsList = projects.map(
      ({
        _id: id,
        name,
        description,
        image,
        imagebackup,
        genres,
        roles,
        owner,
      }) => ({
        id,
        name,
        description,
        image,
        imagebackup,
        genres,
        roles,
        owner,
      })
    );
    const domainUrl = process.env.API_URL;

    let nextpage = `${domainUrl}projects?page=${
      page + 1
    }&pageSize=${pagesize}&${queryNextPrev}`;
    if (page >= Math.trunc(total / pagesize)) {
      nextpage = undefined;
    }

    let previous;
    if (page > 0) {
      previous = `${domainUrl}projects?page=${
        page - 1
      }&pageSize=${pagesize}&${queryNextPrev}`;
    }

    const response = {
      page,
      pagesize,
      nextpage,
      previous,
      total,
      results: projectsList,
    };

    res.status(200).json(response);
  } catch (error) {
    debug(error);
    error.statusCode = 404;
    error.customMessage = "Not found";
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
      "username",
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
