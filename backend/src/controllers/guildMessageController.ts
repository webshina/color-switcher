import { prisma } from '@/lib/prisma';
import { Request, Response } from 'express';

const update = async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const { hideAsAnnouncement } = req.body;

  await prisma.message.update({
    where: {
      id: Number(messageId),
    },
    data: {
      hideAsAnnouncement,
    },
  });

  return res.json('success');
};

export default {
  update,
};
