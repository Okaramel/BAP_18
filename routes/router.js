import express from "express";
import adminRouter from "./admin.js";
import loginRouter from "./login.js";
import etiquetteRouter from "./etiquette.js";
import creatorRouter from "./creator.js";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/login", loginRouter);
router.use("/etiquette", etiquetteRouter);
router.use("/creator", creatorRouter);

export default router;
