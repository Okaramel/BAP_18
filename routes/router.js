import express from "express";
import adminRouter from "./admin.js";
import loginRouter from "./login.js";
import etiquetteRouter from "./etiquette.js";
import creatorRouter from "./creator.js";
import tagRouter from "./tag.js";
import mailRouter from "./mail.js";

const router = express.Router();

////////////////////
// FRONT

router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

////////////////////
// BACK

router.use("/admin", adminRouter);
router.use("/login", loginRouter);
router.use("/etiquette", etiquetteRouter);
router.use("/creator", creatorRouter);
router.use("/tag", tagRouter);
router.use("/mail", mailRouter);

export default router;
