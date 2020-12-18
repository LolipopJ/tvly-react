import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css';
import 'fontsource-roboto/300-normal.css';
import 'fontsource-roboto/400-normal.css';
import 'fontsource-roboto/500-normal.css';
import 'fontsource-roboto/700-normal.css';

// const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
const defaultThemeType = 'light';
const defaultThemePrimary = '#e91e63';

// eslint-disable-next-line react/prop-types
function MyApp({Component, pageProps}) {
  // console.log('Release version: ' + appVersion);

  const [themePaletteType, setthemePaletteType] =
      React.useState(defaultThemeType);

  const [themePalettePrimary, setThemePalettePrimary] =
      React.useState(defaultThemePrimary);

  const [theme, setTheme] = React.useState(createMuiTheme({
    palette: {
      type: themePaletteType,
      primary: {
        main: themePalettePrimary,
      },
    },
  }));

  React.useEffect(() => { //
    const localStorageThemeType = localStorage.themeType ?
        localStorage.themeType : defaultThemeType;
    const localStoragePrimaryColor = localStorage.primaryColor ?
        localStorage.primaryColor : defaultThemePrimary;
    setthemePaletteType(localStorageThemeType);
    setThemePalettePrimary(localStoragePrimaryColor);
    setTheme(createMuiTheme({
      palette: {
        type: localStorageThemeType,
        primary: {
          main: localStoragePrimaryColor,
        },
      },
    }));
  }, []);

  React.useEffect(() => { // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  function handleThemePaletteType() { // 切换主题深浅
    const nowThemeType = theme.palette.type == 'light' ? 'dark' : 'light';
    setTheme(createMuiTheme({
      palette: {
        type: nowThemeType,
        primary: {
          main: themePalettePrimary,
        },
      },
    }));
    setthemePaletteType(nowThemeType);
    localStorage.themeType = nowThemeType;
  }

  function handleThemePalettePrimary(selectColor) { // 切换主题色
    setTheme(createMuiTheme({
      palette: {
        type: themePaletteType,
        primary: {
          main: selectColor,
        },
      },
    }));
    setThemePalettePrimary(selectColor);
    localStorage.primaryColor = selectColor;
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component
          switchThemePaletteType={handleThemePaletteType}
          selectThemePalettePrimary={handleThemePalettePrimary}
          {...pageProps}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
