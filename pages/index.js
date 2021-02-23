import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import App from '../components/app';

const appNameShort = process.env.NEXT_PUBLIC_APP_NAME_SHORT;

const Index = (props) => {
  return (
    <div>
      <Head>
        <title>{appNameShort}</title>
      </Head>
      <App
        switchThemePaletteType={props.switchThemePaletteType}
        selectThemePalettePrimary={props.selectThemePalettePrimary}
      />
    </div>
  );
};

Index.propTypes = {
  switchThemePaletteType: PropTypes.func.isRequired,
  selectThemePalettePrimary: PropTypes.func.isRequired,
};

export default Index;
