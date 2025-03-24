import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';

function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>MyTopCourse</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ru_RU" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
