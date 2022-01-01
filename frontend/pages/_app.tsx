import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tolfix | Contribution</title>
        <meta name="description" content="Tolfix contribution program, information found here. Tolfix" />
        <link rel="icon" href="https://cdn.tolfix.com/images/TX-Small.png" />
        <meta name='theme-color' content='#E1E5F0' />
        <meta property="og:image" content="https://cdn.tolfix.com/images/Tolfix.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
  // return <Component {...pageProps} />
}

export default MyApp
