const bcrypt = require("bcrypt");
const debug = require("debug")("turnitup:server:userControllers");
const chalk = require("chalk");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../../database/models/User");
const customError = require("../../../utils/customError/customError");

const userRegister = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const queryFind = { username };
    const user = await User.findOne(queryFind);

    if (user) {
      const customNewError = customError(409, "User already exists");
      next(customNewError);
      return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const queryCreate = {
      username,
      password: encryptPassword,
      name,
    };

    await User.create(queryCreate);

    debug(chalk.green("User created"));
    res.status(201).json({ message: "User created" });
  } catch (error) {
    error.statusCode = 400;
    debug(chalk.red("Bad request"));
    error.message = "Bad request";
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const queryFindOne = {
      username,
    };

    const user = await User.findOne(queryFindOne);

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const userData = {
          username: user.username,
          id: user.id,
        };

        const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);

        res.status(201).json({ token });
      } else {
        const error = new Error();
        error.statusCode = 401;
        error.customMessage = "Incorrect username or password";
        next(error);
        return;
      }
    } else {
      const error = new Error();
      error.statusCode = 401;
      error.customMessage = "Incorrect username or password";
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister, userLogin };
