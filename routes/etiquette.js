import express from "express";
import {
    getEtiquettes,
    createEtiquette,
    deleteEtiquette,
    getEtiquetteById,
} from "../controllers/EtiquetteController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";
import upload from "../middleware/Multer.js";
import prisma from "../config/prisma.js";

const router = express.Router();

// route pour rendre la page HTML de l'étiquette
router.get("/page/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let etiquette = await prisma.etiquette.findUnique({
            where: { id },
            include: {
                creators: true,
                etiquettesTags: {
                    include: {
                        tag: true,
                    },
                },
                etiquettesInnovation: {
                    include: {
                        innovation: true,
                    },
                },
            },
        });

        if (!etiquette) {
            return res.status(404).send("Étiquette non trouvée");
        }

        res.render("etiquettePage", {
            etiquette,
            title: etiquette.titleProject,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'étiquette:", error);
        res.status(500).send("Erreur lors de la récupération de l'étiquette");
    }
});

router.get("/", getEtiquettes);

router.post(
    "/",
    verifyToken,
    upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "background", maxCount: 1 },
        { name: "imageContainer2", maxCount: 1 },
        { name: "imageContainer3", maxCount: 1 },
        { name: "bannerImage", maxCount: 1 },
        { name: "imageContainer4", maxCount: 1 },
    ]),
    createEtiquette
);

router.delete("/:id", verifyToken, deleteEtiquette);

router.get("/:id", verifyToken, getEtiquetteById);

export default router;
