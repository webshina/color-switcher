import { discordConnect, logout } from '@/controllers/authController';
import { getMe } from '@/controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/api/auth/discord', discordConnect);
router.post('/api/auth/logout', logout);
router.get('/api/user/me', getMe);

export { router };
