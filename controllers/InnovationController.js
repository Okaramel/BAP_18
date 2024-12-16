import prisma from "../config/prisma.js";

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
