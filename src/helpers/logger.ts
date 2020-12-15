import pino from "pino";
import config from "../config/config.server";

export const setupLogger = () => {
  global.logger = pino(
    {
      level: config.logger.level,
      prettyPrint: config.logger.prettyPrint,
    },
    pino.destination(config.logger.destination)
  );
};
