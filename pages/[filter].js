import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useRouter} from 'next/router';

import App from '../components/app';

import channelFilters from '../assets/channelFilter';

const appNameShort = process.env.NEXT_PUBLIC_APP_NAME_SHORT;

const Filter = (props) => {
  const Router = useRouter();
  const {filter} = Router.query;

  // 当前路由不在 ../assets/channelFilter 中时，跳转到全部频道过滤
  let channelFilterFound = false;
  for (const channelFilter of channelFilters) {
    if (channelFilter.filter === filter) {
      channelFilterFound = true;
      break;
    }
  }
  if (!channelFilterFound) {
    const isClient = typeof document !== 'undefined';
    isClient && Router.replace('/全部频道');
    return null;
  }

  return (
    <div>
      <Head>
        <title>{appNameShort + ' | ' + filter}</title>
      </Head>
      <App
        filter={filter}
        switchThemePaletteType={props.switchThemePaletteType}
        selectThemePalettePrimary={props.selectThemePalettePrimary}
      />
    </div>
  );
};

Filter.propTypes = {
  switchThemePaletteType: PropTypes.func.isRequired,
  selectThemePalettePrimary: PropTypes.func.isRequired,
};

export default Filter;
