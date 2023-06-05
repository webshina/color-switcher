import { useCheckAuthPath } from '@/hooks/useCheckAuthPath';
import { DiscordAuthResponse } from '@/pages/api/auth/discord';
import { post } from '@/utils/apiHelper';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { UserItem } from 'types/User';

export type AuthContextProps = {
  user?: UserItem;
  loadingUser: boolean;
  setLoadingUser: Dispatch<SetStateAction<boolean>>;
  login: (discordCode: string) => Promise<void>;
};
const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  loadingUser: true,
  setLoadingUser: () => {},
  login: async () => {},
});

type Props = {
  children: ReactNode;
};
const AuthProvider: React.FC<Props> = ({ children }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<UserItem>();

  const login = async (discordCode: string) => {
    const res = await post('/api/auth/discord', { code: discordCode });
    const userData = res.data as DiscordAuthResponse;
    setUser(userData);
  };

  // Check auth for route path
  useCheckAuthPath(loadingUser, user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        setLoadingUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
