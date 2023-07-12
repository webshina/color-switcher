import { CreateHomePage } from '@/components/guild/homePage/CreateHomePage';
import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  const guildDiscordId = router.query.guildDiscordId || undefined;

  return (
    <DefaultLayout>
      <CreateHomePage guildDiscordId={guildDiscordId as string} />
    </DefaultLayout>
  );
};

export default Home;
