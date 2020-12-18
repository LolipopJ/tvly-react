import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useRouter} from 'next/router';

import App from '../../components/app';

const appNameShort = process.env.NEXT_PUBLIC_APP_NAME_SHORT;

const Post = (props) => {
  const Router = useRouter();
  const {filter} = Router.query;

  return (
    <div>
      <Head>
        <title>{appNameShort + ' | ' + filter}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App
        filter={filter}
        switchThemePaletteType={props.switchThemePaletteType}
        selectThemePalettePrimary={props.selectThemePalettePrimary}
      />
    </div>
  );
};

Post.propTypes = {
  switchThemePaletteType: PropTypes.func,
  selectThemePalettePrimary: PropTypes.func,
};

export default Post;
