require("dotenv").config();

const customError = require("../../../utils/customError/customError");

const notFoundError = (req, res, next) => {
  const error = customError(404, "Endpoint not found");
  next(error);
};

module.exports = notFoundError;
