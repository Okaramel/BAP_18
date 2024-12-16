import express from "express";
import { getEtiquettes, createEtiquette, deleteEtiquette, updateEtiquette, getEtiquetteById } from "../controllers/EtiquetteController.js";
import { verifyToken } from "../middleware/TokenMiddleware.js";
import upload from "../middleware/Multer.js";
import prisma from "../config/prisma.js";

const router = express.Router();

// Route pour rendre la page HTML de l'étiquette
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

        // Nettoyer les chemins d'images
        // if (etiquette.logo) etiquette.logo = etiquette.logo.replaceAll("\\", "/");
        // if (etiquette.background) etiquette.background = etiquette.background.replaceAll("\\", "/");
        // if (etiquette.imageContainer2) etiquette.imageContainer2 = etiquette.imageContainer2.replaceAll("\\", "/");
        // if (etiquette.imageContainer3) etiquette.imageContainer3 = etiquette.imageContainer3.replaceAll("\\", "/");
        // if (etiquette.bannerImage) etiquette.bannerImage = etiquette.bannerImage.replaceAll("\\", "/");
        // if (etiquette.imageContainer4) etiquette.imageContainer4 = etiquette.imageContainer4.replaceAll("\\", "/");

        res.render("etiquettePage", { etiquette, "title": etiquette.titleProject });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'étiquette:", error);
        res.status(500).send("Erreur lors de la récupération de l'étiquette");
    }
});

router.get("/", verifyToken, getEtiquettes);

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
router.put(
    "/:id",
    verifyToken,
    upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "background", maxCount: 1 },
        { name: "imageContainer2", maxCount: 1 },
        { name: "imageContainer3", maxCount: 1 },
        { name: "bannerImage", maxCount: 1 },
        { name: "imageContainer4", maxCount: 1 },
    ]),
    updateEtiquette
);

router.get("/:id", verifyToken, getEtiquetteById);

export default router;
