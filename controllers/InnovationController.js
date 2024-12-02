import prisma from "../config/prisma.js";
import path from "path";

export async function uploadImage(req, res) {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: "Aucun fichier téléchargé" });
        }

        const imagePath = path.join("uploads/images", file.filename);
        res.status(200).json({
            message: "Image téléchargée avec succès",
            imagePath,
        });
    } catch (error) {
        console.error("Erreur lors du téléchargement de l'image:", error);
        res.status(500).json({
            error: "Erreur lors du téléchargement de l'image",
        });
    }
}

export async function main() {
    await prisma.innovation.createMany({
        data: [
            {
                name: "Artificial Lives",
                description:
                    "Exploring new opportunities in Human-Computer Interaction, Swarm Cobotic and AI-base Extended Intelligence, Cross Reality, Wearable and Internet of Things.",
                image: path.join("uploads/images", "al.png"),
            },
            {
                name: "Human Learning",
                description:
                    "Developing Sustainable and Resilient Technologies, embracing long term perspectives of Climate Change. Exploring both Alternative Materials, and Low Tech Methodologies.",
                image: path.join("uploads/images", "rf.png"),
            },
            {
                name: "Resilient Futures",
                description:
                    "Creating Tools that empower the lifelong constructor of Knowledge and Know-How, engaging drivers Learners through Embodied and Multimodal Experiences.",
                image: path.join("uploads/images", "hl.png"),
            },
        ],
    });
    console.log("Categories added");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
