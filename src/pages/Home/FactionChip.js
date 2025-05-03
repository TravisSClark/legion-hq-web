import React, { useContext } from 'react';
import { Chip, Typography } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import DataContext from 'context/DataContext';
import factions from 'constants/factions';

function FactionChip({ faction }) {
  const { goToPage } = useContext(DataContext);
  const factionTheme = createTheme (adaptV4Theme({
    palette: {
      primary: { main: factions[faction].primaryColor },
      secondary: { main: factions[faction].secondaryColor }
    }
  }));
  return (
    <StyledEngineProvider injectFirst>
      (<ThemeProvider theme={factionTheme}>
        <Chip
          clickable
          color="primary"
          icon={<AddIcon fontSize="small" />}
          label={(
            <Typography variant="subtitle1">
              {`${factions[faction].singular}`}
            </Typography>
          )}
          onClick={() => goToPage(`/list/${faction}`)}
        />
      </ThemeProvider>)
    </StyledEngineProvider>
  );
};

export default FactionChip;
