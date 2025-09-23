import express from 'express';
import {
  register,
  login,
  verifyEmail,
  resendOTP,
  forgotPassword,
  verifyPasswordResetOTP,
  resetPassword,
  changePassword,
  getProfile,
  logout
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/verify-password-reset-otp', verifyPasswordResetOTP);
router.post('/reset-password', resetPassword);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.get('/profile', getProfile);
router.post('/change-password', changePassword);
router.post('/logout', logout);

export default router;