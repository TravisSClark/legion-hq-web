import React from 'react';
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes, adaptV4Theme } from '@mui/material/styles';
import themes from 'constants/themes';

function ThemeWrapper({ children, themeColor }) {
  const theme = responsiveFontSizes(createTheme(adaptV4Theme({
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
  })));
  return (
    <StyledEngineProvider injectFirst>
      (<MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>)
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
