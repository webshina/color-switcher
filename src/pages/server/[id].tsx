import DefaultLayout from '@/components/layout/default';
import { ServerHomePage } from '@/components/server/ServerHomePage';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <DefaultLayout>
      <ServerHomePage serverId={Number(router.query.id)} />
    </DefaultLayout>
  );
};

export default Home;
