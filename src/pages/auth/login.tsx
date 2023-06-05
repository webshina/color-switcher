import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  const redirect = () => {
    router.push(
      'https://discord.com/api/oauth2/authorize?client_id=1110729993228652574&redirect_uri=http%3A%2F%2Flocalhost%3A3004%2Fauth%2Fcallback&response_type=code&scope=identify'
    );
  };
  return (
    <DefaultLayout
      showLogo={false}
      bgClassName="bg-gradient-to-b from-[#1F215A] from-5% to-dark to-40%"
    >
      <button onClick={redirect}>Discord 認証</button>
    </DefaultLayout>
  );
};

export default Home;
