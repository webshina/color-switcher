import { prisma } from '@/lib/prisma';
import { resError, resSuccess } from '@/pages/api/utils/responseHelper';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import { cors } from '../middleware/cors';

export type DiscordAuthResponse = {
  id: number;
  discordId: string;
  discordAccessToken: string;
  discordRefreshToken: string;
  discordTokenExpiresAt: Date;
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { code } = req.body;

      const { data: tokenData } = await axios.post(
        'https://discord.com/api/oauth2/token',
        stringify({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.DISCORD_REDIRECT_URI,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { data: authData } = await axios.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );

      const savingUserData = {
        discordId: authData.id,
        discordAccessToken: tokenData.access_token,
        discordRefreshToken: tokenData.refresh_token,
        discordTokenExpiresAt: new Date(
          Date.now() + tokenData.expires_in * 1000
        ),
      };
      const user = await prisma.user.upsert({
        where: {
          discordId: authData.id,
        },
        update: savingUserData,
        create: savingUserData,
      });

      const data: DiscordAuthResponse = user;

      return resSuccess(res, data);
    } catch (error) {
      throw error;
    }
  } else {
    return resError(res, 405);
  }
};

export default cors(handler);
