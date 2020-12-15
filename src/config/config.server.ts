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
