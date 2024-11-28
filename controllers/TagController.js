import prisma from "../config/prisma.js";

// fonction pour récupérer tous les tags
export async function getTags(req, res) {
    try {
        const tags = await prisma.tag.findMany({
            include: {
                etiquettesTags: {
                    include: {
                        etiquette: true, // inclure les étiquettes associées à chaque tag
                    },
                },
            },
        });
        res.json(tags);
    } catch (error) {
        res.status(404).json({ error: "Pas de tag trouvé" });
    }
}

// fonction pour récupérer un tag par ID
export async function getTagById(req, res) {
    try {
        const { id } = req.params;
        const tag = await prisma.tag.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                etiquettesTags: {
                    include: {
                        etiquette: true, // inclure les étiquettes associées via EtiquetteTag
                    },
                },
            },
        });
        if (!tag) {
            return res.status(404).json({ error: "Tag non trouvé" });
        }
        return res.status(200).json({
            ...tag, // ... = inclut toutes les propriétés de l'objet tag
            etiquettes: tag.etiquettesTags.map(
                // map pour transformer chaque élément de etiquettesTags en un objet avec la propriété etiquette
                (etiquetteTag) => etiquetteTag.etiquette // inclure les étiquettes associées via EtiquetteTag
            ),
        });
    } catch (error) {
        console.error("Erreur lors de la récupération du tag:", error);
        return res
            .status(500)
            .json({ error: "Erreur lors de la récupération du tag" });
    }
}

// fonction pour créer un nouveau tag
export async function createTag(req, res) {
    try {
        const { body } = req;
        const tag = await prisma.tag.create({
            data: {
                slug: body.slug,
                name: body.name,
                description: body.description,
            },
        });
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création du tag" });
    }
}

// fonction pour supprimer un tag
export async function deleteTag(req, res) {
    try {
        const { id } = req.params;

        // supprimer les relations dans EtiquetteTag
        await prisma.etiquetteTag.deleteMany({
            where: {
                tagId: parseInt(id),
            },
        });

        // supprimer le tag
        const tag = await prisma.tag.delete({
            where: {
                id: parseInt(id),
            },
        });

        return res.status(200).json(tag);
    } catch (error) {
        console.error("Erreur lors de la suppression du tag:", error);
        return res.status(404).json({ error: "Tag non trouvé" });
    }
}

// fonction pour mettre à jour un tag
export async function updateTag(req, res) {
    try {
        const { id } = req.params;
        const tag = await prisma.tag.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: req.body.name,
                description: req.body.description, // mise à jour du nom et de la description du tag
            },
        });
        res.status(200).json(tag);
    } catch (error) {
        res.status(404).json({ error: "Tag non trouvé" });
    }
}
