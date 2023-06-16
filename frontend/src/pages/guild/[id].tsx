import { GuildHomePage } from '@/components/guild/GuildHomePage';
import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      {router.query.id && <GuildHomePage guildId={Number(router.query.id)} />}
    </DefaultLayout>
  );
};

export default Home;
