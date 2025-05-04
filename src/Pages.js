import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router';
import LoadingWidget from 'common/LoadingWidget';
import listTemplate from 'constants/listTemplate';
const Home = lazy(() => import('pages/Home'));
const News = lazy(() => import('pages/News'));
const Cards = lazy(() => import('pages/Cards'));
const Roller = lazy(() => import('pages/Roller'));
const Privacy = lazy(() => import('pages/Privacy'));
const MainListPage = lazy(() => import('pages/List'));
const Settings = lazy(() => import('pages/Settings'));
const Info = lazy(() => import('pages/Info'));

function Pages() {
  const initialLists = {
    rebels: { ...listTemplate, faction: 'rebels' },
    empire: { ...listTemplate, faction: 'empire' },
    republic: { ...listTemplate, faction: 'republic' },
    separatists: { ...listTemplate, faction: 'separatists' },
    mercenary: { ...listTemplate, faction: 'mercenary', battleForce: 'Shadow Collective' }
  };
  const [storedLists, setStoredLists] = useState(() => initialLists);
  const updateStoredList = (newList) => {
    const faction = newList.faction;
    storedLists[faction] = newList;
    setStoredLists({ ...storedLists });
  }
  const navigate = useNavigate();
  useEffect(()=>navigate('/'),[]);

  return (
    <Suspense fallback={<LoadingWidget />}>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/news" element={<News/>} />
        <Route path="/cards" element={<Cards/>} />
        <Route
          path="/list/:slug/:listHash?"
          element={
              <MainListPage
                storedLists={storedLists}
                updateStoredList={updateStoredList}/>}
        />
        <Route path="/roller" element={<Roller/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/info" element={<Info/>} />
        <Route path="/privacy" element={<Privacy/>} />
      </Routes>
    </Suspense>
  );
};

export default Pages;
