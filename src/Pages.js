import React, { useState, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingWidget from "common/LoadingWidget";
import listTemplate from "constants/listTemplate";
const Home = lazy(() => import("pages/Home"));
const News = lazy(() => import("pages/News"));
const Cards = lazy(() => import("pages/Cards"));
const Roller = lazy(() => import("pages/Roller"));
const Privacy = lazy(() => import("pages/Privacy"));
const MainListPage = lazy(() => import("pages/List"));
const Settings = lazy(() => import("pages/Settings"));
const Info = lazy(() => import("pages/Info"));
export const initialLists = {
  rebels: { ...listTemplate, faction: "rebels" },
  empire: { ...listTemplate, faction: "empire" },
  republic: { ...listTemplate, faction: "republic" },
  separatists: { ...listTemplate, faction: "separatists" },
  mercenary: {
    ...listTemplate,
    faction: "mercenary",
    battleForce: "Shadow Collective",
  },
};

function Pages() {
  return (
    <Suspense fallback={<LoadingWidget />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/news" component={News} />
        <Route path="/cards" component={Cards} />
        <Route
          path="/list/:slug/:listHash?"
          render={({ match }) => {
            const { params } = match;
            const { slug, listHash } = params;
            return <MainListPage slug={slug} listHash={listHash} />;
          }}
        />
        <Route path="/roller" component={Roller} />
        <Route path="/settings" component={Settings} />
        <Route path="/info" component={Info} />
        <Route path="/privacy" component={Privacy} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

export default Pages;
