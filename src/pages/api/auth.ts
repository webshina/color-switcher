import {
  msgWhenFirebaseIdTokenExpired,
  msgWhenUserNotFound,
} from '@/constants/messages';
import { resError, resSuccess } from '@/pages/api/utils/responseHelper';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from './middleware/cors';
import { UserRepository } from './repository/UserRepository';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const user = await UserRepository.getLoginUser(req);

      return resSuccess(res, user);
    } catch (error) {
      if (error === msgWhenUserNotFound) {
        return resError(res, 400, msgWhenUserNotFound);
      } else if (error === msgWhenFirebaseIdTokenExpired) {
        return resError(res, 400, msgWhenFirebaseIdTokenExpired);
      } else {
        throw error;
      }
    }
  } else if (req.method === 'POST') {
  } else {
    return resError(res, 405);
  }
};

export default cors(handler);
