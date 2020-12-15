import dotenv from "dotenv";
import path from "path";
import assert from "assert";
import fs from "fs";

dotenv.config();

const DEVELOPMENT = "development";
const PRODUCTION = "production";

const config = {
  env: {
    port: 8080,
    nodeEnv: process.env.NODE_ENV,
    domain: process.env.DOMAIN,
  },

  logger: {
    level: process.env.LOG_LEVEL || "info",
    prettyPrint: {
      colorize: true,
      translateTime: true,
    },
    destination: path.resolve(__dirname, "..", "..", "logs", "main.log"),
  },

  // MongoDB Database
  db: {
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    name: process.env.MONGO_INITDB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    authDb: process.env.DB_AUTH,
  },
};

assert(config.env.nodeEnv == DEVELOPMENT || config.env.nodeEnv == PRODUCTION);

const checkDirs = [path.dirname(config.logger.destination)];

for (const checkDirPath of checkDirs) {
  console.log(`Create directory: ${checkDirPath}`);
  if (!fs.existsSync(checkDirPath)) {
    fs.mkdirSync(checkDirPath);
  }
}

export default config;
