import { Page } from '@/components/guild/GuildHomePageSwitch';
import { GuildTop } from '@/components/guild/GuildTop';
import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  const page = router.query.page as Page;

  return (
    <DefaultLayout>
      {router.query.id && (
        <GuildTop page={page ?? 'home'} guildId={Number(router.query.id)} />
      )}
    </DefaultLayout>
  );
};

export default Home;
