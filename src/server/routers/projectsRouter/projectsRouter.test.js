require("dotenv").config();
const { verify } = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const connectDatabase = require("../../../database");

const Project = require("../../../database/models/Project");
const {
  mockProjects,
  mockProject,
} = require("../../mocks/mockProjects/mockProjects");
const User = require("../../../database/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDatabase(mongoServer.getUri());
});

beforeEach(async () => {
  await Project.create(mockProjects[0]);
  await Project.create(mockProjects[1]);
});

afterEach(async () => {
  await Project.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: jest.fn(),
}));

describe("Given a GET '/projects' endpoint", () => {
  describe("When in recieves a request and the resource it's found on the server", () => {
    test("Then it should respond with status 200 and a list of projects", async () => {
      verify.mockImplementation(() => "mockVerifyValue");

      Project.find = jest.fn().mockResolvedValueOnce(mockProjects);
      const { body } = await request(app)
        .get("/projects")
        .set({ authorization: "Bearer mocktoken" })
        .expect(200);

      expect(body.projects).toEqual(mockProjects);
    });
  });

  describe("When in recieves a request without a proper authorization", () => {
    test("Then it should respond with status 401", async () => {
      await request(app)
        .get("/projects")
        .set({ authorization: "" })
        .expect(401);
    });
  });
});

describe("Given a DELETE '/projects/:id' endpoint", () => {
  describe("When in recieves a request with an Id and the resource it's found on the server", () => {
    test("Then it should respond with status 200 and a json with a msg 'Project deleted'", async () => {
      verify.mockImplementation(() => "mockVerifyValue");
      const expectedJson = { msg: "Project deleted" };

      Project.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
      const { body } = await request(app)
        .delete("/projects/mockprojectId")
        .set({ authorization: "Bearer mocktoken" })
        .expect(200);

      expect(body).toEqual(expectedJson);
    });
  });

  describe("When in recieves a request without a projectId", () => {
    test("Then it should respond with status 404", async () => {
      verify.mockImplementation(() => "mockVerifyValue");
      const expectedJson = { message: "Unable to delete project" };

      Project.findByIdAndDelete = jest.fn().mockResolvedValueOnce();

      const { body } = await request(app)
        .delete("/projects/mockUnexistingProjectId")
        .set({ authorization: "Bearer mocktoken" })
        .expect(404);

      expect(body).toEqual(expectedJson);
    });
  });
});

describe("Given a POST '/create/ endpoint", () => {
  describe("When in recieves a request with a project from a valid user", () => {
    test("Then it should respond with status 201 and a json with the project", async () => {
      verify.mockImplementation(() => "mockVerifyValue");
      const expectedJson = { project: mockProject };

      Project.create = jest.fn().mockResolvedValueOnce(mockProject);
      User.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);
      const { body } = await request(app)
        .post("/projects/create")
        .set({ authorization: "Bearer mocktoken" })
        .type("multipart/formd-ata")
        .field("name", "mockNewProjectName")
        .field("description", "mockNewProjectDescription")
        .field("genres", ["rock", "bassplayer"])
        .field("roles", ["guitarrist", "singer"])
        .attach("image", Buffer.from("mockImageString", "utf-8"), {
          filename: "mockiamge",
          originalname: "image.jpg",
        })
        .expect(201);

      expect(body).toEqual(expectedJson);
    });
  });
});
