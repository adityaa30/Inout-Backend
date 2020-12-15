import config from "../config/config.server";

export const getConnectionUri = () => {
  const username = config.db.username;
  const password = config.db.password;
  const host = config.db.host;
  const port = config.db.port;
  const name = config.db.name;
  const authDb = config.db.authDb;
  return `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=${authDb}`;
};
