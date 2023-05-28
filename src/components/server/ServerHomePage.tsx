import { CategoryCards } from '@/components/CategoryCards';
import { Channels } from '@/components/Channels';
import { FeaturedChannels } from '@/components/FeaturedChannels';
import { Members } from '@/components/Members';
import CircleImage from '@/components/utils/CircleImage';
import Title from '@/components/utils/Title';
import { useServer } from '@/hooks/repository/useServer';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';

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

          {/* Description */}
          <div className="text-sm lg:text-md font-light">
            {server.description}
          </div>
          <div className="h-8" />

          {/* Categories */}
          <CategoryCards categories={server.categories} />
          <div className="h-16" />

          {/* Featured channels */}
          <Title title={'Featured Channels'} />
          <div className="h-8" />
          <FeaturedChannels channels={server.featuredChannels} />
          <div className="h-16" />

          {/* Channel list */}
          <Title title={'Channels'} />
          <div className="h-8" />
          <Channels categories={server.categories} />
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
