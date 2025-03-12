import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Head>
          <title>Volunteer Platform</title>
          <meta name="description" content="Volunteer management platform" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <style jsx global>{`
          #__next-build-watcher {
            display: none;
          }
        `}</style>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
