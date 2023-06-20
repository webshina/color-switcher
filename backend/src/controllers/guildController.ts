import {
  FetchGuildResponse,
  GenerateGuildResponse,
} from '#/common/types/apiResponses/GuildControllerResponse';
import { GuildRepository } from '@/repositories/GuildRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { isError } from '@/utils/typeNarrower';
import { Request, Response } from 'express';

const get = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await GuildRepository.getById(Number(id));

  const responseData: FetchGuildResponse = result;

  return res.json(responseData);
};

const generate = async (req: Request, res: Response) => {
  const { discordId } = req.body;

  const user = await UserRepository.getLoginUser(req);

  try {
    const guildId = await GuildRepository.fetchInfo(discordId, user!.id);

    const responseData: GenerateGuildResponse = {
      guildId,
    };

    return res.json(responseData);
  } catch (error) {
    if (isError(error)) {
      return res.status(400).json(error.message);
    }
  }
};

const getMine = async (req: Request, res: Response) => {
  const user = await UserRepository.getLoginUser(req);

  const responseData: FetchGuildResponse[] = await GuildRepository.getByUserId(
    user.id
  );

  return res.json(responseData);
};

export default { generate, get, getMine };
