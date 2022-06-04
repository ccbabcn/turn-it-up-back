const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const corsOptions = require("../utils/corsOptions");
const {
  notFoundError,
  generalError,
  validationError,
} = require("./middlewares/errors/errors");
const userRouter = require("./routers/userRouter/userRouter");
const projectsRouter = require("./routers/projectsRouter/projectsRouter");

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/projects", projectsRouter);

app.use(notFoundError);
app.use(validationError);
app.use(generalError);

module.exports = app;
