import authController from '@/controllers/authController';
import channelController from '@/controllers/channelController';
import guildController from '@/controllers/guildController';
import guildMemberController from '@/controllers/guildMemberController';
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
  '/api/guild/:guildDiscordId/generate',
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
router.post(
  '/api/guild/toggle-auto-generation/:guildId',
  withAuth,
  isGuildManager,
  guildController.toggleAutoGeneration
);
router.post(
  '/api/guild/tag/:guildId',
  withAuth,
  isGuildManager,
  guildController.updateTag
);
router.post(
  '/api/guild/:guildId/channel/category',
  withAuth,
  isGuildManager,
  guildController.updateCategory
);
router.post(
  '/api/guild/:guildId/channels',
  withAuth,
  isGuildManager,
  channelController.updateChannels
);
router.post(
  '/api/guild/:guildId/channel/:channelId',
  withAuth,
  isGuildManager,
  channelController.updateChannel
);
router.post(
  '/api/guild/:guildId/member/:memberId/posts',
  withAuth,
  guildMemberController.updatePosts
);
router.get('/api/guild/mine', withAuth, guildController.getMine);
router.get(
  '/api/guild/progress/:batchId',
  withAuth,
  guildController.getBatchProgress
);
router.get('/api/guild/:id', guildController.get);

export { router };
