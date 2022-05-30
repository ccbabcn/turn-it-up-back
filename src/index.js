require("dotenv").config();
const debug = require("debug")("turnitup:root");
const chalk = require("chalk");
const connectDatabase = require("./database");
const initializeServer = require("./server/initializeServer");

const port = process.env.SERVER_PORT ?? 4005;
const connectionString = process.env.MONGODB_STRING;

(async () => {
  try {
    await connectDatabase(connectionString);
    await initializeServer(port);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
  }
})();
