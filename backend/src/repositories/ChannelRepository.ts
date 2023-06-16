import { ChannelItem } from '#/common/types/Channel';
import { prisma } from '@/lib/prisma';
import { getImageUrl } from '@/utils/fileHelper';
import { Channel } from '@prisma/client';

export class ChannelRepository {
  static format(channel: Channel) {
    const channelItem: ChannelItem = {
      id: channel.id,
      discordId: channel.discordId,
      name: channel.name,
      topic: channel.topic,
      guildId: channel.guildId,
      imageURL: channel.image && getImageUrl('channelImages', channel.image),
      activityScore: channel.activityScore,
      messagesPerDay: channel.messagesPerDay,
    };

    return channelItem;
  }

  static async getById(id: number) {
    const channel = await prisma.channel.findUnique({
      where: {
        id: id,
      },
    });
    if (!channel) throw new Error('Channel not found');
    return this.format(channel);
  }

  static async getByGuildId(guildId: number) {
    const channels = await prisma.channel.findMany({
      where: {
        guildId: guildId,
      },
    });
    if (!channels) throw new Error('Channel not found');

    return channels.map((channel) => this.format(channel));
  }
}
