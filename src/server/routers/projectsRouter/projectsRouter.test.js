require("dotenv").config();
const { verify } = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const connectDatabase = require("../../../database");

const Project = require("../../../database/models/Project");
const { mockProjects } = require("../../mocks/mockProjects/mockProjects");

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

describe("Given a GET 'projects/projects' endpoint", () => {
  describe("When in recieves a request and the resource it's found on the server", () => {
    test("Then it should respond with status 200 and a list of projects", async () => {
      verify.mockImplementation(() => "mockVerifyValue");

      Project.find = jest.fn().mockResolvedValueOnce(mockProjects);
      const { body } = await request(app)
        .get("/projects/projects")
        .set({ authorization: "Bearer mocktoken" })
        .expect(200);

      expect(body.projects).toEqual(mockProjects);
    });
  });

  describe("When in recieves a request without a proper authorization", () => {
    test("Then it should respond with status 401", async () => {
      await request(app)
        .get("/projects/projects")
        .set({ authorization: "" })
        .expect(401);
    });
  });
});