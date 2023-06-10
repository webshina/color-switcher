import { UserRepository } from '@/repositories/UserRepository';
import { Request, Response } from 'express';

const getMe = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  const user = await UserRepository.getByAccessToken(accessToken);

  res.json(user);
};

export default { getMe };
