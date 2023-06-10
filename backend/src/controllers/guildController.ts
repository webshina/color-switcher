import { GuildRepository } from '@/repositories/GuildRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { Request, Response, Router } from 'express';
const router = Router();

const generate = async (req: Request, res: Response) => {
  const { discordId } = req.body;
  const user = await UserRepository.getLoginUser(req);
  await GuildRepository.fetchInfo(discordId, user!.id);
  res.json({ message: 'ok' });
};

export default { generate };
