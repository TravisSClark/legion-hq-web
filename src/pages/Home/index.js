import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { ErrorBoundary } from "react-error-boundary";
import {
  Grid,
  Typography,
  Container,
  Fade,
  Button,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Announcement as NewsIcon,
  ExpandMore as ExpandMoreIcon,
  Event as ReleaseIcon,
  SupervisorAccount as TorunamentsIcon,
} from "@material-ui/icons";
import LoginButton from "./LoginButton";
import ListChip from "./ListChip";
import FactionChip from "./FactionChip";
import ListChipDropdown from "./ListChipDropdown";
import DataContext from "context/DataContext";
import ErrorFallback from "common/ErrorFallback";
import factions from "constants/factions";
import lhqLogoLight from "assets/lhqLogoLight.svg";
import lhqLogoDark from "assets/lhqLogoDark.svg";
import releaseSchedule from "assets/releaseSchedule.webp";
import reissueSchedule from "assets/reissueSchedule.webp";
import naTournaments from "assets/2025 NA Tournaments.png";
import euTournaments from "assets/2025 Eurasia Tournaments.png";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: "rotate(180deg)" },
}));

function Post({ title, date, body }) {
  return (
    <div style={{ maxWidth: 400 }}>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body2">{body}</Typography>
    </div>
  );
}

function Releases({ releases }) {
  return (
    <div>
      {Object.keys(releases).map((faction) => (
        <>
          {releases[faction].length > 0 && (
            <>
              <h3 style={{ margin: 0 }}>{faction}</h3>
              <ul style={{ marginTop: 0, marginBottom: 3 }}>
                {releases[faction].map((release) => (
                  <li>
                    {release.name} ({release.date}, {release.price})
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ))}
    </div>
  );
}

function Home() {
  const {
    newsPosts,
    releaseList,
    auth,
    userId,
    userLists,
    userSettings,
    fetchUserLists,
    deleteUserList,
  } = useContext(DataContext);
  const classes = useStyles();
  const listChips = {};
  const [isNewsOpen, setIsNewsOpen] = useState(true);
  const [isReleasesOpen, setIsReleasesOpen] = useState(true);
  const [isTournamentsOpen, setIsTournamentsOpen] = useState(true);
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fade in={true}>
        <Container>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: 5 }}
          >
            <Grid item>
              <img
                alt="Legion HQ 2 Logo"
                src={
                  userSettings.themeColor === "light"
                    ? lhqLogoLight
                    : lhqLogoDark
                }
                style={{ width: 400, height: "auto" }}
              />
            </Grid>
            <Grid item style={{ maxWidth: "75vw", textAlign: "center" }}>
              <Typography variant="subtitle1">
                An unofficial list building tool and resource for Atomic Mass
                Games: Star Wars: Legion.
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" onClick={() => setIsNewsOpen(!isNewsOpen)}>
                <NewsIcon fontSize="small" style={{ marginRight: 4 }} />
                Latest News
                <ExpandMoreIcon
                  fontSize="small"
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: isNewsOpen,
                  })}
                />
              </Button>
            </Grid>
            <Grid item>
              {newsPosts.length > 0 && (
                <Collapse in={isNewsOpen}>
                  <Post
                    title={newsPosts[0].title}
                    date={newsPosts[0].date}
                    body={newsPosts[0].body}
                  />
                </Collapse>
              )}
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            {Object.keys(factions).map((faction) => (
              <Grid
                key={faction}
                item
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item key="factionChip">
                  <FactionChip faction={faction} />
                </Grid>
                {listChips[faction].slice(0, 3).map((userList) => (
                  <Grid item key={userList.listId}>
                    <ListChip
                      userList={userList}
                      deleteUserList={deleteUserList}
                    />
                  </Grid>
                ))}
                {listChips[faction].length > 3 ? (
                  <ListChipDropdown
                    faction={faction}
                    chips={listChips[faction]
                      .slice(3, listChips[faction].length)
                      .map((userList) => (
                        <Grid item key={userList.listId}>
                          <ListChip
                            userList={userList}
                            deleteUserList={deleteUserList}
                          />
                        </Grid>
                      ))}
                  />
                ) : (
                  <></>
                )}
              </Grid>
            ))}
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <LoginButton auth={auth} />
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <Button
                size="small"
                onClick={() => setIsReleasesOpen(!isReleasesOpen)}
              >
                <ReleaseIcon fontSize="small" style={{ marginRight: 4 }} />
                Upcoming New Releases
                <ExpandMoreIcon
                  fontSize="small"
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: isReleasesOpen,
                  })}
                />
              </Button>
            </Grid>
            <Grid item>
              {releaseList && (
                <Collapse in={isReleasesOpen}>
                  <a
                    href="https://store.asmodee.com/collections/star-wars-legion?sort_by=created-descending"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Legion Product By Release Date
                  </a>
                  <Releases releases={releaseList} />
                  <h6>
                    * Prices are in USD and releases are based on US dates. Both
                    may vary based on your location.
                  </h6>
                </Collapse>
              )}
            </Grid>
            <Grid item>
              <Button
                size="small"
                onClick={() => setIsTournamentsOpen(!isTournamentsOpen)}
              >
                <TorunamentsIcon fontSize="small" style={{ marginRight: 4 }} />
                Grand Tournaments
                <ExpandMoreIcon
                  fontSize="small"
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: isTournamentsOpen,
                  })}
                />
              </Button>
            </Grid>
            <Grid item>
              <Collapse in={isTournamentsOpen}>
                <img
                  alt="NA Tournaments"
                  src={naTournaments}
                  style={{ width: 600, height: "auto" }}
                />
                <img
                  alt="Eurasia Tournaments"
                  src={euTournaments}
                  style={{ width: 600, height: "auto" }}
                />
              </Collapse>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <iframe
                title="Legion Discord"
                frameBorder="0"
                allowtransparency="true"
                style={{ width: "100%", height: 400 }}
                src="https://discordapp.com/widget?id=349001242489520128&theme=dark&username="
              ></iframe>
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </ErrorBoundary>
  );
}

export default Home;
