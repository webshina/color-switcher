import { UserRepository } from '@/repositories/UserRepository';
import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  const user = await UserRepository.getByAccessToken(accessToken);

  res.json(user);
};
