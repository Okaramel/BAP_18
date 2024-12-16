import express from "express";
import {
    getInnovation,
    getInnovationById,
} from "../controllers/InnovationController.js";

const router = express.Router();

router.get("/", getInnovation);
router.get("/:id", getInnovationById);

export default router;
