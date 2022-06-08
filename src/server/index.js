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
const auth = require("./middlewares/auth/auth");

const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/user", userRouter);
app.use("/projects", auth, projectsRouter);

app.use(notFoundError);
app.use(validationError);
app.use(generalError);

module.exports = app;
