import express from "express";
import {
    createInnovation,
    getInnovation,
    getInnovationById,
} from "../controllers/InnovationController.js";

const router = express.Router();

router.post("/", createInnovation);
router.get("/", getInnovation);
router.get("/:id", getInnovationById);

export default router;
