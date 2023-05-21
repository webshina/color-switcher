import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from './middleware/cors';
import { TrainerRepository } from './repository/TrainerRepository';
import { resError, resSuccess } from './utils/responseHelper';

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { method } = req.query as {
      method: 'getByShop';
    };
    if (method === 'getByShop') {
      const { shopId } = req.query as { shopId: string };
      const trainerUsers = await TrainerRepository.getByShopId(Number(shopId));
      return resSuccess(res, { trainerUsers });
    }
  } else {
    return resError(res, 405);
  }
};

export default cors(handler);
