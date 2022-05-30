const customError = require("./customError");

describe("Given a customError function", () => {
  describe("When it's invoked with a statusCode, customMessage and  originalMessage", () => {
    test("Then it should return a new error with those values", () => {
      const originalMessage = "Error";
      const customMessage = "Not Implemented";
      const statusCode = 501;

      const newError = new Error("Error");
      newError.statusCode = 501;
      newError.customMessage = "Not Implemented";

      const returnedError = customError(
        statusCode,
        customMessage,
        originalMessage
      );

      expect(returnedError).toEqual(newError);
    });
  });
});
