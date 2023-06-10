import authController from '@/controllers/authController';
import guildController from '@/controllers/guildController';
import userController from '@/controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/api/auth/discord', authController.discordConnect);
router.post('/api/auth/logout', authController.logout);
router.get('/api/user/me', userController.getMe);
router.post('/api/guild/generate', guildController.generate);

export { router };
