import express from "express";
import userRouter from "./user.js";
import loginRouter from "./login.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/login", loginRouter);

export default router;
