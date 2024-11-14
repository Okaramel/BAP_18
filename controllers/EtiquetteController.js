import prisma from "../config/prisma.js";

export async function getEtiquettes(req, res) {
    try {
        const etiquette = await prisma.etiquette.findMany();
        return res.status(200).send(etiquette);
    } catch (error) {
        return res
            .status(500)
            .send("Erreur lors de la récupération des étiquettes");
    }
}

export async function createEtiquette(req, res) {
    try {
        const body = req.body;
        const newEtiquette = await prisma.etiquette.create({
            data: {
                slug: body.slug,
                image: body.image,
                video: body.video,
                title: body.title,
                description: body.description,
                qrcode: body.qrcode,
                statut: body.statut,
            },
        });
        return res.status(201).send(newEtiquette);
    } catch (error) {
        return res
            .status(500)
            .send("Erreur lors de la création de l'étiquette");
    }
}

export async function deleteEtiquette(req, res) {
    try {
        const id = req.params.id;
        const deleteEtiquette = await prisma.etiquette.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).send(deleteEtiquette);
    } catch (error) {
        return res
            .status(500)
            .send("Erreur lors de la suppression de l'étiquette");
    }
}

export async function updateEtiquette(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateEtiquette = await prisma.etiquette.update({
            where: {
                id: parseInt(id),
            },
            data: {
                slug: body.slug,
                image: body.image,
                video: body.video,
                title: body.title,
                description: body.description,
                qrcode: body.qrcode,
                statut: body.statut,
            },
        });
        return res.status(200).send(updateEtiquette);
    } catch {
        return res
            .status(500)
            .send("Erreur lors de la mise à jour de l'étiquette");
    }
}
