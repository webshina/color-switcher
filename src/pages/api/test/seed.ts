import { prisma } from '@/lib/prisma';
import { resError, resSuccess } from '@/pages/api/utils/responseHelper';
import { firebaseAdminAuth } from '@/utils/firebaseAdmin';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { initSampleData } from 'seeds/sampleData/initSampleData';
import { cors } from '../middleware/cors';
import { withAuth } from '../middleware/withAuth';

export const config = {
  api: {
    bodyParser: false,
  },
};

const getModelByName = <T>(modelName: T) => {
  return (prisma as any)[modelName];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== 'development') {
    return resError(res, 400, `Not allowed in ${process.env.NODE_ENV}`);
  }

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(
      req,
      async (err, fields: formidable.Fields, files: formidable.Files) => {
        const { method, model, data, where } = fields as {
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
        const { image } = files as { image: formidable.File };

        const prisma = getModelByName(model);

        if (method === 'init') {
          await initSampleData();
          return resSuccess(res);
        } else if (method === 'create') {
          const result = await prisma.create({
            data: data,
          });

          return resSuccess(res, { result });
        } else if (method === 'select') {
          const result = await prisma.select({
            where,
          });

          return resSuccess(res, result);
        } else if (method === 'update') {
          const result = await prisma.update({
            where,
            data,
          });

          return resSuccess(res, { result });
        } else if (method === 'delete') {
          let result;
          if (where && Object.keys(where).length > 0) {
            result = await prisma.deleteMany({
              where,
            });
          } else {
            result = await prisma.deleteMany({});
          }
          return resSuccess(res, { result });
        } else if (method === 'deleteFirebaseUser') {
          const { email } = fields as {
            email: string;
          };
          try {
            const firebaseUser = await firebaseAdminAuth.getUserByEmail(email);
            await firebaseAdminAuth.deleteUser(firebaseUser.uid);
          } catch (error) {}
          return resSuccess(res);
        }
      }
    );
  } else {
    return resError(res, 405);
  }
};

export default cors(withAuth(handler));
