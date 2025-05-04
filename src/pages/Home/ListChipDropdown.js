import React from 'react';
import { styled } from '@mui/material/styles';
import { Popover, Chip, Typography } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles';

import factions from 'constants/factions';

const PREFIX = 'ListChipDropdown';

const classes = {
  paper: `${PREFIX}-paper`
};

const StyledStyledEngineProvider = styled(StyledEngineProvider)((
  {
    theme
  }
) => ({
  [`& .${classes.paper}`]: {
    // padding: theme.spacing(1),
    background: '#1F2125'
  }
}));

function ListChipDropdown({ chips, faction }) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = event => setAnchorEl(event.currentTarget);

  const factionTheme = createTheme(adaptV4Theme({
    palette: {
      primary: { main: factions[faction].primaryColor },
      secondary: { main: factions[faction].secondaryColor }
    }
  }));

  return (
    <StyledStyledEngineProvider injectFirst>(<ThemeProvider theme={factionTheme}>
          <Chip
            clickable
            color="primary"
            style={{ margin: '0 5 5 0' }}
            label={
              <Typography variant="subtitle1">
                {`${chips.length} lists`}
              </Typography>
            }
            onClick={handleClick}
          />
          <Popover
            id={`${faction} list menu`}
            classes={classes}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {chips.map((chip, i) => (
              <div key={`${faction}_list_${i}`} style={{ margin: 6 }}>
                {chip}
              </div>
            ))}
          </Popover>
        </ThemeProvider>)
          </StyledStyledEngineProvider>
  );
}

export default ListChipDropdown;
