import { AuthProvider } from '@/components/provider/AuthProvider';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import '../styles/globals.css';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '',
        color: '',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
