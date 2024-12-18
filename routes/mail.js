import express from "express";
import {
    getMails,
    createMail,
    deleteMail,
} from "../controllers/MailController.js";

const router = express.Router();

router.get("/", getMails);
router.post("/", createMail);
router.delete("/:id", deleteMail);

export default router;
