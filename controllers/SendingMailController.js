import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "bap18ift@gmail.com",
        pass: "gkzqxextjwssotah",
    },
});

export function sendMail(to, sub, msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg,
    });
}

export const SendingMailController = async (req, res) => {
    const { email, type } = req.body;

    try {
        await sendMail(
            email,
            "Veux-tu m'épouser ?",
            `<p>Bonjour,</p><p>Vous avez été enregistré comme ${type} avec l'email : ${email}.</p>`
        );
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
    }
};
