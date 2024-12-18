import express from "express";
import { getMails, createMail } from "../controllers/MailController.js";

const router = express.Router();

router.get("/", getMails);
router.post("/", createMail);

export default router;
