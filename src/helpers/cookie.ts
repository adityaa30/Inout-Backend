import config from "../config/config.server";

export function getCookie(token: String) {
  let cookie = `token=${token}; Max-Age=${config.cookie.expireTime}; HttpOnly;`;

  if (config.env.nodeEnv === "production") {
    // Both extra flags works only for HTTPS 😃
    cookie = `${cookie} SameSite=Strict; Secure`;
  }

  return cookie;
}
