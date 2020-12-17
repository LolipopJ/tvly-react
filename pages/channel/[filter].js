import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import App from '../../components/app';

const appNameShort = process.env.NEXT_PUBLIC_APP_NAME_SHORT;

const Post = () => {
  const router = useRouter();
  const {filter} = router.query;

  return (
    <div>
      <Head>
        <title>{appNameShort + ' | ' + filter}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App filter={filter} />
    </div>
  );
};

export default Post;
