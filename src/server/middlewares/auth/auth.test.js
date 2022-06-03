const { verify } = require("jsonwebtoken");
const customError = require("../../../utils/customError/customError");
const auth = require("./auth");

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: jest.fn(),
}));

describe("Given auth middleware function", () => {
  describe("When it receives a request with a valid token", () => {
    test("Then it should call next function and add the property userID to the req", () => {
      verify.mockImplementation(() => ({ id: 1 }));
      const req = {
        headers: {
          authorization: "Bearer mocktoken",
        },
      };
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("userId", 1);
    });
  });

  describe("When it receives a request without Bearer", () => {
    test("Then it should call next with an error 'Invalid token'", () => {
      const req = {
        headers: {
          authorization: "noBearer",
        },
      };
      const expectedError = customError(401, "Invalid token");
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
