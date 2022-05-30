const { notFoundError, generalError } = require("./errors");

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
        error: true,
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
        error: true,
        message: "Conlfict Error",
      };

      generalError(receivedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectederror);
    });
  });
});
