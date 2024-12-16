import prisma from "../config/prisma.js";
import path from "path";

async function createInnovations() {
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
                console.log(`Innovation "${innovation.name}" créée.`);
            } else {
                console.log(
                    `Innovation avec le nom "${innovation.name}" existe déjà.`
                );
            }
        }
        console.log("Innovations ajoutées ou déjà existantes.");
    } catch (error) {
        console.error("Erreur lors de la création des innovations:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createInnovations();
