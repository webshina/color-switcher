import { AuthContext } from '@/components/provider/AuthProvider';
import { useContext } from 'react';

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return authCtx;
};
