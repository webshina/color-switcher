import { GetGuildMembersResponse } from '#/common/types/apiResponses/GuildMemberControllerResponse';
import { prisma } from '@/lib/prisma';
import { GuildMemberRepository } from '@/repositories/GuildMemberRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { Request, Response } from 'express';

const getMembers = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { pageIdx, pageSize } = req.query;

  const user = await UserRepository.getLoginUser(req);
  const isMember = user
    ? await GuildMemberRepository.isMember(Number(guildId), user.id)
    : false;

  const result: GetGuildMembersResponse = isMember
    ? await GuildMemberRepository.getByGuildId(Number(guildId), {
        onlyMember: true,
        pageIdx: pageIdx ? Number(pageIdx) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      })
    : [];

  return res.json(result);
};

const getManagementMembers = async (req: Request, res: Response) => {
  const { guildId } = req.params;

  const result: GetGuildMembersResponse =
    await GuildMemberRepository.getManagementMembersByGuildId(Number(guildId));

  return res.json(result);
};

const addAsManagementMember = async (req: Request, res: Response) => {
  const { guildId, memberId } = req.params;

  const managerPost = await prisma.guildPost.findUnique({
    where: {
      guildId_name: {
        guildId: Number(guildId),
        name: 'MANAGER',
      },
    },
  });

  await GuildMemberRepository.updatePosts(Number(memberId), [
    Number(managerPost!.id),
  ]);

  return res.json('success');
};

const deleteAsManagementMember = async (req: Request, res: Response) => {
  const { guildId, memberId } = req.params;

  const managerPost = await prisma.guildPost.findUnique({
    where: {
      guildId_name: {
        guildId: Number(guildId),
        name: 'MANAGER',
      },
    },
  });

  await prisma.guildMemberPostRelation.deleteMany({
    where: {
      guildMemberId: Number(memberId),
      guildPostId: managerPost!.id,
    },
  });

  return res.json('success');
};

const updateMembers = async (req: Request, res: Response) => {
  const { guildId } = req.params;
  const { orders } = req.body;

  await GuildMemberRepository.updateOrder({
    guildId: Number(guildId),
    params: {
      orders,
    },
  });

  return res.json('success');
};

export default {
  getMembers,
  getManagementMembers,
  addAsManagementMember,
  deleteAsManagementMember,
  updateMembers,
};
