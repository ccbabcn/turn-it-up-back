const User = require("../../../database/models/User");
const { mockUser } = require("../../mocks/mocksUsers/mocksUsers");
const userRegister = require("./userControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

describe("Given a userRegister function", () => {
  describe("When it's called with a new name, username and password", () => {
    test("Then it should call the response method status with 201 and it's json method with the message 'User created'", async () => {
      const expectedMessage = { msg: "User created" };

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
});
