import { useAuth } from '@/hooks/utils/useAuth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const loginAPI = async (discordCode: string) => {
    await login(discordCode as string);
    router.push('/owner/dashboard');
  };

  useEffect(() => {
    const code = router.query.code;
    if (code) {
      loginAPI(code as string);
    }
  }, [router.query.code]);

  return <></>;
};

export default Home;
