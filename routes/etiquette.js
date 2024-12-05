import express from "express";
import {
    createEtiquette,
    getEtiquettes,
    getEtiquetteById,
    updateEtiquette,
    deleteEtiquette,
} from "../controllers/EtiquetteController.js";
import upload from "../middleware/Multer.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getEtiquettes);
router.post(
    "/",
    verifyToken,
    upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "background", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
        { name: "quoteBanner", maxCount: 1 },
    ]),
    createEtiquette
);
router.get("/:id", verifyToken, getEtiquetteById);
router.put("/:id", verifyToken, updateEtiquette);
router.delete("/:id", verifyToken, deleteEtiquette);

export default router;
