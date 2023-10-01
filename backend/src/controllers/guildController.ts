import { AutoGenerateTarget } from '#/common/types/AutoGenerateTarget';
import {
  FetchGuildResponse,
  GenerateGuildResponse,
  GetBatchProgressResponse,
  GetGuildAnnouncementsResponse,
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
  const { announcementsPageIdx, announcementsPageSize, membersCnt } = req.query;

  // Return members if login user is a member of the guild
  const user = await UserRepository.getLoginUser(req);
  const isMember = user
    ? await GuildMemberRepository.isMember(Number(id), user.id)
    : false;
  const isManager = user
    ? await GuildMemberRepository.hasManagePermission(Number(id), user.id)
    : false;

  const result = await GuildRepository.getById(Number(id), {
    byManager: isManager,
    announcementsPageIdx: announcementsPageIdx
      ? Number(announcementsPageIdx)
      : undefined,
    announcementsPageSize: announcementsPageSize
      ? Number(announcementsPageSize)
      : undefined,
    membersCnt: membersCnt ? Number(membersCnt) : undefined,
  });

  const responseData: FetchGuildResponse = {
    ...result,
    isMember,
    isManager,
    notificationsToGuildManager: isMember
      ? result.notificationsToGuildManager
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
      // '1055359796171247616',
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

const getAnnouncements = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { pageIdx, pageSize } = req.query;

  const user = await UserRepository.getLoginUser(req);
  const isManager = user
    ? await GuildMemberRepository.hasManagePermission(Number(guildId), user.id)
    : false;

  const result: GetGuildAnnouncementsResponse =
    await GuildRepository.getAnnouncementMessages(
      Number(guildId),
      isManager,
      pageIdx ? Number(pageIdx) : undefined,
      pageSize ? Number(pageSize) : undefined
    );

  return res.json(result);
};

const update = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { description, isPrivate } = req.body;

  await GuildRepository.update(Number(guildId), {
    description: description as string,
    isPrivate: isPrivate as boolean,
  });

  return res.json('success');
};

const updateCoverImage = async (req: Request, res: Response) => {
  const { guildId } = req.params;

  const form = new Formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const { coverImage } = files;
    await GuildRepository.update(Number(guildId), {
      coverImage: coverImage as Formidable.File,
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
    target === 'shareMessage' ||
    target === 'managementMembers'
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
  const { categoryOrders } = req.body;

  await GuildRepository.updateCategory({ categoryOrders });

  return res.json('success');
};

const updateNotificationToManager = async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const { isShow } = req.body;
  await prisma.notificationToGuildManager.update({
    where: {
      id: Number(notificationId),
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
  getAnnouncements,
  update,
  updateCoverImage,
  toggleAutoGeneration,
  updateTag,
  updateCategory,
  updateNotificationToManager,
};
