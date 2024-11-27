const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordControllers');
const { authenticateToken } = require('../controllers/authcontroller');
const router = express.Router();

router.post('/forgot-password',authenticateToken, requestPasswordReset);
router.post('/reset',authenticateToken, resetPassword);

module.exports = router;
