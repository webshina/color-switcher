import { resError, resSuccess } from '@/pages/api/utils/responseHelper';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../middleware/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return resSuccess(res, { message: 'Success' });
  } else if (req.method === 'POST') {
  } else {
    return resError(res, 405);
  }
};

export default cors(handler);
