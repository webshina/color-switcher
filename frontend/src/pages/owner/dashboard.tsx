import DefaultLayout from '@/components/layout/default';
import RoundedImage from '@/components/utils/RoundedImage';
import Title from '@/components/utils/Title';
import { useMyGuilds } from '@/hooks/repository/useMyGuilds';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { BsHouseAddFill } from 'react-icons/bs';

const Home: NextPage = () => {
  const router = useRouter();
  const { data: guilds } = useMyGuilds();
  return (
    <DefaultLayout>
      <button
        className="flex items-center px-4 py-2 gradient-bg-purple-to-pink rounded-xl"
        onClick={() => {
          router.push('/guild/create');
        }}
      >
        <BsHouseAddFill />
        <div className="w-2" />
        Create Discord HOME
      </button>
      <div className="h-24" />

      <Title title="Your Servers" />
      <div className="h-8" />
      <div className="flex flex-wrap">
        {guilds?.map((guild) => (
          <button
            key={guild.id}
            className="flex flex-col items-center m-2"
            onClick={() => {
              router.push(`/guild/${guild.id}`);
            }}
          >
            <RoundedImage
              imgSrc={guild.iconURL ?? '/images/no_image.jpeg'}
              height={200}
              width={200}
            />
            <div>{guild.name}</div>
          </button>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Home;
