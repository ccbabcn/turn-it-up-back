const Project = require("../../../database/models/Project");
const { mockProjects } = require("../../mocks/mockProjects/mockProjects");
const { getProjects } = require("./projectsControllers");

describe("Given getProjects function", () => {
  describe("When invoked with a response and it finds projects", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response status method 200", async () => {
      const expectedStatus = 200;
      Project.find = jest.fn().mockResolvedValueOnce(mockProjects);

      await getProjects(null, res);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
