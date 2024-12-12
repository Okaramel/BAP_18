import prisma from "../config/prisma.js";

// fonction pour récupérer toutes les étiquettes
export async function getEtiquettes(req, res) {
    try {
        const etiquettes = await prisma.etiquette.findMany({
            include: {
                creators: true, // inclure les créateurs associés
                etiquettesTags: {
                    include: {
                        tag: true, // inclure les tags associés via EtiquetteTag
                    },
                },
            },
        });
        return res.status(200).send(
            etiquettes.map((etiquette) => ({
                ...etiquette, //  ... = inclut toutes les propriétés de l'objet etiquette
                tags: etiquette.etiquettesTags.map(
                    // map pour transformer chaque élément de etiquettesTags en un objet avec la propriété tag
                    (etiquetteTag) => etiquetteTag.tag
                ),
            }))
        );
    } catch (error) {
        console.error("Erreur lors de la récupération des étiquettes:", error);
        return res
            .status(500)
            .send("Erreur lors de la récupération des étiquettes");
    }
}

// fonction pour récupérer une étiquette par ID
export async function getEtiquetteById(req, res) {
    try {
        const id = parseInt(req.params.id);
        const etiquette = await prisma.etiquette.findUnique({
            where: { id },
            include: {
                creators: true, // inclure les créateurs associés
                etiquettesTags: {
                    include: {
                        tag: true, // inclure les tags associés via EtiquetteTag
                    },
                },
            },
        });
        if (!etiquette) {
            return res.status(404).send("Étiquette non trouvée");
        }
        return res.status(200).send({
            ...etiquette,
            tags: etiquette.etiquettesTags.map(
                (etiquetteTag) => etiquetteTag.tag
            ),
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'étiquette:", error);
        return res
            .status(500)
            .send("Erreur lors de la récupération de l'étiquette");
    }
}

// fonction pour créer une nouvelle étiquette
export async function createEtiquette(req, res) {
    try {
        const {
            slug,
            image,
            titleProject,
            description,
            logo,
            background,
            titleContainer1,
            descriptionContainer1,
            titleContainer2,
            descriptionContainer2,
            imageContainer2,
            titleContainer3,
            descriptionContainer3,
            imageContainer3,
            bannerImage,
            quoteBanner,
            titleContainer4,
            descriptionContainer4,
            imageContainer4,
            creatorId,
            creators = [],
            tags = [],
            innovation = [],
        } = req.body;

        image = req.file.path ? req.file.path : image;
        background = req.file.path ? req.file.path : background;
        imageContainer2 = req.file.path ? req.file.path : imageContainer2;
        imageContainer3 = req.file.path ? req.file.path : imageContainer3;
        bannerImage = req.file.path ? req.file.path : bannerImage;
        quoteBanner = req.file.path ? req.file.path : quoteBanner;
        imageContainer4 = req.file.path ? req.file.path : imageContainer4;

        const newEtiquette = await prisma.etiquette.create({
            data: {
                slug,
                image,
                titleProject,
                description,
                logo,
                background,
                titleContainer1,
                descriptionContainer1,
                titleContainer2,
                descriptionContainer2,
                imageContainer2,
                titleContainer3,
                descriptionContainer3,
                imageContainer3,
                bannerImage,
                quoteBanner,
                titleContainer4,
                descriptionContainer4,
                imageContainer4,
                creatorId: parseInt(creatorId),
                creators: {
                    connect: creators.map((creator) => ({
                        id: parseInt(creator),
                    })),
                },
                etiquettesTags: {
                    create: tags.map((tag) => ({
                        tag: { connect: { id: parseInt(tag) } },
                    })),
                },
                etiquettesInnovation: innovation
                    ? {
                          create: [
                              {
                                  innovation: {
                                      connect: { id: parseInt(innovation) },
                                  },
                              },
                          ],
                      }
                    : undefined,
            },
            include: {
                creators: true,
                etiquettesTags: {
                    include: { tag: true },
                },
                etiquettesInnovation: {
                    include: { innovation: true },
                },
            },
        });

        return res.status(201).json(newEtiquette);
    } catch (error) {
        console.error("Erreur lors de la création de l'étiquette:", error);
        return res.status(500).json({
            error: "Erreur lors de la création de l'étiquette",
            details: error.message,
        });
    }
}

// fonction pour supprimer une étiquette

export async function deleteEtiquette(req, res) {
    try {
        const id = parseInt(req.params.id);

        // supprimer les relations dans EtiquetteTag
        await prisma.etiquetteTag.deleteMany({
            where: {
                etiquetteId: id,
            },
        });

        // supprimer l'étiquette
        const deletedEtiquette = await prisma.etiquette.delete({
            where: {
                id: id,
            },
        });

        return res.status(200).send(deletedEtiquette);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'étiquette:", error);
        return res
            .status(500)
            .send("Erreur lors de la suppression de l'étiquette");
    }
}

// fonction pour mettre à jour une étiquette
export async function updateEtiquette(req, res) {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        console.log("Request body:", body); // log du corps de la requête

        const updatedEtiquette = await prisma.etiquette.update({
            where: {
                id: id,
            },
            data: {
                slug: body.slug,
                image: body.image,
                title: body.title,
                description: body.description,
                creators: {
                    set: [], // supprimer toutes les relations existantes
                    connect: body.creators.map((creator) => ({
                        // connexion multiple des créateurs sélectionnés
                        id: creator.id,
                    })),
                },
                etiquettesTags: {
                    deleteMany: {}, // supprimer toutes les relations existantes
                    create: body.tags.map((tag) => ({
                        // créer de nouvelles relations
                        tag: { connect: { id: tag.id } },
                    })),
                },
            },
            include: {
                creators: true,
                etiquettesTags: {
                    // inclure les tags associés via EtiquetteTag
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return res.status(200).send({
            ...updatedEtiquette,
            tags: updatedEtiquette.etiquettesTags.map(
                (etiquetteTag) => etiquetteTag.tag // inclure les tags associés via EtiquetteTag
            ),
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étiquette:", error); // log des erreurs
        return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de l'étiquette" });
    }
}
