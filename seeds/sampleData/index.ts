import { prisma } from '@/lib/prisma';
import { initSampleData } from './initSampleData';

initSampleData()
  .catch((e) => {})
  .finally(async () => {
    await prisma.$disconnect();
  });
