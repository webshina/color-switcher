import { UserRepository } from '@/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';

export const withAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await UserRepository.getLoginUser(req);
  if (!user) return res.status(401).json('Unauthorized');

  next();
};
