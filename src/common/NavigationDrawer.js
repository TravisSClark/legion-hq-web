import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import DataContext from 'context/DataContext';
import { Launch as LaunchIcon } from '@material-ui/icons';

function NavDrawerLink({ selected, icon, text, handleClick }) {
  return (
    <ListItem button selected={selected} onClick={handleClick}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

function NavigationDrawer() {
  const location = useLocation();
  const { pathname } = location;
  const {
    isDrawerOpen,
    routes,
    faction,
    goToPage,
    setIsDrawerOpen
  } = useContext(DataContext);
  return (
    <SwipeableDrawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
    >
      <div style={{ width: 250 }}>
        <List>
          <ListItem>
            <ListItemText primary="Legion HQ 2" secondary="Crit2Block" />
          </ListItem>
        </List>
        <List dense={true}>
          <NavDrawerLink
            text="Home"
            selected={pathname === '/'}
            icon={routes['/'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/');
            }}
          />
          <NavDrawerLink
            text="News"
            selected={pathname === '/news'}
            icon={routes['/news'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/news');
            }}
          />
          <NavDrawerLink
            text="Cards"
            selected={pathname === '/cards'}
            icon={routes['/cards'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/cards');
            }}
          />
        </List>
        <Divider />
        <List dense={true}>
          <NavDrawerLink
            text="Rebels"
            selected={pathname === '/list/rebels' || faction === 'rebels'}
            icon={routes['/list/rebels'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/list/rebels');
            }}
          />
          <NavDrawerLink
            text="Empire"
            selected={pathname === '/list/empire' || faction === 'empire'}
            icon={routes['/list/empire'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/list/empire');
            }}
          />
          <NavDrawerLink
            text="Republic"
            selected={pathname === '/list/republic' || faction === 'republic'}
            icon={routes['/list/republic'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/list/republic');
            }}
          />
          <NavDrawerLink
            text="Separatists"
            selected={pathname === '/list/separatists' || faction === 'separatists'}
            icon={routes['/list/separatists'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/list/separatists');
            }}
          />
          <NavDrawerLink
            text="Shadow Collective"
            selected={pathname === '/list/mercenary' || faction === 'mercenary'}
            icon={routes['/list/mercenary'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/list/mercenary');
            }}
          />
        </List>
        <Divider />
        <List dense={true}>
          <NavDrawerLink
            text="Roller"
            selected={pathname === '/roller'}
            icon={routes['/roller'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/roller');
            }}
          />
          <NavDrawerLink
            text="Settings"
            selected={pathname === '/settings'}
            icon={routes['/settings'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/settings');
            }}
          />
          <NavDrawerLink
            text="Info"
            selected={pathname === '/info'}
            icon={routes['/info'].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage('/info');
            }}
          />
        </List>
        <Divider />
        <List dense={true}>
          <ListItem button onClick={() => window.open(" https://www.atomicmassgames.com/swlegiondocs/", "_blank", "noopener noreferrer")}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="AMG Legion Docs" />
          </ListItem>
          <ListItem button onClick={() => window.open("https://legion.longshanks.org/", "_blank", "noopener noreferrer")}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Longshanks" />
          </ListItem>
          <ListItem button onClick={() => window.open("https://legionquickguide.com/", "_blank", "noopener noreferrer")}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Legion Quick Guide" />
          </ListItem>
        </List>
        <Divider />
        <List dense={true}>
          <ListItem button onClick={() => window.open("https://www.youtube.com/@crit2block", "_blank", "noopener noreferrer")}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Crit2Block YouTube" />
          </ListItem>
          <ListItem button onClick={() => window.open("https://www.crit2block.com/blog", "_blank", "noopener noreferrer")}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Carolina Holocronicles" />
          </ListItem>
          <ListItem button onClick={() => window.open("https://www.youtube.com/@kokozula", "_blank", "noopener noreferrer")}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Kokozula YouTube" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
