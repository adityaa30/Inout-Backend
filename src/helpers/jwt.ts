import jwt from "jsonwebtoken";

import { User, UserModel } from "../models/User";
import config from "../config/config.server";

interface JwtToken {
  id: String;
}

export function getJWTToken(user: User) {
  const paylod = { id: user._id.toString() };
  return jwt.sign(paylod, config.jwt.secret, config.jwt.signOptions);
}

export async function getUserByJWTToken(token: string) {
  const decodedToken = jwt.verify(
    token,
    config.jwt.secret,
    config.jwt.verifyOptions
  ) as JwtToken;

  if (!decodedToken) {
    throw new Error("Invalid Token");
  }

  const user = await UserModel.findById(decodedToken.id);

  if (!user) {
    throw new Error("Invalid Token");
  }

  return user;
}
