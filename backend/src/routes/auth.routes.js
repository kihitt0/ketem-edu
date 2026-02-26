const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');
const { registerValidator, loginValidator } = require('../middleware/validators');

// Basic auth routes
router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.get('/me', authenticate, authController.getMe);

// Email verification routes (new registration flow)
router.post('/send-verification-code', authController.sendVerificationCode);
router.post('/verify-email', authController.verifyEmail);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Google OAuth route
router.post('/google', authController.googleAuth);

module.exports = router;
