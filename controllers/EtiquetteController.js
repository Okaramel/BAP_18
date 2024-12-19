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
                etiquettesInnovation: {
                    include: {
                        innovation: true,
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
            return res.status(404).json({ error: "Étiquette non trouvée" });
        }

        return res.status(200).json(etiquette);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'étiquette:", error);
        return res.status(500).json({
            error: "Erreur lors de la récupération de l'étiquette",
            details: error.message,
        });
    }
}

// fonction pour créer une nouvelle étiquette
export async function createEtiquette(req, res) {
    try {
        const {
            titleProject,
            descriptionProject,
            titleContainer1,
            descriptionContainer1,
            titleContainer2,
            descriptionContainer2,
            titleContainer3,
            descriptionContainer3,
            quoteBanner,
            titleContainer4,
            descriptionContainer4,
            creator,
            creators = [],
            tags = [],
            innovation,
        } = req.body;

        // génére un slug unique à partir de titleProject
        let slug = titleProject.toLowerCase().replace(/\s+/g, "-");
        let existingEtiquette = await prisma.etiquette.findUnique({
            where: { slug },
        });
        let suffix = 1;
        while (existingEtiquette) {
            slug = `${titleProject
                .toLowerCase()
                .replace(/\s+/g, "-")}-${suffix}`;
            existingEtiquette = await prisma.etiquette.findUnique({
                where: { slug },
            });
            suffix++;
        }

        // récupére les chemins des fichiers téléchargés avec vérification
        // clean up paths and replace all anti slash with slash
        const logo = req.files?.logo
            ? req.files.logo[0].path
                  .replace(/public[\\/]/, "")
                  .replaceAll("\\", "/")
            : null;
        const background = req.files?.background
            ? req.files.background[0].path
                  .replace(/public[\\/]/, "")
                  .replaceAll("\\", "/")
            : null;
        const imageContainer2 = req.files?.imageContainer2
            ? req.files.imageContainer2[0].path
                  .replace(/public[\\/]/, "")
                  .replaceAll("\\", "/")
            : null;
        const imageContainer3 = req.files?.imageContainer3
            ? req.files.imageContainer3[0].path
                  .replace(/public[\\/]/, "")
                  .replaceAll("\\", "/")
            : null;
        const bannerImage = req.files?.bannerImage
            ? req.files.bannerImage[0].path
                  .replace(/public[\\/]/, "")
                  .replaceAll("\\", "/")
            : null;
        const imageContainer4 = req.files?.imageContainer4
            ? req.files.imageContainer4[0].path
                  .replace(/public[\\/]/, "")
                  .replaceAll("\\", "/")
            : null;

        const newEtiquette = await prisma.etiquette.create({
            data: {
                slug,
                titleProject,
                descriptionProject: descriptionProject || null,
                logo,
                background,
                titleContainer1,
                descriptionContainer1,
                titleContainer2: titleContainer2 || null,
                descriptionContainer2: descriptionContainer2 || null,
                imageContainer2,
                titleContainer3: titleContainer3 || null,
                descriptionContainer3: descriptionContainer3 || null,
                imageContainer3,
                bannerImage,
                quoteBanner: quoteBanner || null,
                titleContainer4: titleContainer4 || null,
                descriptionContainer4: descriptionContainer4 || null,
                imageContainer4,
                creatorId: parseInt(creator),
                creators:
                    creators.length > 0
                        ? {
                              connect: creators.map((id) => ({
                                  id: parseInt(id),
                              })),
                          }
                        : undefined,
                etiquettesTags:
                    tags.length > 0
                        ? {
                              create: tags.map((tagId) => ({
                                  tag: { connect: { id: parseInt(tagId) } },
                              })),
                          }
                        : undefined,
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

        // supprimer les relations dans EtiquetteInnovation
        await prisma.etiquetteInnovation.deleteMany({
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
        const {
            titleProject,
            description,
            titleContainer1,
            descriptionContainer1,
            titleContainer2,
            descriptionContainer2,
            titleContainer3,
            descriptionContainer3,
            quoteBanner,
            titleContainer4,
            descriptionContainer4,
            creator,
            creators = [],
            tags = [],
            innovation,
        } = req.body;

        // Récupérer les chemins des fichiers téléchargés s'ils existent
        const logo = req.files?.logo ? req.files.logo[0].path : undefined;
        const background = req.files?.background
            ? req.files.background[0].path
            : undefined;
        const imageContainer2 = req.files?.imageContainer2
            ? req.files.imageContainer2[0].path
            : undefined;
        const imageContainer3 = req.files?.imageContainer3
            ? req.files.imageContainer3[0].path
            : undefined;
        const bannerImage = req.files?.bannerImage
            ? req.files.bannerImage[0].path
            : undefined;
        const imageContainer4 = req.files?.imageContainer4
            ? req.files.imageContainer4[0].path
            : undefined;

        const updatedEtiquette = await prisma.etiquette.update({
            where: {
                id: id,
            },
            data: {
                slug: titleProject.toLowerCase().replace(/\s+/g, "-"),
                titleProject,
                descriptionProject: description,
                ...(logo && { logo }),
                ...(background && { background }),
                titleContainer1,
                descriptionContainer1,
                ...(titleContainer2 && { titleContainer2 }),
                ...(descriptionContainer2 && { descriptionContainer2 }),
                ...(imageContainer2 && { imageContainer2 }),
                ...(titleContainer3 && { titleContainer3 }),
                ...(descriptionContainer3 && { descriptionContainer3 }),
                ...(imageContainer3 && { imageContainer3 }),
                ...(bannerImage && { bannerImage }),
                ...(quoteBanner && { quoteBanner }),
                ...(titleContainer4 && { titleContainer4 }),
                ...(descriptionContainer4 && { descriptionContainer4 }),
                ...(imageContainer4 && { imageContainer4 }),
                creatorId: parseInt(creator),
                creators: creators?.length
                    ? {
                          set: [], // supprime les relations existantes
                          connect: creators.map((id) => ({
                              id: parseInt(id),
                          })),
                      }
                    : undefined,
                etiquettesTags: {
                    deleteMany: {}, // supprime les relations existantes
                    create: tags.map((tagId) => ({
                        tag: { connect: { id: parseInt(tagId) } },
                    })),
                },
                etiquettesInnovation: innovation
                    ? {
                          deleteMany: {}, // supprime les relations existantes
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

        return res.status(200).json(updatedEtiquette);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étiquette:", error);
        return res.status(500).json({
            error: "Erreur lors de la mise à jour de l'étiquette",
            details: error.message,
        });
    }
}
