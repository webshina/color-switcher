import { messages } from '#/common/constants/messages';
import { GuildMemberItem } from '#/common/types/Guild';
import { getBot } from '@/lib/discort';
import { prisma } from '@/lib/prisma';
import { addToDate } from '@/utils/dateHelper';
import { GuildMember } from '@prisma/client';
import { Guild } from 'discord.js';

export class GuildMemberRepository {
  static async format(memberId: number) {
    const guildMemberData = await prisma.guildMember.findUnique({
      where: {
        id: memberId,
      },
      include: {
        roleRelations: {
          include: {
            guildMember: true,
            guildRole: true,
          },
        },
        postRelations: {
          include: {
            guildPost: true,
          },
        },
      },
    });
    if (!guildMemberData) {
      throw new Error('Guild member not found');
    }
    const guildMember: GuildMemberItem = {
      id: guildMemberData.id,
      userId: guildMemberData.userId,
      discordId: guildMemberData.discordId,
      guildId: guildMemberData.guildId,
      name: guildMemberData.name,
      isOwner: this.hasPermission(
        Number(guildMemberData.permissions),
        'ADMINISTRATOR'
      ),
      isManager: this.hasPermission(
        Number(guildMemberData.permissions),
        'MANAGE_GUILD'
      ),
      permissions: guildMemberData.permissions.toString(),
      displayName: guildMemberData.displayName,
      avatarURL: guildMemberData.avatarURL,
      joinedAt: guildMemberData.joinedAt,
      messagesPerDay: guildMemberData.messagesPerDay,
      activityScore: guildMemberData.activityScore,
      autoGenerate: guildMemberData.autoGenerate,
      order: guildMemberData.order,
      roles: guildMemberData.roleRelations.map((roleRelation) => ({
        id: roleRelation.guildRole.id,
        discordId: roleRelation.guildRole.discordId,
        guildId: roleRelation.guildRole.guildId,
        name: roleRelation.guildRole.name,
        hexColor: roleRelation.guildRole.hexColor,
        position: roleRelation.guildRole.position,
        permissions: roleRelation.guildRole.permissions.toString(),
      })),
      posts: guildMemberData.postRelations.map((postRelation) => ({
        id: postRelation.guildPost.id,
        guildId: postRelation.guildPost.guildId,
        name: postRelation.guildPost.name,
      })),
    };
    return guildMember;
  }

  static async getByGuildId(guildId: number) {
    const membersData = await prisma.guildMember.findMany({
      where: {
        guildId,
      },
      orderBy: {
        order: 'asc',
      },
    });
    const members: GuildMemberItem[] = [];
    for (const memberData of membersData) {
      const member = await this.format(memberData.id);
      members.push(member);
    }

    return members;
  }

  static async generate(props: {
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

        const existingGuildMember = await prisma.guildMember.findUnique({
          where: {
            discordId: fetchedMember.id,
          },
        });

        const data = {
          discordId: fetchedMember.id,
          guildId: props.guildId,
          name: fetchedMember.user.username,
          permissions: Number(fetchedMember.permissions),
          displayName: fetchedMember.displayName,
          avatarURL: fetchedMember.user.avatarURL(),
          joinedAt: fetchedMember.joinedAt,
        };
        let newGuildMemberData: GuildMember;
        if (existingGuildMember) {
          if (existingGuildMember.autoGenerate) {
            newGuildMemberData = await prisma.guildMember.update({
              where: {
                discordId: fetchedMember.id,
              },
              data: {
                ...data,
              },
            });
          }
          newGuildMemberData = existingGuildMember;
        } else {
          newGuildMemberData = await prisma.guildMember.create({
            data,
          });
        }

        // Upsert posts
        if (newGuildMemberData.autoGenerate) {
          const postIds = [];
          if (
            this.hasPermission(
              Number(newGuildMemberData.permissions),
              'MANAGE_GUILD'
            )
          ) {
            const postData = await prisma.guildPost.findFirst({
              where: {
                name: 'MANAGER',
              },
            });
            if (postData) {
              postIds.push(postData.id);
            }
          }
          await this.updatePosts(newGuildMemberData.id, postIds);
        }

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
            guildMemberId: newGuildMemberData.id,
            guildRoleId: guildRoleData.id,
          };
          await prisma.guildMemberRoleRelation.upsert({
            where: {
              guildMemberId_guildRoleId: {
                guildMemberId: newGuildMemberData.id,
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

  static hasPermission(
    permissions: number,
    permissionType: 'ADMINISTRATOR' | 'MANAGE_GUILD'
  ) {
    const permissionTypes = {
      ADMINISTRATOR: 0x8,
      MANAGE_GUILD: 0x20,
    };
    const permissionHex = permissionTypes[permissionType];
    return (
      // Check if the user has the MANAGE_GUILD permission by doing a bitwise AND
      (permissions & permissionHex) === permissionHex
    );
  }

  static async updatePosts(memberId: number, postIds: number[]) {
    // Delete all posts
    await prisma.guildMemberPostRelation.deleteMany({
      where: {
        guildMemberId: memberId,
      },
    });
    // Create new posts
    await Promise.all(
      postIds.map(async (postId) => {
        const post = await prisma.guildPost.findUnique({
          where: {
            id: postId,
          },
        });
        await prisma.guildMemberPostRelation.create({
          data: {
            guildMemberId: memberId,
            guildPostId: post!.id,
          },
        });
      })
    );
  }

  static async fetchManagementMembersFromBot(guildDiscordId: string) {
    const bot = await getBot();
    const fetchedGuilds = await bot.guilds.fetch();
    const fetchedGuild = await fetchedGuilds.get(guildDiscordId)?.fetch();
    if (!fetchedGuild) throw new Error(messages.botNotInstalled);

    const members = fetchedGuild.members.cache;
    const fetchedManagementMembers = members.filter((member) => {
      const fetchedMember = members.get(member.id);
      if (!fetchedMember) return false;
      return GuildMemberRepository.hasPermission(
        Number(fetchedMember.permissions),
        'MANAGE_GUILD'
      );
    });

    return fetchedManagementMembers;
  }

  static async toggleAutoGeneration(memberId: number, value: boolean) {
    await prisma.guildMember.update({
      where: {
        id: memberId,
      },
      data: {
        autoGenerate: value,
      },
    });
  }

  static async updateOrder(props: {
    guildId: number;
    params: {
      orders: {
        id: number;
        order: number;
      }[];
    };
  }) {
    if (props.params.orders && props.params.orders.length > 0) {
      await Promise.all(
        props.params.orders.map(async (order) => {
          await prisma.guildMember.update({
            where: {
              id: order.id,
            },
            data: {
              order: order.order,
            },
          });
        })
      );
    }
  }
}
