import express from 'express';
import authController from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', loginValidator, authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

export default router;
