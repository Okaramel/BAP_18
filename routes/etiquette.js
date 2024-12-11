import express from "express";
import {
    getEtiquettes,
    createEtiquette,
    deleteEtiquette,
    updateEtiquette,
    getEtiquetteById,
} from "../controllers/EtiquetteController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";
import upload from "../middleware/Multer.js";

const router = express.Router();

router.get("/", verifyToken, getEtiquettes);
router.post("/", verifyToken, upload.single("background"), createEtiquette);
router.delete("/:id", verifyToken, deleteEtiquette);
router.put("/:id", verifyToken, upload.single("background"), updateEtiquette);
router.get("/:id", verifyToken, getEtiquetteById);

export default router;
