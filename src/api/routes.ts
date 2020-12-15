import express from "express";

const router = express.Router();

router.get("/status", (req, res) => {
  return res.status(200).send({ success: true, message: "Api Working" });
});

export default router;
