const bcrypt = require("bcrypt");

const User = require("../../../database/models/User");
const { mockUser } = require("../../mocks/mocksUsers/mocksUsers");
const { userRegister, userLogin } = require("./userControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => "toquencito",
}));

const next = jest.fn();
describe("Given a userRegister function", () => {
  describe("When it's called with a new name, username and password", () => {
    test("Then it should call the response method status with 201 and it's json method with the message 'User created'", async () => {
      const expectedMessage = { message: "User created" };

      const req = {
        body: mockUser,
      };

      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(mockUser);

      await userRegister(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it's called with an existing username", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = new Error();
      const req = {
        body: mockUser,
      };
      User.findOne = jest.fn().mockResolvedValue(true);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked an a error occurs", () => {
    test("Then it should call next with an error", async () => {
      const expectedError = new Error("Bad request");
      const req = {
        body: mockUser,
      };

      User.findOne = jest.fn().mockRejectedValue(expectedError);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given UserLogin function", () => {
  describe("When it's called with correct users credentials", () => {
    test("Then it should call response method status with 201 and json with a token", async () => {
      const expectedStatus = 201;
      bcrypt.compare = jest.fn().mockReturnValue(true);

      const req = { body: { mockUser } };

      User.findOne = jest.fn().mockResolvedValue(true);

      await userLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token: "toquencito" });
    });
  });

  describe("When it's call with incorrect password", () => {
    test("Then it should call next with an error", async () => {
      bcrypt.compare = jest.fn().mockReturnValue(false);
      const req = { body: { mockUser } };
      const newError = new Error();

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });

  describe("When it's call with incorrect username", () => {
    test("Then it should call next with an error", async () => {
      const req = { body: { mockUser } };
      const newError = new Error();
      User.findOne = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });

  describe("When it's call and an error occurs", () => {
    test("Then it should call next with an error", async () => {
      const req = { body: { mockUser } };
      const newError = new Error();
      User.findOne = jest.fn().mockRejectedValueOnce(newError);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(newError);
    });
  });
});
