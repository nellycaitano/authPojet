const User = require("../models/User");
const { generateAccessToken, verifyToken } = require("../config/jwt");
const nodemailer = require("nodemailer");

// Endpoint : Envoi d'email de vérification
const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const verifyToken = generateAccessToken({ id: req.user.userId });
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;

    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025, // Port par défaut de MailDev
      secure: false,
    });

    // Créer un transporteur en utilisant le serveur SMTP de MailDev

    // Envoyer un email de test
    transporter.sendMail(
      {
        from: "test@example.com",
        to: "recipient@example.com",
        subject: "Test MailDev",
        text: "Ceci est un test.",
      },
      (error, info) => {
        if (error) {
          console.log("Erreur lors de l'envoi de l'email :", error);
        } else {
          console.log("Email envoyé :", info.response);
          res.status(200).json({ message: "Email de vérification envoyé" });
        }
      }
    );
  

  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

/* // Envoi de l'email
    const transportera = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transportera.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Vérification de votre adresse email',
      html: `<p>Pour vérifier votre email, cliquez sur ce lien : <a href="${verifyLink}">Vérifier</a></p>`,
    });

    res.status(200).json({ message: 'Email de vérification envoyé' });*/

/**
 * Endpoint : Vérification de l'email
 */
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const payload = verifyToken(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(400).json({ message: "Token invalide ou expiré" });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email vérifié avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyEmail,
};
