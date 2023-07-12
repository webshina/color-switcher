import { MyAdminGuildsResponse } from '#/common/types/apiResponses/UserControllerResponse';
import { UserRepository } from '@/repositories/UserRepository';
import { Request, Response } from 'express';

const getMe = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  const user = await UserRepository.getByAccessToken(accessToken);

  res.json(user);
};

const fetchAdminGuilds = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  const user = await UserRepository.getByAccessToken(accessToken);
  if (!user) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  const response = (await UserRepository.fetchAdminGuilds(
    user.id
  )) as MyAdminGuildsResponse;

  return res.json(response);
};

export default { getMe, fetchAdminGuilds };
