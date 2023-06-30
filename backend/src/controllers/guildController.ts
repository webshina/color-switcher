import {
  FetchGuildResponse,
  GenerateGuildResponse,
  GetBatchProgressResponse,
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
    const { guildId, guildBatchId } = await GuildRepository.executeBatch(
      discordId,
      user!.id
    );

    const responseData: GenerateGuildResponse = {
      guildId,
      guildBatchId,
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
  if (!user) return res.status(401).json('Unauthorized');

  const responseData: FetchGuildResponse[] = await GuildRepository.getByUserId(
    user.id
  );

  return res.json(responseData);
};

const getBatchProgress = async (req: Request, res: Response) => {
  const { batchId } = req.params;

  const response: GetBatchProgressResponse =
    await GuildRepository.getBatchProgress(Number(batchId));

  return res.json(response);
};

export default { generate, get, getMine, getBatchProgress };
