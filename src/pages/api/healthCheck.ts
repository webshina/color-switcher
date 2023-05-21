import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from './middleware/cors';
import { resSuccess } from './utils/responseHelper';

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  resSuccess(res);
};

export default cors(handler);
