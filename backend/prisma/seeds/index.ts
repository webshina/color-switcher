import { PrismaClient } from '@prisma/client';
import { mailTemplate } from './mailTemplate';
import { createAdmin } from './user';
const prisma = new PrismaClient();

async function seed() {
  await mailTemplate();
  await createAdmin();
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
