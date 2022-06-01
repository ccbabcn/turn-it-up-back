require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const jsonwebtoken = require("jsonwebtoken");
const app = require("../../index");
const connectDatabase = require("../../../database");

const User = require("../../../database/models/User");
const { newMockUser } = require("../../mocks/mocksUsers/mocksUsers");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDatabase(mongoServer.getUri());
});

beforeEach(async () => {
  await request(app).post("/user/register").send(newMockUser).expect(201);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a POST 'user/login' endpoint", () => {
  describe("When it receives a request with valid username and password", () => {
    test("Then it should respond with status 200 and a token", async () => {
      jsonwebtoken.sign = jest.fn().mockReturnValue("toquencito");
      const usertoLog = {
        username: newMockUser.username,
        password: newMockUser.password,
      };

      const { body } = await request(app)
        .post("/user/login")
        .send(usertoLog)
        .expect(200);
      expect(body.token).toBe("toquencito");
    });
  });

  describe("When it receives a request with invalid username and password", () => {
    test("Then it should respond with status 400 and a 'Bad request message'", async () => {
      const usertoLog = {
        username: "",
        password: "",
      };

      const { body } = await request(app)
        .post("/user/login")
        .send(usertoLog)
        .expect(400);
      expect(body.message).toBe("Bad request");
    });
  });
});

describe("Given a POST 'user/register' endpoint", () => {
  describe("When it receives a request with valid name, username and password", () => {
    test("Then it should respond with status 201 and message 'User created'", async () => {
      const expectedMessage = "User created";
      const newUser = {
        name: "johndoe",
        username: "johndoe",
        password: "johndoe",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(201);

      expect(body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with username that already exists", () => {
    test("Then it should respond with status 409 and message 'User already exists'", async () => {
      const expectedMessage = "User already exists";
      const { body } = await request(app)
        .post("/user/register")
        .send(newMockUser)
        .expect(409);

      expect(body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should respond with status 409 and message 'Bad request'", async () => {
      const expectedMessage = "Bad request";
      const { body } = await request(app)
        .post("/user/register")
        .send({})
        .expect(400);

      expect(body.message).toBe(expectedMessage);
    });
  });
});
