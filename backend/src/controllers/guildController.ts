import { AutoGenerateTarget } from '#/common/types/AutoGenerateTarget';
import {
  FetchGuildResponse,
  GenerateGuildResponse,
  GetBatchProgressResponse,
} from '#/common/types/apiResponses/GuildControllerResponse';
import { prisma } from '@/lib/prisma';
import { GuildMemberRepository } from '@/repositories/GuildMemberRepository';
import { GuildRepository } from '@/repositories/GuildRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { isError } from '@/utils/typeNarrower';
import { Request, Response } from 'express';
import Formidable from 'formidable';

const get = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await GuildRepository.getById(Number(id));

  // Return members if login user is a member of the guild
  const user = await UserRepository.getLoginUser(req);
  const isMember = user
    ? await GuildMemberRepository.isMember(Number(id), user.id)
    : false;

  const responseData: FetchGuildResponse = {
    ...result,
    members: isMember ? result.members : [],
    isMember,
    announcementsToGuildManager: isMember
      ? result.announcementsToGuildManager
      : [],
  };

  return res.json(responseData);
};

const generate = async (req: Request, res: Response) => {
  const { guildDiscordId } = req.body;

  const user = await UserRepository.getLoginUser(req);

  try {
    const { guildId, guildBatchId } = await GuildRepository.generate(
      guildDiscordId,
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

const update = async (req: Request, res: Response) => {
  const { guildId } = req.params;

  const form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const { description } = fields;
    const { coverImage } = files;
    await GuildRepository.update(Number(guildId), {
      coverImage: coverImage as Formidable.File,
      description: description as string,
    });

    return res.json('success');
  });
};

const toggleAutoGeneration = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { value, memberId } = req.body;
  const target = req.body.target as AutoGenerateTarget;

  if (
    target === 'tags' ||
    target === 'description' ||
    target === 'shareMessage'
  ) {
    await GuildRepository.toggleAutoGeneration(Number(guildId), {
      target,
      value: value as boolean,
    });
  } else if (target === 'member') {
    await GuildMemberRepository.toggleAutoGeneration(
      Number(memberId),
      value as boolean
    );
  }

  return res.json('success');
};

const updateTag = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { method, tagName, tagId } = req.body;
  await GuildRepository.updateTag(Number(guildId), {
    method,
    name: tagName as string,
    tagId: Number(tagId),
  });
  return res.json('success');
};

const updateCategory = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { categoryOrders } = req.body;

  await GuildRepository.updateCategory(Number(guildId), { categoryOrders });

  return res.json('success');
};

const updateAnnouncementToManager = async (req: Request, res: Response) => {
  const { announcementId } = req.params;
  const { isShow } = req.body;

  await prisma.announcementToGuildManager.update({
    where: {
      id: Number(announcementId),
    },
    data: {
      isShow: isShow as boolean,
    },
  });

  return res.json('success');
};

export default {
  generate,
  get,
  getMine,
  getBatchProgress,
  update,
  toggleAutoGeneration,
  updateTag,
  updateCategory,
  updateAnnouncementToManager,
};
