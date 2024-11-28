import prisma from "../config/prisma.js";

export async function getMail(req, res) {
    try {
        const mail = await prisma.mail.findMany();
        return res.status(200).json(mail);
    } catch (error) {
        return res.status(404).json({ error: "No mail found" });
    }
}

export async function createMail(req, res) {
    try {
        const { body } = req;
        const mail = await prisma.mail.create({
            data: {
                email: body.email,
                type: body.type,
            },
        });
        return res.status(201).json(mail);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
