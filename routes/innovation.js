import express from "express";
import {
    getInnovation,
    getInnovationById,
    deleteInnovation,
} from "../controllers/InnovationController.js";

const router = express.Router();

router.get("/", getInnovation);
router.get("/:id", getInnovationById);
router.delete("/:id", deleteInnovation);

export default router;
