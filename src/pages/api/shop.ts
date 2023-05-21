import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from './middleware/cors';
import { ShopRepository } from './repository/ShopRepository';
import { resError, resSuccess } from './utils/responseHelper';

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query as { id: string };

    if (id) {
      const shop = await ShopRepository.getById(Number(id));
      if (!shop) {
        throw 'Shop not found';
      }
      const shopProfile = ShopRepository.format(shop, { profile: true });
      return resSuccess(res, { shop: shopProfile });
    } else {
      const shops = await ShopRepository.getAll();
      if (!shops) {
        throw 'Shops not found';
      }
      const shopProfiles = shops.map((shop) => {
        return ShopRepository.format(shop, { profile: true });
      });
      return resSuccess(res, { shops: shopProfiles });
    }
  } else {
    return resError(res, 405);
  }
};

export default cors(handler);
