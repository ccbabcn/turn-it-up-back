const notFoundError = require("./errors");

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
