import prisma from "../config/prisma.js";
import { hashPassword } from "../config/bcrypt.js";

export async function createAdmin(req, res) {
    try {
        const body = req.body;

        // vérifie si l'utilisateur existe déjà
        const existingAdmin = await prisma.admin.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingAdmin) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const admin = await prisma.admin.create({
            data: {
                email: body.email,
                password: await hashPassword(body.password), // hash le mot de passe via bcrypt
            },
        });

        //erreurs
        return res.status(201).json(admin);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Chercher un compte admin
export async function getAdmin(req, res) {
    try {
        const admin = await prisma.admin.findMany();

        return res.status(200).json(admin);
    } catch (error) {
        return res.status(404).json({ error: "No admin found" });
    }
}


// supprimer un comte admin
export async function deleteAdmin(req, res) {
    try {
        const { id } = req.params;

        const admin = await prisma.admin.delete({
            where: {
                id: parseInt(id),
            },
        });

        return res.status(200).json(admin);
    } catch (error) {
        return res.status(404).json({ error: "Admin not found" });
    }
}


// Update des informations (email / password) sur un admin
export async function updateAdmin(req, res) {
    try {
        const { id } = req.params;

        const admin = await prisma.admin.update({
            where: {
                id: parseInt(id),
            },
            data: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(404).json({ error: "Admin not found" });
    }
}
