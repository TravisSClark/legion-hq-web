import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase
} from '@mui/material';
import { useTheme } from '@mui/styles';
import {alpha} from '@mui/material/styles';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import DataContext from 'context/DataContext';
import lhqLogoLight from 'assets/lhqLogoLight.svg';
import lhqLogoDark from 'assets/lhqLogoDark.svg';

const PREFIX = 'ActionBar';

const classes = {
  grow: `${PREFIX}-grow`,
  menuButton: `${PREFIX}-menuButton`,
  search: `${PREFIX}-search`,
  searchIcon: `${PREFIX}-searchIcon`,
  inputRoot: `${PREFIX}-inputRoot`,
  inputInput: `${PREFIX}-inputInput`,
  desktopOnly: `${PREFIX}-desktopOnly`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.grow}`]: { flexGrow: 1 },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.search}`]: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  [`& .${classes.searchIcon}`]: {
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  [`& .${classes.inputRoot}`]: {
    color: 'inherit',
    width: '100%'
  },

  [`& .${classes.inputInput}`]: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },

  [`& .${classes.desktopOnly}`]: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    }
  }
}));

function DefaultBar() {
  const theme = useTheme();

  const { userSettings, setIsDrawerOpen } = useContext(DataContext);
  return (
    <Toolbar variant="dense">
      <IconButton
        color="inherit"
        edge="start"
        className={classes.menuButton}
        onClick={() => setIsDrawerOpen(true)}
        size="large">
        <MenuIcon />
      </IconButton>
      <img
        alt="Legion HQ 2 Logo"
        src={userSettings.themeColor === 'light' ? lhqLogoLight : lhqLogoDark}
        style={{ height: 35 }}
      />
      <Root className={classes.grow} />
      {false && (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
      )}
    </Toolbar>
  );
}

function ActionBar(props) {

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="secondary">
        <DefaultBar />
      </AppBar>
      <div style={{ height: 55 }} />
    </div>
  );
}

export default ActionBar;
