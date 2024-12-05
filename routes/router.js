import express from "express";
import adminRouter from "./admin.js";
import loginRouter from "./login.js";
import etiquetteRouter from "./etiquette.js";
import creatorRouter from "./creator.js";
import tagRouter from "./tag.js";
import mailRouter from "./mail.js";
import innovationRouter from "./innovation.js";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/login", loginRouter);
router.use("/etiquette", etiquetteRouter);
router.use("/creator", creatorRouter);
router.use("/tag", tagRouter);
router.use("/mail", mailRouter);
router.use("/innovation", innovationRouter);

export default router;
