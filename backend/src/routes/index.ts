import authController from '@/controllers/authController';
import channelController from '@/controllers/channelController';
import guildController from '@/controllers/guildController';
import guildMemberController from '@/controllers/guildMemberController';
import guildMessageController from '@/controllers/guildMessageController';
import testController from '@/controllers/testController';
import userController from '@/controllers/userController';
import { withAuth } from '@/middleware/auth';
import { isAdmin } from '@/middleware/isAdmin';
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
router.get('/api/guild/mine', withAuth, guildController.getMine);
router.get(
  '/api/guild/progress/:batchId',
  withAuth,
  guildController.getBatchProgress
);
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
  '/api/guild/cover-image/update/:guildId',
  withAuth,
  isGuildManager,
  guildController.updateCoverImage
);
router.post(
  '/api/guild/:guildId/toggle-auto-generation',
  withAuth,
  isGuildManager,
  guildController.toggleAutoGeneration
);
router.get('/api/guild/:id', guildController.get);

// Tag
router.post(
  '/api/guild/tag/:guildId',
  withAuth,
  isGuildManager,
  guildController.updateTag
);

// Channel
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

// Guild Message
router.post(
  '/api/guild/:guildId/message/:messageId',
  withAuth,
  isGuildManager,
  guildMessageController.update
);

// Guild Announcement
router.get(
  '/api/guild/:guildId/announcements',
  guildController.getAnnouncements
);

// Guild Member
router.get('/api/guild/:guildId/members', guildMemberController.getMembers);
router.get(
  '/api/guild/:guildId/management-members',
  guildMemberController.getManagementMembers
);
router.post(
  '/api/guild/:guildId/members',
  withAuth,
  guildMemberController.updateMembers
);
router.post(
  '/api/guild/:guildId/member/:memberId/management-member/add',
  withAuth,
  isGuildManager,
  guildMemberController.addAsManagementMember
);
router.post(
  '/api/guild/:guildId/member/:memberId/management-member/delete',
  withAuth,
  isGuildManager,
  guildMemberController.deleteAsManagementMember
);

// Notification
router.post(
  '/api/guild/:guildId/notification-to-manager/:notificationId',
  withAuth,
  isGuildManager,
  guildController.updateNotificationToManager
);

// Health Check
router.get('/api/health-check', (req, res) => {
  res.status(200).send('OK');
});

// Test
router.get('/api/test', testController.test);
router.post('/api/test/seed', withAuth, isAdmin, testController.seed);

export { router };
