import express from "express";
import { getMail, createMail } from "../controllers/MailController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getMail);
router.post("/", verifyToken, createMail);

export default router;
