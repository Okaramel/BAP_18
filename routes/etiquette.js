import express from "express";
import {
    getEtiquettes,
    createEtiquette,
    deleteEtiquette,
    updateEtiquette,
} from "../controllers/EtiquetteController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getEtiquettes);
router.post("/", verifyToken, createEtiquette);
router.delete("/:id", verifyToken, deleteEtiquette);
router.put("/:id", verifyToken, updateEtiquette);

export default router;
