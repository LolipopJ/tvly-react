import React from 'react';
import Head from 'next/head';
import AppBar from '../components/app_bar';

export default function Home() {
  const appNameShort = process.env.NEXT_PUBLIC_APP_NAME_SHORT;

  return (
    <div>
      <Head>
        <title>{appNameShort}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
    </div>
  );
}
