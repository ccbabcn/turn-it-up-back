require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("turnitup:server:middleware:auth");
const jwt = require("jsonwebtoken");
const customError = require("../../../utils/customError/customError");

const auth = (req, res, next) => {
  const { authorization } = req.hearders;
  try {
    if (!authorization.includes("Bearer ")) {
      debug(chalk.red("No authorization"));
      throw new Error();
    }
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
    debug(chalk.red("User authorized correctly"));

    next();
  } catch (error) {
    const authError = customError(401, "Invalid token");

    next(authError);
  }
};

module.exports = auth;
