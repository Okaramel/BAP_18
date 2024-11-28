import prisma from "../config/prisma.js";
import { comparePassword } from "../config/bcrypt.js";
import { generateToken } from "../config/jwt.js";

export async function login(req, res) {
    const body = req.body;

    const admin = await prisma.admin.findUnique({
        where: {
            email: body.email,
        },
    });
    if (admin === null) {
        return res.status(404).send("Admin not found");
    }
    const isSamePassword = await comparePassword(
        // compare le mot de passe de la requête avec le mot de passe de l'utilisateur
        body.password,
        admin.password
    );

    if (!isSamePassword) {
        // si différent alors retourne une erreur 401
        return res.status(401).send("Invalid password");
    }

    const token = generateToken(admin.id);
    return res.status(200).send({ admin, token });
}
