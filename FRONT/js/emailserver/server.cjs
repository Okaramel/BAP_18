// Importer la bibliothèque Nodemailer
const nodemailer = require('nodemailer');

// Créer un objet transporteur
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false, // utiliser SSL
  auth: {
    user: 'e35f2ed274fdb3',
    pass: '7f154bb9882c7c',
  }
});

// Configurer l'objet mailOptions
const mailOptions = {
  from: 'info@mailtrap.club',
  to: 'justinefoghaven@gmail.com',
  subject: 'Envoyer un email en utilisant Node.js',
  text: 'Test'
};

// Envoyer l'email
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('Erreur:', error);
  } else {
    console.log('Email envoyé:', info.response);
  }
});
