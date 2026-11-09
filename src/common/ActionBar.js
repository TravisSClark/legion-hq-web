import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import DataContext from "context/DataContext";
import lhqLogoLight from "assets/lhqLogoLight.svg";
import lhqLogoDark from "assets/lhqLogoDark.svg";

function DefaultBar() {
  const { userSettings, setIsDrawerOpen } = useContext(DataContext);
  return (
    <Toolbar variant="dense">
      <IconButton
        color="inherit"
        edge="start"
        sx={{ marginRight: 16 }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <NavLink to="/">
        <img
          alt="Legion HQ 2 Logo"
          src={userSettings.themeColor === "light" ? lhqLogoLight : lhqLogoDark}
          style={{ height: 35 }}
        />
      </NavLink>
      <div sx={{ flexGrow: 1 }} />
      <NavLink to="/settings">
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </NavLink>
      {/* {false && (
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
      )} */}
    </Toolbar>
  );
}

function ActionBar(props) {
  return (
    <div sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <DefaultBar />
      </AppBar>
      <div style={{ height: 55 }} />
    </div>
  );
}

export default ActionBar;
