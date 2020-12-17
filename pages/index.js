import React from 'react';
import Head from 'next/head';
import App from '../components/app';

const appNameShort = process.env.NEXT_PUBLIC_APP_NAME_SHORT;

export default function Home() {
  return (
    <div>
      <Head>
        <title>{appNameShort}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
}
