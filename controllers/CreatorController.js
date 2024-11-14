import prisma from "../config/prisma.js";

export async function getCreators(req, res) {
    try {
        const creators = await prisma.creator.findMany();
        return res.status(200).send(creators);
    } catch (error) {
        return res
            .status(500)
            .send("Erreur lors de la récupération des créateurs");
    }
}

export async function createCreator(req, res) {
    try {
        const body = req.body;
        const newCreator = await prisma.creator.create({
            data: {
                name: body.name,
                email: body.email,
                linkedin: body.linkedin,
                image: body.image,
            },
        });
        return res.status(201).send(newCreator);
    } catch (error) {
        return res.status(500).send("Erreur lors de la création du créateur");
    }
}

export async function deleteCreator(req, res) {
    try {
        const id = req.params.id;
        const deleteCreator = await prisma.creator.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).send(deleteCreator);
    } catch (error) {
        return res
            .status(500)
            .send("Erreur lors de la suppression du créateur");
    }
}
