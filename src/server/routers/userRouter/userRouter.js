const express = require("express");
const { validate } = require("express-validation");
const {
  userRegister,
  userLogin,
} = require("../../controllers/userControllers/userControllers");
const {
  userRegisterCredentials,
  userLoginCredentials,
} = require("../../schemas/userCredentials");

const userRouter = express.Router();

userRouter.post("/register", validate(userRegisterCredentials), userRegister);
userRouter.post("/login", validate(userLoginCredentials), userLogin);

module.exports = userRouter;
