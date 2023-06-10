import { UserItem } from '#/types/User';
import { useMe } from '@/hooks/repository/useMe';
import { useCheckAuthPath } from '@/hooks/useCheckAuthPath';
import { post } from '@/utils/apiHelper';
import { ReactNode, createContext } from 'react';
import { mutate } from 'swr';

export type AuthContextProps = {
  user?: UserItem;
  loadingUser: boolean;
  login: (discordCode: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  loadingUser: true,
  login: async () => {},
  logout: async () => {},
});

type Props = {
  children: ReactNode;
};
const AuthProvider: React.FC<Props> = ({ children }) => {
  const { data: user, isValidating: loadingUser } = useMe();

  const login = async (discordCode: string) => {
    await post('/api/auth/discord', { code: discordCode });
    mutate('useMe');
  };

  const logout = async () => {
    await post('/api/auth/logout');
    mutate('useMe');
  };

  // Check auth for route path
  useCheckAuthPath(loadingUser, user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };