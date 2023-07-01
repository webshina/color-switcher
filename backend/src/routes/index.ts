import authController from '@/controllers/authController';
import guildController from '@/controllers/guildController';
import userController from '@/controllers/userController';
import { withAuth } from '@/middleware/auth';
import { isGuildManager } from '@/middleware/isGuildManager';
import { Router } from 'express';

const router = Router();

// Auth
router.post('/api/auth/discord', authController.discordConnect);
router.post('/api/auth/logout', withAuth, authController.logout);

// User
router.get('/api/user/me', withAuth, userController.getMe);
router.get('/api/user/admin-guilds', withAuth, userController.fetchAdminGuilds);

// Guild
router.post(
  '/api/guild/generate',
  withAuth,
  isGuildManager,
  guildController.generate
);
router.post(
  '/api/guild/update/:guildId',
  withAuth,
  isGuildManager,
  guildController.update
);
router.get('/api/guild/mine', withAuth, guildController.getMine);
router.get(
  '/api/guild/progress/:batchId',
  withAuth,
  guildController.getBatchProgress
);
router.get('/api/guild/:id', guildController.get);

export { router };
