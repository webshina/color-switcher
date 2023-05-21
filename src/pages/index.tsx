import { CategoryCards } from '@/components/CategoryCards';
import { Channels } from '@/components/Channels';
import { FeaturedChannels } from '@/components/FeaturedChannels';
import { Members } from '@/components/Members';
import DefaultLayout from '@/components/layout/default';
import CircleImage from '@/components/utils/CircleImage';
import Title from '@/components/utils/Title';
import { useServer } from '@/hooks/repository/useServer';
import type { NextPage } from 'next';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const server = useServer({ serverId: '1' });

  return (
    <DefaultLayout>
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
      <div className="text-5xl font-bold">{server.name}</div>
      <div className="h-8" />
      <CategoryCards />
      <div className="h-16" />

      {/* Featured channels */}
      <Title title={'Featured Channels'} subtitle={'注目チャンネル'} />
      <div className="h-8" />
      <FeaturedChannels />
      <div className="h-16" />

      {/* Channel list */}
      <Title title={'Channels'} subtitle={'チャンネル一覧'} />
      <div className="h-8" />
      <Channels />
      <div className="h-16" />

      {/* Member list */}
      <Title title={'Members'} subtitle={'メンバー一覧'} />
      <div className="h-8" />
      <Members discordMembers={server.members} />
      <div className="h-8" />

      <div className="h-16" />
    </DefaultLayout>
  );
};

export default Home;
