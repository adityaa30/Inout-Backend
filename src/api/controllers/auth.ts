import bcrypt from "bcrypt";
import { Request, Response } from "express";

import config from "../../config/config.server";
import { UserModel } from "../../models/User";
import { getJWTToken } from "../../helpers/jwt";
import { getCookie } from "../../helpers/cookie";
import { isEmail, isStrongPassword } from "../../helpers/validators";

export async function register(req: Request, res: Response) {
  const body = req.body as RegisterRequestBody;

  if (!isEmail(body.email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email",
    });
  }
  if (!isStrongPassword(body.password)) {
    return res.status(400).json({
      success: false,
      message:
        "Your password must contain at least 8 characters in total, at least 1 number, 1 small and capital alphabet and a special character!",
    });
  }

  body.password = await bcrypt.hash(
    req.body.password,
    config.bcrypt.saltRounds
  );

  const user = new UserModel({ ...body });
  try {
    await user.save();
  } catch (error) {
    // User with same mobile-number/email already exists
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  const APIToken = getJWTToken(user);
  logger.info(APIToken);
  return res
    .status(201)
    .set({ "Set-Cookie": getCookie(APIToken) })
    .json({
      success: true,
      message: "Registration Successful",
    });
}

export async function login(req: Request, res: Response) {
  const body = req.body as LoginRequestBody;
  const user = await UserModel.findOne({ mobileNumber: body.mobileNumber });

  if (!user) {
    return res.status(404).send({ success: false, message: "User Not Found" });
  }

  const passwordOk = await bcrypt.compare(body.password, user.password);
  if (!passwordOk) {
    return res.status(401).json({
      success: false,
      message: "Incorrect Credentials",
    });
  }

  const APIToken = getJWTToken(user);
  return res
    .status(201)
    .set({ "Set-Cookie": getCookie(APIToken) })
    .json({
      success: true,
      message: "Login Successful",
    });
}

export async function logout(_: Request, res: Response) {
  return res.status(200).set({ "Set-Cookie": "token=" }).send({
    success: true,
    message: "Successfully logged out",
  });
}
