import { GuildMemberRepository } from '@/repositories/GuildMemberRepository';
import { Request, Response } from 'express';

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

export default { updatePosts, updateMembers };
