import { NextApiResponse } from 'next';

export const resSuccess = (res: NextApiResponse, data?: object | null) => {
  res.status(200).json(data);
};

export const resError = (
  res: NextApiResponse,
  status: number,
  message?: string | Object
) => {
  if (status === 405) {
    res.status(status).json('Method Not Allowed');
  } else {
    res.status(status).json(message);
  }
};
