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
      const req = { params: { projectId: "mockProjectId" } };

      Project.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});

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
  describe("When it's invoqued with a request that has a new project", () => {
    test("Then it should call the response's status method with 201 and the json method with the created project", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: mockProject,
        file: {
          filename: "mockimagename",
          originalname: "mockimage.jpg",
        },
        userId: "mockid",
      };

      Project.create = jest.fn().mockResolvedValueOnce(mockProject);
      User.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);

      await createProject(req, res, null);

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
      const next = jest.fn();

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
