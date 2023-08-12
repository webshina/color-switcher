import { prisma } from '@/lib/prisma';
import { Request, Response } from 'express';

const test = async (req: Request, res: Response) => {
  throw new Error('test error');

  res.json('success');
};

const getModelByName = <T>(modelName: T) => {
  return (prisma as any)[modelName];
};

const seed = async (req: Request, res: Response) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(400).json(`Not allowed in ${process.env.NODE_ENV}`);
  }

  const { method, model, data, where } = req.body as {
    method:
      | 'init'
      | 'create'
      | 'select'
      | 'update'
      | 'delete'
      | 'deleteFirebaseUser';
    model: string;
    data: any;
    where: any;
  };

  const prisma = getModelByName(model);

  if (method === 'init') {
    // await initSampleData();
    return res.json('success');
  } else if (method === 'create') {
    await prisma.create({
      data: data,
    });
    return res.json('success');
  } else if (method === 'select') {
    const result = await prisma.select({
      where,
    });

    return res.json(result);
  } else if (method === 'update') {
    await prisma.update({
      where,
      data,
    });
    return res.json('success');
  } else if (method === 'delete') {
    if (where && Object.keys(where).length > 0) {
      await prisma.deleteMany({
        where,
      });
    }
    return res.json('success');
  }
};

export default { test, seed };
