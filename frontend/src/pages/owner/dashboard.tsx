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

        <button
          className="m-3 p-1 h-[200px] w-[200px] gradient-bg-purple-to-pink rounded-xl"
          onClick={() => {
            router.push('/guild/create');
          }}
        >
          <div className="flex flex-col justify-center items-center w-full h-full bg-slate-800 rounded-xl">
            <BsHouseAddFill size={50} />
            <div className="h-4" />
            <div className="font-bold">
              Create
              <br />
              Discord HOME
            </div>
          </div>
        </button>
        <div className="h-24" />
      </div>
    </DefaultLayout>
  );
};

export default Home;
