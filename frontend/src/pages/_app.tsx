import { Meta } from '@/components/common/Meta';
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
          <Meta
            title="Discord Home AI"
            description="Generate your Discord home page in ONE click !"
            image="https://www.favo-community.com/images/thumbnail.png"
            url="https://www.favo-community.com"
          />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
