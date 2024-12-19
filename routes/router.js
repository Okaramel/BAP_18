import express from "express";
import adminRouter from "./admin.js";
import loginRouter from "./login.js";
import etiquetteRouter from "./etiquette.js";
import creatorRouter from "./creator.js";
import tagRouter from "./tag.js";
import mailRouter from "./mail.js";
import SendingMailControllerRouter from "./sendingmail.js";
import innovationRouter from "./innovation.js";

const router = express.Router();

////////////////////
// FRONT

router.get("/index", (req, res) => {
    res.render("index", { title: "Home" });
});

router.get("/console", (req, res) => {
    res.render("adminPage/admin", { title: "Admin Console" });
});

router.get("/consoleLogin", (req, res) => {
    res.render("adminPage/loginAdmin", { title: "Admin Login" });
});

router.get("/", (req, res) => {
    res.render("email", { title: "Email" });
});

router.get("/code", (req, res) => {
    res.render("code", { title: "Code" });
});

router.get("/etiquettes", (req, res) => {
    res.render("etiquettePage/etiquettePage", { title: "Project" });
});

router.get("/newsletter", (req, res) => {
    res.render("email/newsletter", { title: "Newsletter" });
});

////////////////////
// BACK

router.use("/admin", adminRouter);
router.use("/login", loginRouter);
router.use("/etiquette", etiquetteRouter);
router.use("/creator", creatorRouter);
router.use("/tag", tagRouter);
router.use("/mail", mailRouter);
router.use("/sendingmail", SendingMailControllerRouter);
router.use("/innovation", innovationRouter);

export default router;
