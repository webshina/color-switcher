import { GetGuildMembersResponse } from '#/common/types/apiResponses/GuildMemberControllerResponse';
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
        pageIdx: Number(pageIdx),
        pageSize: Number(pageSize),
      })
    : [];

  return res.json(result);
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

const updatePosts = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { posts } = req.body;

  await GuildMemberRepository.updatePosts(Number(memberId), posts);

  return res.json('success');
};

export default { getMembers, updatePosts, updateMembers };
