import prisma from "../config/prisma.js";

// on définit les types (déjà fait dans la database)
const MailType = {
    ENTREPRISE: "entreprise",
    PARTICULIER: "particulier",
};

// On va chercher tous les emails existants dans la base de données
export async function getMails(req, res) {
    try {
        const emails = await prisma.mail.findMany();
        res.status(200).json(emails);
    } catch (error) {
        console.error("Erreur lors de la récupération des emails:", error);
        res.status(500).json({
            error: "Erreur serveur lors de la récupération des emails",
        });
    }
}

// On va chercher un email précis dans la base de donnée d'après l'ID
export async function getMail(req, res) {
    try {
        const id = parseInt(req.params.id);
        const email = await prisma.mail.findUnique({
            where: { id },
        });

        if (!email) {
            return res.status(404).send("Email non trouvée");
        }

        return res.status(200).json(email);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'email:", error);
        return res
            .status(500)
            .send("Erreur serveur lors de la récupération de l'email");
    }
}

// Création de l'email dans la database
export async function createMail(req, res) {
    try {
        const { email, type } = req.body;

        //
        if (!Object.values(MailType).includes(type)) {
            return res
                .status(400)
                .json({
                    error: `Type invalide. Les types valides sont : ${Object.values(
                        MailType
                    ).join(", ")}`,
                });
        }

        if (!email) {
            return res.status(400).json({ error: "L'email est requis." });
        }

        const existingEmail = await prisma.mail.findUnique({
            where: { email },
        });

        if (existingEmail) {
            return res.status(200).json({
                message: "Cet email existe déjà dans la base de données.",
            });
        }

        const newEmail = await prisma.mail.create({
            data: {
                email,
                type,
            },
        });
        

        return res.status(201).json(newEmail);
    } catch (error) {
        console.error("Erreur lors de la création de l'email:", error);
        return res
            .status(500)
            .send("Erreur serveur lors de la création de l'email");
    }
}

// Supprimer l'email
export async function deleteMail(req, res) {
    try {
        const id = parseInt(req.params.id);
        const email = await prisma.mail.delete({
            where: { id },
        });

        return res.status(200).json(email);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'email:", error);
        return res
            .status(500)
            .send("Erreur serveur lors de la suppression de l'email");
    }
}
