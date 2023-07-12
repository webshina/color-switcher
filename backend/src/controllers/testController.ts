import { Request, Response } from 'express';

const test = async (req: Request, res: Response) => {
  throw new Error('test error');

  res.json('success');
};

export default { test };
