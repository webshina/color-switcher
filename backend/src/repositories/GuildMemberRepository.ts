import { prisma } from '@/lib/prisma';
import { addToDate } from '@/utils/dateHelper';
import { Guild } from 'discord.js';

export class GuildMemberRepository {
  static async generateMember(props: {
    fetchedGuild: Guild;
    guildId: number;
    batchId: number;
  }) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: props.guildId,
      },
    });
    if (!guildData) {
      throw new Error('Guild not found');
    }

    const fetchedMembers = props.fetchedGuild.members.cache;
    await Promise.all(
      fetchedMembers.map(async (member) => {
        const fetchedMember = await member.fetch();

        // Skip bots
        if (fetchedMember.user.bot) {
          return;
        }

        const data = {
          discordId: fetchedMember.id,
          guildId: props.guildId,
          name: fetchedMember.user.username,
          isOwner: fetchedMember.id === props.fetchedGuild.ownerId,
          permissions: Number(fetchedMember.permissions),
          displayName: fetchedMember.displayName,
          avatarURL: fetchedMember.user.avatarURL(),
          joinedAt: fetchedMember.joinedAt,
        };
        const guildMemberData = await prisma.guildMember.upsert({
          where: {
            discordId: fetchedMember.id,
          },
          update: data,
          create: data,
        });

        // Fetch roles
        for (const role of fetchedMember.roles.cache.values()) {
          const data1 = {
            discordId: role.id,
            guildId: props.guildId,
            name: role.name,
            permissions: role.permissions.bitfield,
            hexColor: role.hexColor,
            position: role.position,
          };
          const guildRoleData = await prisma.guildRole.upsert({
            where: {
              discordId: role.id,
            },
            update: data1,
            create: data1,
          });

          const data2 = {
            guildMemberId: guildMemberData.id,
            guildRoleId: guildRoleData.id,
          };
          await prisma.guildMemberRoleRelation.upsert({
            where: {
              guildMemberId_guildRoleId: {
                guildMemberId: guildMemberData.id,
                guildRoleId: guildRoleData.id,
              },
            },
            create: data2,
            update: data2,
          });
        }
      })
    );

    // calculate active score
    this.calculateActivityLevel(props.guildId);

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        isGuildMemberGenerationCompleted: true,
      },
    });
  }

  static async calculateNumOfMessagesPerDay(guildMemberId: number) {
    const guildMemberData = await prisma.guildMember.findUnique({
      where: {
        id: guildMemberId,
      },
    });
    const lastMessage = await prisma.message.findFirst({
      where: {
        authorDiscordId: guildMemberData?.discordId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const messagesData = await prisma.message.findMany({
      where: {
        batchId: lastMessage?.batchId,
        authorDiscordId: guildMemberData?.discordId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let messagesPerDay = 0;

    if (messagesData.length > 0) {
      const now = new Date();
      const oneMonthAgo = addToDate(now, { month: -1 });
      const firstMessageCreatedAt = messagesData[0].createdAt ?? new Date();
      const lastMessageCreatedAt =
        messagesData[messagesData.length - 1].createdAt ?? new Date();
      const timesElapsedSinceFirstMessageCreated =
        now.getTime() - firstMessageCreatedAt.getTime();
      const daysElapsedSinceFirstMessageCreated = Math.max(
        timesElapsedSinceFirstMessageCreated / (1000 * 60 * 60 * 24),
        1
      );
      if (messagesData.length === 0 || lastMessageCreatedAt < oneMonthAgo) {
        // No messages in the last week, set score to 0
        messagesPerDay = 0;
      } else {
        // Calculate score
        let cnt = 0;
        for (const messageData of messagesData) {
          if (messageData.content && messageData.content !== '') {
            cnt++;
          }
        }
        messagesPerDay = cnt / daysElapsedSinceFirstMessageCreated;
      }
    }

    await prisma.guildMember.update({
      where: {
        id: guildMemberId,
      },
      data: {
        messagesPerDay,
      },
    });

    return messagesPerDay;
  }

  static async calculateActivityLevel(guildId: number) {
    const guildMembers = await prisma.guildMember.findMany({
      where: {
        guildId: guildId,
      },
    });
    await Promise.all(
      guildMembers.map(async (guildMember) => {
        await this.calculateNumOfMessagesPerDay(guildMember.id);
      })
    );

    let memberMessageScores = guildMembers
      // Filter out channels that don't have messagesPerDay
      .filter((guildMember) => {
        if (guildMember.messagesPerDay !== null) {
          return true;
        }
      })
      .map((guildMember) => ({
        id: guildMember.id,
        // Logarithmically scale messagesPerDay
        score:
          guildMember.messagesPerDay && guildMember.messagesPerDay > 0
            ? Math.log10(guildMember.messagesPerDay)
            : 0,
      }));
    const memberMessageScoresArray = memberMessageScores.map(
      (memberMessageScore) => memberMessageScore.score
    );
    const maxScore = Math.max(...memberMessageScoresArray);
    const minScore = Math.min(...memberMessageScoresArray);
    let activityScore = 0;
    for (const memberMessageScore of memberMessageScores) {
      if (guildMembers.length < 2) {
        // If number of channels is a little, evaluate activityScore on an absolute scale
        const member = guildMembers.find(
          (member) => member.id === memberMessageScore.id
        );
        const messagesPerDay = member!.messagesPerDay!;
        if (messagesPerDay === 0) {
          activityScore = 0;
        } else if (messagesPerDay < 0.1) {
          activityScore = 1;
        } else if (messagesPerDay < 0.3) {
          activityScore = 2;
        } else if (messagesPerDay < 0.5) {
          activityScore = 3;
        } else if (messagesPerDay < 1) {
          activityScore = 4;
        } else if (messagesPerDay >= 1) {
          activityScore = 5;
        }
      } else {
        activityScore =
          maxScore === 0 && minScore === 0
            ? 0
            : Math.round(
                ((memberMessageScore.score! - minScore) /
                  (maxScore - minScore)) *
                  5
              );
      }
      await prisma.guildMember.update({
        where: {
          id: memberMessageScore.id,
        },
        data: {
          activityScore,
        },
      });
    }
  }
}
