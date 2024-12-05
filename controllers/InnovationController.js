import prisma from "../config/prisma.js";
import path from "path";

export async function createInnovation(req, res) {
    const innovations = [
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
    ];

    try {
        for (const innovation of innovations) {
            const existingInnovation = await prisma.innovation.findUnique({
                where: { name: innovation.name },
            });

            if (!existingInnovation) {
                await prisma.innovation.create({
                    data: innovation,
                });
            } else {
                console.log(
                    `Innovation avec le nom "${innovation.name}" existe déjà.`
                );
            }
        }
        res.status(200).send("Innovations ajouté ou deja existant");
    } catch (error) {
        console.error("Erreur lors de la création des innovations:", error);
        res.status(500).send("Erreur lors de la création des innovations");
    }
}

export async function getInnovation(req, res) {
    try {
        const innovations = await prisma.innovation.findMany();

        res.status(200).json(innovations);
    } catch (error) {
        console.error("Erreur lors de la récupération des innovations:", error);
        res.status(404).json({ error: "Aucune innovation trouvée" });
    }
}

export async function getInnovationById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const innovation = await prisma.innovation.findUnique({
            where: { id },
        });

        if (!innovation) {
            return res.status(404).send("Innovation non trouvée");
        }

        return res.status(200).send(innovation);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'innovation:", error);
        return res
            .status(500)
            .send("Erreur lors de la récupération de l'innovation");
    }
}
