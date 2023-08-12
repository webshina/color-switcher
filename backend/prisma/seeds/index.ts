import { PrismaClient } from '@prisma/client';
import { mailTemplate } from './mailTemplate';
import { createAdmin } from './user';
const prisma = new PrismaClient();

async function main() {
  await mailTemplate();
  await createAdmin();
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
