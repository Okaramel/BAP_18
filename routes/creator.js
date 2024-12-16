import express from "express";
import {
    createCreator,
    getCreators,
    getCreatorById,
    updateCreator,
    deleteCreator,
} from "../controllers/CreatorController.js";
import upload from "../middleware/Multer.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";

const router = express.Router();

// Route pour créer un créateur avec téléchargement de fichier
router.post("/", verifyToken, upload.single("profile_picture"), createCreator);

router.get("/", verifyToken, getCreators);
router.get("/:id", verifyToken, getCreatorById);
router.put(
    "/:id",
    verifyToken,
    upload.single("profile_picture"),
    updateCreator
);
router.delete("/:id", verifyToken, deleteCreator);

export default router;
