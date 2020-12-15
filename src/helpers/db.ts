import config from "../config/config.server";

export function getConnectionUri() {
  const username = config.db.username;
  const password = config.db.password;
  const host = config.db.host;
  const port = config.db.port;
  const name = config.db.name;
  const authDb = config.db.authDb;
  const uri = `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=${authDb}`;
  logger.info(uri);
  return uri;
}
