import React, { useContext } from "react";
import ListContext from "context/ListContext";
import StandardListLayout from "./StandardListLayout";
import TodListLayout from "./TourOfDuty/Common/TodListLayout";

function ListLayout() {
  const {
    currentList
  } = useContext(ListContext);

  if(currentList?.mode === "tour of duty")
    return <TodListLayout></TodListLayout>
  else
    return <StandardListLayout></StandardListLayout>
}

export default ListLayout;
