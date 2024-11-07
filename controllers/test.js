import prisma from "../config/prisma.js";

async function main() {
    const user = await prisma.user.create({
        data: {
            email: "test@example.com",
            password: "password123",
        },
    });

    console.log(user);

    const etiquette = await prisma.etiquette.create({
        data: {
            titre: "Retro",
            description: "Ressources et inspirations rétro",
            statut: "en_cours",
        },
    });

    console.log(etiquette);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
