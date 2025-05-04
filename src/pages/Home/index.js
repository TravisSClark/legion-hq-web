import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Grid,
  Typography,
  Container,
  Fade,
  Button,
  Collapse
} from '@mui/material';
import {
  Announcement as NewsIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import LoginButton from './LoginButton';
import ListChip from './ListChip';
import FactionChip from './FactionChip';
import ListChipDropdown from './ListChipDropdown';
import DataContext from 'context/DataContext';
import ErrorFallback from 'common/ErrorFallback';
import factions from 'constants/factions';
import lhqLogoLight from 'assets/lhqLogoLight.svg';
import lhqLogoDark from 'assets/lhqLogoDark.svg';
import releaseSchedule from 'assets/releaseSchedule.webp';
import reissueSchedule from 'assets/reissueSchedule.webp';

const PREFIX = 'Home';

const classes = {
  expand: `${PREFIX}-expand`,
  expandOpen: `${PREFIX}-expandOpen`
};

const StyledErrorBoundary = styled(ErrorBoundary)((
  {
    theme
  }
) => ({
  [`& .${classes.expand}`]: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },

  [`& .${classes.expandOpen}`]: { transform: 'rotate(180deg)' }
}));

function Post({ title, date, body }) {
  return (
    <div style={{ maxWidth: 400 }}>
      <Typography variant="body1">
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
    </div>
  );
}

function Home() {
  const {
    newsPosts,
    auth,
    userId,
    userLists,
    userSettings,
    fetchUserLists,
    deleteUserList
  } = useContext(DataContext);

  const listChips = {};
  const [isNewsOpen, setIsNewsOpen] = useState(true);
  Object.keys(factions).forEach(faction => listChips[faction] = []);
  if (userLists) {
    userLists.forEach(userList => {
      if (userList.faction in listChips) {
        listChips[userList.faction].push(userList);
      }
    });
  }
  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);
  return (
    <StyledErrorBoundary FallbackComponent={ErrorFallback}>
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
                src={userSettings.themeColor === 'light' ? lhqLogoLight : lhqLogoDark}
                style={{ width: 400, height: 'auto' }}
              />
            </Grid>
            <Grid item style={{ maxWidth: '75vw', textAlign: 'center' }}>
              <Typography variant="subtitle1">
                An unofficial list building tool and resource for Atomic Mass Games: Star Wars: Legion.
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" onClick={() => setIsNewsOpen(!isNewsOpen)}>
                <NewsIcon fontSize="small" style={{ marginRight: 4 }} />
                Latest news
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
            {Object.keys(factions).map(faction => (
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
                {listChips[faction].slice(0, 3).map(userList => (
                  <Grid item key={userList.listId}>
                    <ListChip userList={userList} deleteUserList={deleteUserList} />
                  </Grid>
                ))}
                {listChips[faction].length > 3 ? (
                  <ListChipDropdown
                      faction={faction}
                      chips={
                        listChips[faction].slice(3, listChips[faction].length).map(userList => (
                          <Grid item key={userList.listId}>
                            <ListChip userList={userList} deleteUserList={deleteUserList} />
                          </Grid>
                        ))
                      }
                    />
                  ):(<></>)}
              </Grid>
            ))}
            <Grid item>
              <LoginButton auth={auth} />
            </Grid>
            <Grid item>
              {/* TODO MUI update: parent div here resized to ~1150, making these no longer fit at 600w each until adjusted */}
              <img
                alt="2025 Release Schedule"
                src={releaseSchedule}
                style={{ width: 570, height: 'auto' }}
              />
               <img
                alt="2025 Reissue Schedule"
                src={reissueSchedule}
                style={{ width: 570, height: 'auto' }}
              />
            </Grid>
            <Grid item>
              <iframe
                title="Legion Discord"
                frameBorder="0"
                allowtransparency="true"
                style={{ width: '100%', height: 400 }}
                src="https://discordapp.com/widget?id=349001242489520128&theme=dark&username="
              >
              </iframe>
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </StyledErrorBoundary>
  );
}

export default Home;
