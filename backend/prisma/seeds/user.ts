import { prisma } from '@/lib/prisma';
import { adminUserData } from './data';

export const createAdmin = async () => {
  await prisma.user.deleteMany({
    where: {
      discordId: adminUserData.discordId,
    },
  });
  await prisma.user.create({
    data: adminUserData,
  });
};
