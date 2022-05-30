const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const corsOptions = require("../utils/corsOptions");

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

module.exports = app;
