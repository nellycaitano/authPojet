const User = require('../models/User');
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../config/jwt');
const nodemailer = require('nodemailer');

/**
 * Endpoint : Demande de réinitialisation
 */
const requestPasswordReset = async (req, res) => {
  const { token,
    email } = req.body;
    const userEmail = "devpancrace@gmail.com"
    
// Génération d'un compte de test Ethereal
nodemailer.createTestAccount((err, account) => {
  if (err) {
    return console.error('Erreur lors de la création du compte de test :', err);
  }

  // Configuration du transporteur avec Ethereal
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true pour le port 465, false pour les autres ports
    auth: {
      user: account.user, // utilisateur généré
      pass: account.pass  // mot de passe généré
    }
  });

  // Détails de l'e-mail
  const mailOptions = {
    from: 'devpancrace@gmail.com>', // Adresse de l'expéditeur
    to: 'mydevnodetest@gmail.com',          // Adresse du destinataire
    subject: 'Réinitialisation de votre mot de passe',
    text: 'Ceci est un e-mail de test envoyé avec Ethereal.',
  
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
    console.log('E-mail envoyé avec succès :', info.messageId);

    // URL de prévisualisation sur Ethereal
    //console.log('Prévisualisez cet e-mail ici :', nodemailer.getTestMessageUrl(info));
  });
});
/*
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Génération d'un token de réinitialisation
    //const resetToken = generateAccessToken({ id: user._id });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Envoi de l'email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Réinitialisation de votre mot de passe',
      html: `<p>Pour réinitialiser votre mot de passe, cliquez sur ce lien : <a href="${resetLink}">Réinitialiser</a></p>`,
    });

    res.status(200).json({ message: 'Email de réinitialisation envoyé' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }*/
};

/**
 * Endpoint : Réinitialisation du mot de passe
 */
const resetPassword = async (req, res) => {
  const { newPass } = req.body;

  try {

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // Mise à jour du mot de passe
    user.password = await bcrypt.hash(newPass, 10);
    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
};
