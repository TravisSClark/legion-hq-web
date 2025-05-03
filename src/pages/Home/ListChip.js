import React from 'react';
import { Chip, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import DataContext from 'context/DataContext';
import urls from 'constants/urls';
import factions from 'constants/factions';
import cards from 'constants/cards';

export function findFirstCardId (list) {
  for (let i = 0; i < list.units.length; i++) {
    const card = cards[list.units[i].unitId];
    if (card) return card.id;
  }
  return undefined;
}

function ListChip({ userList, deleteUserList }) {
  const { goToPage } = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState();
  const handleOpenDeleteMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseDeleteMenu = () => setAnchorEl(null);
  if (userList.faction in factions) {
    const factionTheme = createTheme (adaptV4Theme({
      palette: {
        primary: { main: factions[userList.faction].primaryColor },
        secondary: { main: factions[userList.faction].secondaryColor }
      }
    }));
    const card = cards[findFirstCardId(userList)];
    return (
      <React.Fragment>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={factionTheme}>
            <Badge max={10000} color="secondary">
              <Chip
                clickable
                color="primary"
                style={{ margin: '0 5 5 0' }}
                avatar={card ? (
                  <img
                    alt={card.cardName}
                    src={`${urls.cdn}/unitIcons/${card.imageName}`}
                    style={{
                      marginLeft: 0,
                      width: 44,
                      height: 32,
                      borderRadius: 20
                    }}
                  />
                ) : undefined}
                label={(
                  <Typography variant="subtitle1">
                    {userList.title.length > 64 ? `${userList.title}...` : userList.title}
                  </Typography>
                )}
                onClick={() => goToPage(`/list/${userList.listId}`)}
                onDelete={handleOpenDeleteMenu}
              />
            </Badge>
          </ThemeProvider>
        </StyledEngineProvider>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDeleteMenu}
        >
          <Typography variant="caption" style={{ padding: '0 16px' }}>
            Delete {userList.title}?
          </Typography>
          <MenuItem
            onClick={() => {
              handleCloseDeleteMenu();
              deleteUserList(userList.listId);
            }}
          >
            Yes
          </MenuItem>
          <MenuItem onClick={handleCloseDeleteMenu}>
            No
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  } else return <div />;
};

export default ListChip;