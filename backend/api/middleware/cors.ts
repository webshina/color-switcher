import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export function cors(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    return handler(req, res);
  };
}
