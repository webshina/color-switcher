import { ChannelItem } from '#/common/types/Channel';
import { GuildItem } from '#/common/types/Guild';
import { ActivityLevel } from '@/components/common/ActiveLevel';
import { JumpChannelBtn } from '@/components/common/JumpChannelBtn';

type Props = {
  guild: GuildItem;
  channel: ChannelItem;
};
export const LightChannelCard: React.FC<Props> = (props) => {
  return (
    <>
      <div
        key={props.channel.id}
        className="flex flex-col justify-between relative m-1 p-3 h-[200px] w-[170px] bg-slate-700 rounded-xl text-xl"
      >
        <div>
          <div className="text-sm font-bold">{props.channel.name}</div>
          <div className="h-3" />
          {props.channel.topic && (
            <>
              <div className="h-[40px] overflow-auto text-xs">
                {props.channel.topic}
              </div>
              <div className="h-3" />
            </>
          )}
          <ActivityLevel level={props.channel.activityScore!} />
          <div className="h-3" />
        </div>
        <div className="flex justify-end">
          <JumpChannelBtn
            guildDiscordId={props.guild.discordId}
            channelDiscordId={props.channel.discordId}
          />
        </div>
      </div>
    </>
  );
};
