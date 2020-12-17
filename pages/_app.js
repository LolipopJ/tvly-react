import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css';
import 'fontsource-roboto/300-normal.css';
import 'fontsource-roboto/400-normal.css';
import 'fontsource-roboto/500-normal.css';
import 'fontsource-roboto/700-normal.css';


const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

// eslint-disable-next-line react/prop-types
function MyApp({Component, pageProps}) {
  console.log('Release version: ' + appVersion);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
      () =>
        createMuiTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            // primary: prefersDarkMode ? {} : {
            //   main: '#f50057',
            // },
          },
        }),
      [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
