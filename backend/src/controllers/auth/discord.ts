import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { serialize } from 'cookie';
import { Request, Response } from 'express';
import { stringify } from 'querystring';

export const login = async (req: Request, res: Response) => {
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
    discordTokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
  };
  const user = await prisma.user.upsert({
    where: {
      discordId: authData.id,
    },
    update: savingUserData,
    create: savingUserData,
  });

  // Create a new cookie
  const cookie = serialize('access_token', tokenData.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
  });

  // Set the cookie in the response header
  res.setHeader('Set-Cookie', cookie);

  res.json({ user });
};
