import { prisma } from '@/lib/prisma';
import { UserRepository } from '@/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await UserRepository.getLoginUser(req);
  if (!user) return res.status(401).json('Unauthorized');

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!userData || !userData.isAdmin)
    return res.status(401).json('Invalid user');

  next();
};
