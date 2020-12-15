import cookie from "cookie";
import { Request, Response, NextFunction } from "express";

import { getUserByJWTToken } from "../../helpers/jwt";

export async function validateJWTToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (cookies && cookies.token) {
      try {
        const user = await getUserByJWTToken(cookies.token);
        req.user = user;
        next();
      } catch (err) {
        return res.status(401).set({ "Set-Cookie": "token=" }).send({
          success: false,
          message: err,
        });
      }
    }
  }

  return res.status(401).set({ "Set-Cookie": "token=" }).send({
    success: false,
    message: "Authentication Token Required.",
  });
}
