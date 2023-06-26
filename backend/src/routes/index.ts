import authController from '@/controllers/authController';
import guildController from '@/controllers/guildController';
import userController from '@/controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/api/auth/discord', authController.discordConnect);
router.post('/api/auth/logout', authController.logout);
router.get('/api/user/me', userController.getMe);
router.get('/api/user/admin-guilds', userController.fetchAdminGuilds);
router.post('/api/guild/generate', guildController.generate);
router.get('/api/guild/mine', guildController.getMine);
router.get('/api/guild/:id', guildController.get);

export { router };
