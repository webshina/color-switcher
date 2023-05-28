import { ActivityLevel } from '@/components/common/ActiveLevel';
import { JumpChannelBtn } from '@/components/common/JumpChannelBtn';
import ImageCard from '@/components/utils/ImageCard';

type Props = {
  channels: any[];
};
export const FeaturedChannels: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {props.channels.map((channel) => {
        return (
          <div key={channel.id} className="m-1">
            <ImageCard
              imgSrc={channel.imageUrl}
              title={channel.name}
              width={350}
            >
              <div className="mx-1 my-3">
                {/* Description */}
                <div className="h-3" />
                <div className="h-16 text-base">{channel.description}</div>
                <div className="h-3" />

                {/* Active level */}
                <ActivityLevel level={channel.activityLevel} />
                <div className="h-5" />

                {/* Conversation Summary */}
                <div className="text-sm font-semibold">
                  Conversation Summary
                </div>
                <div className="h-3" />
                <div className="p-4 h-48 overflow-auto rounded-md bg-slate-800">
                  {channel.conversationSummaries.map(
                    (summary: string, index: number) => {
                      return (
                        <div key={index}>
                          <li
                            key={index}
                            className="p-3 rounded-md bg-white/10 text-sm lg: text-base"
                          >
                            {summary}
                          </li>
                          <div className="h-1" />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="h-5" />

                {/* Go to channel */}
                <div className="flex justify-end">
                  <JumpChannelBtn inviteCode={channel.inviteCode} />
                </div>

                <div className="h-3" />
              </div>
            </ImageCard>
          </div>
        );
      })}
    </div>
  );
};
