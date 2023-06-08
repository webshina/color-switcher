import { TagCards } from '@/components/CategoryCards';
import { Channels } from '@/components/Channels';
import { Members } from '@/components/Members';
import CircleImage from '@/components/utils/CircleImage';
import Title from '@/components/utils/Title';
import { useServer } from '@/hooks/repository/useServer';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { ExpandableText } from '../utils/ExpandableText';

type Props = {
  serverId: number;
};
export const ServerHomePage: React.FC<Props> = (props) => {
  const server = useServer({ serverId: props.serverId });

  return (
    <>
      {server && (
        <>
          {/* Cover Image */}
          <div className="relative h-60 w-full bg-gray-200">
            <Image
              src={server.coverImgURL}
              alt="cover"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-10 translate-y-1/2">
              <CircleImage
                imgSrc={server.iconImgURL}
                width="100px"
                height="100px"
              />
            </div>
          </div>
          <div className="h-20" />

          {/* Channel name */}
          <div className="text-2xl lg:text-5xl font-bold">{server.name}</div>
          <div className="h-8" />

          {/* Categories */}
          <TagCards tags={server.tags} />
          <div className="h-8" />

          {/* Description */}
          <div className="bg-slate-800 p-5 rounded-xl text-sm lg:text-base font-light whitespace-pre-wrap">
            <ExpandableText>{server.description}</ExpandableText>
          </div>
          <div className="h-16" />

          {/* Channel list */}
          <Title title={'Channels'} />
          <div className="h-8" />
          <Channels channels={server.channels} />
          <div className="h-16" />

          {/* Member list */}
          <Title title={'Members'} />
          <div className="h-8" />
          <Members discordMembers={server.members} />
          <div className="h-8" />

          <div className="h-16" />
        </>
      )}
    </>
  );
};
