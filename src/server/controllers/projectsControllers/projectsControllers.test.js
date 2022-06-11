const Project = require("../../../database/models/Project");
const User = require("../../../database/models/User");
const {
  mockProjects,
  mockProject,
} = require("../../mocks/mockProjects/mockProjects");
const {
  getProjects,
  deleteProject,
  createProject,
  getProjectsbyUser,
  editProject,
  getProjectById,
} = require("./projectsControllers");

describe("Given getProjects function", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When invoked with a response and it finds projects", () => {
    test("Then it should call the response status method 200", async () => {
      const expectedStatus = 200;
      Project.find = jest.fn().mockResolvedValueOnce(mockProjects);

      await getProjects(null, res);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When invoked with a response but an error occurs", () => {
    test("Then it should call next with an error with a message 'Not found' and statusCode 404", async () => {
      const expectedError = new Error();
      expectedError.statusCode = 404;
      expectedError.message = "Not found";
      const next = jest.fn();
      Project.find = jest.fn().mockRejectedValueOnce(new Error());

      await getProjects(null, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given deleteProject function", () => {
  describe("When it's invoqued with a response and a request with an existing id to delete", () => {
    test("Then it should call the response's status method with 200 and the json method with a 'Project deleted' message", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req = { params: { projectId: "mockProjectId" }, userId: "userId" };

      Project.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
      User.findOneAndUpdate = jest.fn().mockResolvedValueOnce(mockProject);

      await deleteProject(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Project deleted" });
    });
  });
  describe("When it's invoqued but no project it's found", () => {
    test("Then it should call next with an 404 error", async () => {
      const next = jest.fn();

      const req = { params: { projectId: "mockProjectId" } };

      Project.findByIdAndDelete = jest.fn().mockResolvedValueOnce();
      const newError = new Error();
      newError.statusCode = 404;
      newError.customMessage = "Unable to delete project";

      await deleteProject(req, null, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });

  describe("When it's invoqued an a error occur", () => {
    test("Then it should call next with an 500 error", async () => {
      const next = jest.fn();

      const req = { params: { projectId: "mockProjectId" } };

      Project.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error());
      const newError = new Error();
      newError.statusCode = 500;
      newError.customMessage = "Internal Server Error";

      await deleteProject(req, null, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});

describe("Given createProject function", () => {
  const next = jest.fn();

  describe("When it's invoqued with a request that has a new project", () => {
    test("Then it should call the response's status method with 201 and the json method with the created project", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: { newProject: mockProject },
        file: {
          filename: "mockimagename",
          originalname: "mockimage.jpg",
        },
        userId: "mockid",
      };

      Project.create = jest.fn().mockResolvedValueOnce(mockProject);
      User.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);

      await createProject(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ project: mockProject });
    });
  });

  describe("When it's invoqued with a request that has a new project and a file but fails on renaming it's name", () => {
    test("Then it should call next", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.mock("fs", () => ({
        ...jest.requireActual("fs"),
        rename: jest.fn().mockRejectedValueOnce(-1),
      }));

      const req = {
        body: mockProject,
        file: {},
        userId: "mockid",
      };

      await createProject(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoqued with a request that has a new project and a file but fails on renaming it's name", () => {
    test("Then it should call next", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.mock("fs", () => ({
        ...jest.requireActual("fs"),
        rename: jest.fn().mockRejectedValueOnce(-1),
      }));

      const req = {
        body: mockProject,
        file: {},
        userId: "mockid",
      };

      await createProject(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given getProjectsbyUser function", () => {
  const next = jest.fn();

  describe("When it's invoqued with a request that has a existing userID", () => {
    test("Then it should call the response's status method with 200 and the json method with the list of projects from that user", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        params: {
          userId: "mockid",
        },
      };

      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockReturnValue(mockProject),
      }));

      await getProjectsbyUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userProjects: mockProject });
    });
  });

  describe("When it's invoqued with a wrong request", () => {
    test("Then it should call next with an error", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        userId: "mockid",
      };
      const newError = new Error();
      newError.statusCode = 404;
      newError.message = "Not found";

      User.findOne = jest.fn(() => ({
        populate: jest.fn().mockRejectedValueOnce(new Error()),
      }));

      await getProjectsbyUser(req, res, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});

describe("Given editProject function", () => {
  const next = jest.fn();

  describe("When it's invoqued with a request to update a file from it's user creator", () => {
    test("Then it should call the response's status method with 200 and the json method with the message 'Project edited'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: mockProject,
        params: { id: mockProject.id },
        userId: mockProject.owner,
      };

      User.findById = jest
        .fn()
        .mockResolvedValueOnce({ createdprojects: [mockProject.id] });
      Project.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(true);

      await editProject(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Project edited" });
    });
  });

  describe("When it's invoqued with a request to update a file from another user", () => {
    test("Then it should call the next with 401 and a message 'Unauthorized'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: mockProject,
        params: { id: mockProject.id },
        userId: "mockNotOwner",
      };
      const expectedError = new Error();
      expectedError.customMessage = "Unauthorized";
      expectedError.statusCode = 401;

      User.findById = jest
        .fn()
        .mockResolvedValueOnce({ createdprojects: req.userId });
      Project.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(true);

      await editProject(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoqued with a bad request to update a file", () => {
    test("Then it should call the next with 400 and a message 'cannot edit project'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: mockProject,
        params: { id: mockProject.id },
        userId: "mockNotOwner",
      };
      const expectedError = new Error();
      expectedError.customMessage = "cannot edit project";
      expectedError.statusCode = 400;

      User.findById = jest.fn().mockRejectedValueOnce(new Error());

      await editProject(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given getProjectById function", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When invoked with a correct request and it finds project", () => {
    test("Then it should call the response status method 200 and it's json method with the found project", async () => {
      const expectedStatus = 200;
      const expectedJson = { project: mockProject };
      const req = {
        params: { id: mockProject.id },
      };
      Project.findById = jest.fn().mockResolvedValueOnce(mockProject);

      await getProjectById(req, res);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When invoked with a wrong request", () => {
    test("Then it should call next with an error with a message 'Bad request' and statusCode 400", async () => {
      const expectedError = new Error();
      expectedError.statusCode = 400;
      expectedError.customMessage = "Bad request";
      const req = {
        params: {},
      };
      Project.findById = jest.fn().mockResolvedValueOnce({});

      await getProjectById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When invoked with a correct request but an error occurs", () => {
    test("Then it should call next with an error with a message 'Not found' and statusCode 404", async () => {
      const expectedError = new Error();
      expectedError.statusCode = 404;
      expectedError.message = "Not found";
      const req = {
        params: { id: mockProject.id },
      };
      Project.findById = jest.fn().mockRejectedValueOnce(new Error());

      await getProjectById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
