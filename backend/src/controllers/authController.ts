import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { Request, Response, Router } from 'express';
import { stringify } from 'querystring';
const router = Router();

const discordConnect = async (req: Request, res: Response) => {
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

  // Save the user data
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

  // Relate user to guildMembers
  const guildMembers = await prisma.guildMember.findMany({
    where: {
      discordId: authData.id,
    },
  });
  await Promise.all(
    guildMembers.map((guildMember) =>
      prisma.guildMember.update({
        where: {
          id: guildMember.id,
        },
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })
    )
  );

  // Set cookie
  res.cookie('accessToken', tokenData.access_token, {
    httpOnly: true,
    secure: process.env.APP_ENV !== 'development',
    expires: new Date(Date.now() + tokenData.expires_in * 1000),
  });

  res.json({ user });
};

const logout = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    await prisma.user.update({
      where: {
        discordAccessToken: accessToken,
      },
      data: {
        discordAccessToken: null,
        discordRefreshToken: null,
        discordTokenExpiresAt: null,
      },
    });
  }
  res.clearCookie('accessToken');
  res.json({ success: true });
};

export default { discordConnect, logout };
