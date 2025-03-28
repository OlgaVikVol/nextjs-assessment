import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        {/* Google Font: Noto Sans KR */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Yandex Metrika Preconnect (optional, keep only if needed) */}
        <link rel="preconnect" href="https://mc.yandex.ru" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
