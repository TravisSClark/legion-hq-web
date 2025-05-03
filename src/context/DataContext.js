import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  ViewModule as CardsIcon,
  Announcement as NewsIcon,
  Casino as DiceIcon,
} from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import { AlertTitle, Alert } from "@mui/material";
// import ErrorFallback from 'common/ErrorFallback';
import FactionIcon from "common/FactionIcon";
import urls from "constants/urls";
import settings from "constants/settings";
import { useAuth0 } from "@auth0/auth0-react";
import xapikey from "constants/ssl";
import auth from "constants/auth";
import NewsJson from "./news.json";
const { returnTo } = auth.prod;

const DataContext = createContext();
const httpClient = Axios.create();
httpClient.defaults.timeout = 10000;
let config = {
  headers: {
    "x-api-key": xapikey,
  },
};

const fontSize = 26;

const routes = {
  "/": {
    name: "Home",
    path: "/",
    icon: <HomeIcon style={{ fontSize }} />,
  },
  "/news": {
    name: "News",
    path: "/news",
    icon: <NewsIcon style={{ fontSize }} />,
  },
  "/cards": {
    name: "Cards",
    path: "/cards",
    icon: <CardsIcon style={{ fontSize }} />,
  },
  "/roller": {
    name: "Dice Roller",
    path: "/roller",
    icon: <DiceIcon style={{ fontSize }} />,
  },
  "/list/rebels": {
    name: "Rebels",
    path: "/list/rebels",
    icon: <FactionIcon faction="rebels" />,
  },
  "/list/empire": {
    name: "Empire",
    path: "/list/empire",
    icon: <FactionIcon faction="empire" />,
  },
  "/list/republic": {
    name: "Republic",
    path: "/list/republic",
    icon: <FactionIcon faction="republic" />,
  },
  "/list/separatists": {
    name: "Separatists",
    path: "/list/separatists",
    icon: <FactionIcon faction="separatists" />,
  },
  "/list/mercenary": {
    name: "Shadow Collective",
    path: "/list/mercenary",
    icon: <FactionIcon faction="mercenary" />,
  },
  "/settings": {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon style={{ fontSize }} />,
  },
  "/info": {
    name: "Info",
    path: "/info",
    icon: <InfoIcon style={{ fontSize }} />,
  },
};

const newsPosts = JSON.parse(JSON.stringify(NewsJson));

function initializeLocalSettings() {
  if (typeof Storage !== "undefined") {
    const localSettings = JSON.parse(window.localStorage.getItem("settings"));
    return {
      ...settings.default,
      ...localSettings,
    };
  }
  return settings.default;
}

export function DataProvider({ children }) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertAllowed, setIsAlertAllowed] = useState(true);
  const [error, setError] = useState();
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState();
  const [userLists, setUserLists] = useState([]);
  const [userSettings, setUserSettings] = useState(initializeLocalSettings());

  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  let isLoginDisabled = true;
  let loginTooltipText = "";
  let loginButtonText = "Loading...";
  let loginHandler;

  if (!isAuthenticated) {
    isLoginDisabled = false;
    loginButtonText = "Login";
    loginTooltipText = "Login via Google, Facebook, or use a custom account.";
    loginHandler = () => loginWithRedirect();
  } else {
    isLoginDisabled = false;
    loginButtonText = "Logout";
    loginTooltipText = `Logged in as ${user.email}`;
    loginHandler = () => logout({ returnTo });
  }

  useEffect(() => {
    if (user && user.email && isAuthenticated && !userId) {
      fetchUserId(user.email);
    }
  }, [isAuthenticated, user, userId]);

  useEffect(() => {
    if (userId) fetchUserLists(userId);
  }, [userId]);

  useEffect(() => {
    let numFetches = 0;
    const intervalId = setInterval(() => {
      if (userId && numFetches < 5) {
        numFetches++;
        fetchUserLists(userId);
      } else if (user && isAuthenticated && !userId) {
        fetchUserId(user.email ? user.email : "Undefined email");
      }
    }, 15000);
    return () => clearInterval(intervalId);
  }, [userId, user, isAuthenticated]);

  const setUserSettingsValue = (key, value) => {
    if (typeof Storage !== "undefined") {
      const newSettings = {
        ...userSettings,
        [key]: value,
      };
      window.localStorage.setItem("settings", JSON.stringify(newSettings));
      setUserSettings(newSettings);
    }
  };
  const goToPage = (newRoute) => navigate(newRoute);
  const fetchUserLists = (userId) => {
    if (userId) {
      httpClient
        .get(`${urls.api}/lists?userId=${userId}`, config)
        .then((response) => {
          let lists = response.data;
          lists.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
          setUserLists(lists);
        })
        .catch((e) => {
          setError(e);
          setMessage(`Failed to fetch lists for user ${userId}.`);
          setIsAlertOpen(true);
        });
    } else setUserLists([]);
  };
  const deleteUserList = (listId) => {
    if (listId) {
      httpClient
        .delete(`${urls.api}/lists/${listId}?userId=${userId}`, config)
        .then((response) => fetchUserLists(userId))
        .catch((e) => {
          setError(e);
          setMessage(`Failed to delete list ${listId} for user ${userId}.`);
          setIsAlertOpen(true);
        });
    }
  };
  const fetchUserId = (email) => {
    if (email) {
      httpClient
        .get(`${urls.api}/users?email=${email}`, config)
        .then((response) => {
          if (response.data.userId) {
            setUserId(response.data.userId);
          } else {
            httpClient
              .post(`${urls.api}/users`, { email }, config)
              .then((creationResponse) => {
                if (creationResponse.data.userId) {
                  setUserId(creationResponse.data.userId);
                } else {
                  setError("Login failure");
                  setMessage(
                    `Tried and failed to create account with email address ${email}.`
                  );
                  setIsAlertOpen(true);
                }
              })
              .catch((e) => {
                setError("Login failure");
                setMessage(
                  `Failed to create account with email address ${email}.`
                );
                setIsAlertOpen(true);
              });
          }
        })
        .catch((e) => {
          setError(e);
          setMessage(
            `Can't find user with email address ${email}. Server likely down.`
          );
          setIsAlertOpen(true);
        });
    }
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    setIsAlertAllowed(false);
  };

  // if (error) return <ErrorFallback error={error} message={message} />;

  return (
    <React.Fragment>
      <DataContext.Provider
        value={{
          isDrawerOpen,
          newsPosts,
          userId,
          routes,
          userLists,
          userSettings,
          goToPage,
          fetchUserLists,
          setUserLists,
          setUserSettingsValue,
          setIsDrawerOpen,
          deleteUserList,
          isLoginDisabled,
          loginTooltipText,
          loginButtonText,
          loginHandler,
        }}
      >
        {children}
      </DataContext.Provider>
      <Snackbar
        open={isAlertOpen && isAlertAllowed}
        autoHideDuration={null}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          <AlertTitle>Something went wrong!</AlertTitle>
          <strong>{error && error.toString()}</strong>
          <br />
          {message}
          <br />
          Issues can be emailed to{" "}
          <a href="crit2block@gmail.com">crit2block@gmail.com</a>.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default DataContext;
