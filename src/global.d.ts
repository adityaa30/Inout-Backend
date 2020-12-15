import pino from "pino";

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
}
