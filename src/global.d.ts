import pino from "pino";
import { User } from "./models/User";

declare global {
  const logger: pino.Logger;

  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      logger: pino.Logger;
    }
  }

  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
