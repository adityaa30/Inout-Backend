import dotenv from "dotenv";
import path from "path";
import assert from "assert";
import fs from "fs";
import { Secret, VerifyOptions, SignOptions } from "jsonwebtoken";

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
      colorize: false,
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

  jwt: {
    secret: process.env.JWT_SECRET as Secret,
    // JWT Options
    // TODO: Use RS256 (need to add private/public to specify keys)
    verifyOptions: {
      issuer: "vortex.nitt.edu",
    } as VerifyOptions,
    signOptions: {
      issuer: "vortex.nitt.edu",
      expiresIn: "24h",
    } as SignOptions,
  },

  cookie: {
    // 2 Days (in seconds)
    expireTime: 2 * 24 * 60 * 60,
  },

  bcrypt: {
    saltRounds: 6,
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
