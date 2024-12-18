import nodemailer from "nodemailer";


// Paramètre qui va permettre à envoyer des mails (trouver l'host, le port etc...)
const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user: 'bap18ift@gmail.com',
            pass: 'gkzqxextjwssotah'
        }
    }
);

// Structure de l'email qui va être envoyer selon le schéma mail
export function sendMail(to, sub, msg) {
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });
}


// Structure remplie pour le mail 
export const SendingMailController = async (req, res) => {
    const { email, type } = req.body;

    try {
        await sendMail(
            email,
            "Avez-vous aimer la visite ?",
            `
            <h1>Merci de votre visite !</h1>
            <br>
            <img src="https://makeamove.fr/wp-content/uploads/2023/05/image007-300x300.webp" alt="Logo">
            <p>Nous vous serons reconnaissant d'avoir vos retours sur notre exposition virtuel !</p>
            <br>
            <p>Vous avez été enregistré comme ${type}.</p>`
        );
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    }
};


