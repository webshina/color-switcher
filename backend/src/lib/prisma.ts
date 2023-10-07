declare global {
  var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

import { PrismaClient } from '@prisma/client';
let prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaClient = global.prisma;
}

export const prisma = prismaClient;
