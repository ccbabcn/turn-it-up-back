require("dotenv").config();
const debug = require("debug")("turnitup:root");
const chalk = require("chalk");
const initializeServer = require("./server/initializeServer");

const port = process.env.SERVER_PORT ?? 4005;

(async () => {
  try {
    await initializeServer(port);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
