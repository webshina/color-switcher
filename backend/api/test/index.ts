import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  throw new Error('Sentry Backend Error');
};

export default handler;
