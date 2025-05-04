import React from "react";
import {createRoot} from "react-dom/client";

import { BrowserRouter } from "react-router";
import { DataProvider } from "context/DataContext";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import auth from "constants/auth";
const { domain, clientID } = auth.v1;
const { returnTo } = auth.prod;


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Auth0Provider domain={domain} clientId={clientID} redirectUri={returnTo}>
      <DataProvider>
        <App />
      </DataProvider>
    </Auth0Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
