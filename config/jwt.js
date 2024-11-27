const jwt = require('jsonwebtoken');

// Générer un Access Token (durée courte, 15 minutes)
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Générer un Refresh Token (durée longue, 7 jours)
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Vérifier et décoder un token
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; // Retourne null si le token est invalide ou expiré
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
