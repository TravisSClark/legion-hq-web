import React, { useContext } from "react";
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

import { ExpandMore, Add as AddIcon } from "@material-ui/icons";
import cards from "constants/cards";
import factions from "constants/factions";
import urls from "constants/urls";
import DataContext from "context/DataContext";
import { findFirstCardId } from "pages/Home/ListChip";
import crit2block from "assets/crit2block.png";
import patreon from "assets/PATREON_SYMBOL_1_BLACK_RGB.png";

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
    userLists,
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
  return (
    <SwipeableDrawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
    >
      <div style={{ width: "100%" }}>
        <ListItem
          button
          onClick={() =>
            window.open(
              "https://www.youtube.com/@crit2block",
              "_blank",
              "noopener noreferrer",
            )
          }
        >
          <ListItemIcon>
            <img
              alt="Crit2Block Logo"
              src={crit2block}
              style={{ width: 48, height: 48 }}
            />
          </ListItemIcon>
        </ListItem>
        <Divider />
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
            text="Lookup"
            selected={pathname === "/cards"}
            icon={routes["/cards"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/cards");
            }}
          />
          <NavDrawerLink
            text="Resources"
            selected={pathname === "/resources"}
            icon={routes["/resources"].icon}
            handleClick={() => {
              setIsDrawerOpen(false);
              goToPage("/resources");
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
                            userList.title.length > 32
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
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://www.buymeacoffee.com/legionhq",
                "_blank",
                "noopener noreferrer",
              )
            }
          >
            <ListItemIcon>
              <img
                alt="Buy Me a Coffee"
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary="Buy Me a Coffee" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              window.open(
                "https://patreon.com/LegionHQ2?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
                "_blank",
                "noopener noreferrer",
              )
            }
          >
            <ListItemIcon>
              <img
                alt="Patreon"
                src={patreon}
                style={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary="Patreon" />
          </ListItem>
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
      </div>
    </SwipeableDrawer>
  );
}

export default NavigationDrawer;
