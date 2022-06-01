const { ValidationError } = require("express-validation");
const { notFoundError, generalError, validationError } = require("./errors");

describe("Given a notFoundError function", () => {
  describe("When it's invoked", () => {
    test("Then it should call next with a an error", () => {
      const expectedError = new Error();
      const next = jest.fn();

      notFoundError(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When it's ivoked with an error without statuscode", () => {
    test("Then it should call res' status and json metohds with 500 and the message 'Genral pete'", () => {
      const expectedStatusCode = 500;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const receivedError = new Error();
      const expectederror = {
        message: "Internal Server Error",
      };

      generalError(receivedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectederror);
    });
  });

  describe("When it's invoked with an status code 409 and a message 'Conflict Error'", () => {
    test("Then it should call res' status and json methods with 409 and 'Conlfict Error'", () => {
      const receivedError = new Error();
      receivedError.customMessage = "Conlfict Error";
      receivedError.statusCode = 409;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatusCode = 409;
      const expectederror = {
        message: "Conlfict Error",
      };

      generalError(receivedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectederror);
    });
  });
});

describe("Given a validationError function", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it's invoked with an error thats an instance of ValidationError", () => {
    test("then it should call res' status method with 400 and json method with a message 'Bad request'", () => {
      const errors = {
        body: [{}],
      };
      const options = { error: "Invalid Request", statusCode: 400 };
      const newValidationError = new ValidationError(errors, options);

      const expectedStatusCode = 400;
      const expectedMessage = {
        message: "Bad request",
      };

      validationError(newValidationError, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When its invoked with an error that's not an instance of ValidationError", () => {
    test("Then it sould call next with an error", () => {
      const newError = new Error();
      const next = jest.fn();

      validationError(newError, null, res, next);

      expect(next).toBeCalledWith(newError);
    });
  });
});
