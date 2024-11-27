const express = require('express');
const { sendVerificationEmail, verifyEmail } = require('../controllers/emailController');
const { authenticateToken } = require('../controllers/authcontroller');
const router = express.Router();

router.post('/send', authenticateToken,sendVerificationEmail);
router.get('/verify/:token',authenticateToken, verifyEmail);

module.exports = router;
