import { GuildMemberRepository } from '@/repositories/GuildMemberRepository';
import { Request, Response } from 'express';

const updatePosts = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { posts } = req.body;

  await GuildMemberRepository.updatePosts(Number(memberId), posts);

  return res.json('success');
};

export default { updatePosts };
