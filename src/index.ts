import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { setupLogger } from "./helpers/logger";
import { getConnectionUri } from "./helpers/db";
import config from "./config/config.server";

import routes from "./api/routes";

setupLogger();

mongoose.connect(
  getConnectionUri(),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) logger.error(err);
    else logger.info("Connected to db successfully 😎");
  }
);

const app = express();

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/api", routes);

app.listen(config.env.port, () => {
  logger.info("Listening on " + config.env.port);
});
