import prisma from "../config/prisma.js";
import { hashPassword } from "../config/bcrypt.js";

export async function createUser(req, res) {
    try {
        const body = req.body;

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: await hashPassword(body.password), // hash le mot de passe via bcrypt
            },
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ error: "No users found" });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const user = await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ error: "User not found" });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;

        const user = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                email: req.body.email,
                password: req.body.password,
            },
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ error: "User not found" });
    }
}
