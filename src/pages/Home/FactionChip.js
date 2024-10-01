import React, { useContext } from 'react';
import { Chip, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme  } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import DataContext from 'context/DataContext';
import factions from 'constants/factions';

function FactionChip({ faction }) {
  const { goToPage } = useContext(DataContext);
  const factionTheme = createTheme ({
    palette: {
      primary: { main: factions[faction].primaryColor },
      secondary: { main: factions[faction].secondaryColor }
    }
  });
  return (
    <ThemeProvider theme={factionTheme}>
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
    </ThemeProvider>
  );
};

export default FactionChip;
