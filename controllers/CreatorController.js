import prisma from "../config/prisma.js";

// fonction pour récupérer tous les créateurs
export async function getCreators(req, res) {
    try {
        const creators = await prisma.creator.findMany({
            include: {
                etiquettes: true, // inclure les étiquettes associées au créateur
            },
        });
        return res.status(200).send(creators);
    } catch (error) {
        console.error("Erreur lors de la récupération des créateurs:", error);
        return res
            .status(500)
            .send("Erreur lors de la récupération des créateurs");
    }
}

// fonction pour récupérer une étiquette par ID
export async function getCreatorById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const creator = await prisma.creator.findUnique({
            where: { id },
            include: {
                etiquettes: {
                    include: {
                        etiquettesTags: {
                            include: {
                                tag: true, // inclure les tags associés via EtiquetteTag
                            },
                        },
                    },
                },
            },
        });
        if (!creator) {
            return res.status(404).send("Créateur non trouvé");
        }
        return res.status(200).send({
            ...creator,
            etiquettes: creator.etiquettes.map((etiquette) => ({
                ...etiquette,
                tags: etiquette.etiquettesTags.map(
                    (etiquetteTag) => etiquetteTag.tag
                ),
            })),
        });
    } catch (error) {
        console.error("Erreur lors de la récupération du créateur:", error);
        return res
            .status(500)
            .send("Erreur lors de la récupération du créateur");
    }
}

// fonction pour créer un nouveau créateur
export async function createCreator(req, res) {
    try {
        const { name, email, linkedin } = req.body;
        const profilePicture = req.file
            ? req.file.path.replace("public/", "")
            : null;

        const newCreator = await prisma.creator.create({
            data: {
                name,
                email,
                linkedin,
                image: profilePicture,
            },
        });
        return res.status(201).send(newCreator);
    } catch (error) {
        console.error("Erreur lors de la création du créateur:", error);
        return res.status(500).send("Erreur lors de la création du créateur");
    }
}

// fonction pour supprimer un créateur
export async function deleteCreator(req, res) {
    try {
        const id = req.params.id;
        const deletedCreator = await prisma.creator.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).send(deletedCreator);
    } catch (error) {
        console.error("Erreur lors de la suppression du créateur:", error);
        return res
            .status(500)
            .send("Erreur lors de la suppression du créateur");
    }
}

// fonction pour mettre à jour un créateur
export async function updateCreator(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { name, email, linkedin } = req.body;
        const profilePicture = req.file
            ? req.file.path.replace("public/", "")
            : null;

        const updatedCreator = await prisma.creator.update({
            where: { id },
            data: {
                name,
                email,
                linkedin,
                ...(profilePicture && { image: profilePicture }),
            },
        });

        return res.status(200).json(updatedCreator);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du créateur:", error);
        return res
            .status(500)
            .send("Erreur lors de la mise à jour du créateur");
    }
}
