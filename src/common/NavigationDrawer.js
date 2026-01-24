import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Img from "react-image";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";

import {
  Launch as LaunchIcon,
  ExpandMore,
  Add as AddIcon,
} from "@material-ui/icons";
import cards from "constants/cards";
import factions from "constants/factions";
import urls from "constants/urls";
import DataContext from "context/DataContext";
import { findFirstCardId } from "pages/Home/ListChip";

function NavDrawerLink({ selected, icon, avatar, text, handleClick }) {
  return (
    <ListItem button selected={selected} onClick={handleClick}>
      <ListItemIcon>{avatar ? avatar : icon}</ListItemIcon>
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
    userId,
    userLists,
    fetchUserLists,
    goToPage,
    setIsDrawerOpen,
    setIsNewList,
  } = useContext(DataContext);
  const listChips = {};
  Object.keys(factions).forEach((faction) => (listChips[faction] = []));
  if (userLists) {
    userLists.forEach((userList) => {
      if (userList.faction in listChips) {
        listChips[userList.faction].push(userList);
      }
    });
  }
  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);
  return (
    <SwipeableDrawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
    >
      <div style={{ width: "100%" }}>
        <List>
          <ListItem>
            <ListItemText primary="Legion HQ 2" secondary="Crit2Block" />
          </ListItem>
        </List>
        <List dense={true}>
          <NavDrawerLink
            text="Home"
            selected={pathname === "/"}
            icon={routes["/"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/");
            }}
          />
          <NavDrawerLink
            text="News"
            selected={pathname === "/news"}
            icon={routes["/news"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/news");
            }}
          />
          <NavDrawerLink
            text="Cards"
            selected={pathname === "/cards"}
            icon={routes["/cards"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/cards");
            }}
          />
        </List>
        <Divider />
        <List dense={true}>
          {Object.keys(factions).map((faction) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  dense={true}
                  min-height={48}
                >
                  <ListItemIcon>{routes[`/list/${faction}`].icon}</ListItemIcon>
                  <Typography component="span">
                    {faction[0].toUpperCase() + faction.slice(1)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ paddingRight: 0, paddingTop: 0 }}>
                  <List dense={true}>
                    <NavDrawerLink
                      text="New List"
                      selected={pathname === `/list/${faction}`}
                      icon={<AddIcon />}
                      handleClick={() => {
                        setIsDrawerOpen(false);
                        if (pathname === `/list/${faction}`) setIsNewList(true);
                        else goToPage(`/list/${faction}`);
                      }}
                    />
                    {listChips[`${faction}`].map((userList) => {
                      const card = cards[findFirstCardId(userList)];
                      return (
                        <NavDrawerLink
                          text={
                            userList.title.length > 64
                              ? `${userList.title}...`
                              : userList.title
                          }
                          selected={pathname === `/list/${userList.listId}`}
                          icon={undefined}
                          avatar={
                            card ? (
                              <Img
                                alt={card.cardName}
                                src={`${urls.cdn}/unitIcons/${card.imageName}`}
                                style={{
                                  marginLeft: 0,
                                  width: 44,
                                  height: 32,
                                  borderRadius: 20,
                                }}
                              />
                            ) : undefined
                          }
                          handleClick={() => {
                            setIsDrawerOpen(false);
                            goToPage(`/list/${userList.listId}`);
                          }}
                        />
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </List>
        <Divider />
        <List dense={true}>
          {/* <NavDrawerLink
            text="Roller"
            selected={pathname === "/roller"}
            icon={routes["/roller"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/roller");
            }}
          /> */}
          <NavDrawerLink
            text="Settings"
            selected={pathname === "/settings"}
            icon={routes["/settings"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/settings");
            }}
          />
          <NavDrawerLink
            text="Info"
            selected={pathname === "/info"}
            icon={routes["/info"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/info");
            }}
          />
        </List>
        <Divider />
        <List dense={true}>
          <ListItem
            button
            onClick={() =>
              window.open(
                " https://www.atomicmassgames.com/swlegiondocs/",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="AMG Legion Docs" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://legion.longshanks.org/",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Longshanks" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://legion.takras.net/",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Legion Helper" />
          </ListItem>
        </List>
        <Divider />
        <List dense={true}>
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://www.youtube.com/@crit2block",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Crit2Block YouTube" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://www.crit2block.com/blog",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Carolina Holocronicles" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://www.youtube.com/@kokozula",
                "_blank",
                "noopener noreferrer"
              )
            }
          >
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Kokozula YouTube" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
}

export default NavigationDrawer;
