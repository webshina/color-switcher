import { useGuild } from '@/hooks/repository/useGuild';
import { Progress } from '@chakra-ui/react';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';
import { Channels } from '../Channels';
import { Members } from '../Members';
import { TagCards } from '../TagCards';
import CircleImage from '../utils/CircleImage';
import { ExpandableText } from '../utils/ExpandableText';
import Title from '../utils/Title';

type Props = {
  guildId: number;
};
export const GuildHomePage: React.FC<Props> = (props) => {
  const { data: guild } = useGuild({ guildId: props.guildId });
  if (guild?.inProgress) {
    // Fetch guild data at fixed intervals
    setTimeout(() => {
      mutate('useGuild');
    }, 3000);
  }

  console.log(guild?.coverImageUrl);
  return (
    <>
      {guild && (
        <>
          {guild.inProgress ? (
            <div className="p-12">
              <div>Generating ...</div>
              <Progress
                hasStripe
                isAnimated
                min={0}
                max={guild.availableChannelCnt}
                value={guild.createdChannelCnt}
              />
            </div>
          ) : (
            <>
              {/* Cover Image */}
              <div className="relative h-60 w-full bg-gray-200">
                <Image
                  src={guild.coverImageUrl ?? '/images/no_image.jpeg'}
                  alt="cover"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-10 translate-y-1/2">
                  <CircleImage
                    imgSrc={guild.iconURL ?? '/images/no_image.jpeg'}
                    width="100px"
                    height="100px"
                  />
                </div>
              </div>
              <div className="h-20" />

              {/* Channel name */}
              <div className="text-2xl lg:text-5xl font-bold">{guild.name}</div>
              <div className="h-8" />

              {/* Tags */}
              {guild.tags && guild.tags.length > 0 && (
                <TagCards tagNames={guild.tags.map((tag) => tag.name)} />
              )}
              <div className="h-8" />

              {/* Description */}
              <div className="bg-slate-800 p-5 rounded-xl text-sm lg:text-base font-light whitespace-pre-wrap">
                <ExpandableText>{guild.description ?? ''}</ExpandableText>
              </div>
              <div className="h-16" />

              {/* Channel list */}
              <Title title={'Channels'} />
              <div className="h-8" />
              <Channels channels={guild.channels} />
              <div className="h-16" />

              {/* Member list */}
              <Title title={'Members'} />
              <div className="h-8" />
              <Members discordMembers={guild.members} />
              <div className="h-8" />

              <div className="h-16" />
            </>
          )}
        </>
      )}
    </>
  );
};
