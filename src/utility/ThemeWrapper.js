import React from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import themes from 'constants/themes';

function ThemeWrapper({ children, themeColor }) {
  const theme = responsiveFontSizes(createTheme({
    typography: { useNextVariants: true },
    palette: themes.palettes[themeColor],
    MuiRadio: {
      root: {
        color: 'green',
      },
      colorSecondary: {
        '&$checked': {
          color: 'green',
        },
      },
    }
  }));
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeWrapper;
