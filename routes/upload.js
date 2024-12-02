import express from "express";
import upload from "../middleware/Multer.js";

const router = express.Router();

// Route pour gérer les uploads
router.post("/", upload.single("file"), (req, res) => {
    try {
        // Le fichier est accessible via req.file
        res.status(200).json({
            message: "Fichier téléchargé avec succès",
            file: req.file,
        });
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors du téléchargement du fichier",
        });
    }
});

export default router;
