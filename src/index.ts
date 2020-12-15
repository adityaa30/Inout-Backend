import express from "express";
import { setupLogger } from "./helpers/logger";
import config from "./config/config.server";

setupLogger();

const app = express();

app.listen(config.env.port, () => {
  logger.info("Listening on " + config.env.port);
});
