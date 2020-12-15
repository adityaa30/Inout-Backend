import express from "express";
import { Request, Response } from "express";

import { login, logout, register } from "./controllers/auth";
import { validateJWTToken } from "./middlewares/auth";

const router = express.Router();

router.get("/status", (_: Request, res: Response) => {
  return res.status(200).send({ success: true, message: "Api Working" });
});

router.post("/auth/login", login);
router.post("/auth/logout", validateJWTToken, logout);
router.post("/auth/register", register);

export default router;
