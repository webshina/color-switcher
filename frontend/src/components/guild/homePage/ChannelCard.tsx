import { ChannelItem } from '#/common/types/Channel';
import { GuildItem } from '#/common/types/Guild';
import { ActivityLevel } from '@/components/common/ActiveLevel';
import { JumpChannelBtn } from '@/components/common/JumpChannelBtn';
import ImageCard from '@/components/utils/ImageCard';
import { ConversationSummaries } from './ConversationSummaries';

type Props = {
  guild: GuildItem;
  channel: ChannelItem;
};
export const ChannelCard: React.FC<Props> = (props) => {
  return (
    <>
      <div key={props.channel.id} className="m-1">
        <ImageCard
          imgSrc={props.channel.imageURL!}
          title={props.channel.name}
          subTitle={props.channel.topic}
          width={350}
        >
          <div className="mx-1 my-3">
            {/* Active level */}
            <ActivityLevel level={props.channel.activityScore!} />
            <div className="h-5" />
            {/* Conversation Summary */}
            {props.channel.showConversationSummary && (
              <>
                <div className="text-sm font-semibold">AI Summary</div>
                <div className="h-3" />
                <ConversationSummaries summaries={props.channel.summaries} />
                <div className="h-5" />
              </>
            )}
            {/* Go to channel */}
            <div className="flex justify-end">
              <JumpChannelBtn
                guildDiscordId={props.guild.discordId}
                channelDiscordId={props.channel.discordId}
              />
            </div>
            <div className="h-3" />
          </div>
        </ImageCard>
      </div>
    </>
  );
};
