const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // Expiration du token
});

blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto-suppression après expiration

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
