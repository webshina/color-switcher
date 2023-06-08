import { login } from '@/controllers/auth/discord';
import { Request, Response, Router } from 'express';

const router = Router();

router.post('/api/auth/discord', (req: Request, res: Response) => {
  login(req, res);
});

export { router };
