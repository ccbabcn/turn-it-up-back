const Project = require("../../../database/models/Project");
const { mockProjects } = require("../../mocks/mockProjects/mockProjects");
const { getProjects } = require("./projectsControllers");

describe("Given getProjects function", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When invoked with a response and it finds projects", () => {
    test("Then it should call the response status method 200", async () => {
      const expectedStatus = 200;
      Project.find = jest.fn().mockResolvedValueOnce(mockProjects);

      await getProjects(null, res);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When invoked with a response but an error occurs", () => {
    test("Then it should call next with an error with a message 'Not found' and statusCode 404", async () => {
      const expectedError = new Error();
      expectedError.statusCode = 404;
      expectedError.message = "Not found";
      const next = jest.fn();
      Project.find = jest.fn().mockRejectedValueOnce(new Error());

      await getProjects(null, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
