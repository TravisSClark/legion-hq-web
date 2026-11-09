import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import LoadingWidget from "common/LoadingWidget";
import listTemplate from "constants/listTemplate";
const Home = lazy(() => import("pages/Home"));
const News = lazy(() => import("pages/News"));
const Cards = lazy(() => import("pages/Cards"));
const Roller = lazy(() => import("pages/Roller"));
const Privacy = lazy(() => import("pages/Privacy"));
const MainListPage = lazy(() => import("pages/List"));
const Settings = lazy(() => import("pages/Settings"));
const Resources = lazy(() => import("pages/Resources"));
const Info = lazy(() => import("pages/Info"));

function ListRoute() {
  const { slug, listHash } = useParams();
  return <MainListPage slug={slug} listHash={listHash} />;
}

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
  mandalorians: {
    ...listTemplate,
    faction: "mandalorians",
    battleForce: "Mandalorian Clans",
  },
};

function Pages() {
  return (
    <Suspense fallback={<LoadingWidget />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/list/:slug/:listHash?" element={<ListRoute />} />
        <Route path="/roller" element={<Roller />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/info" element={<Info />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Pages;
