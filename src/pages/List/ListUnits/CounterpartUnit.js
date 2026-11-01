import React, { useContext } from "react";
import Box from "@mui/material/Box";
import UnitAvatar from "common/UnitAvatar";
import CardName from "common/CardName";
import UnitPoints from "common/UnitPoints";
import UnitActions from "./UnitActions";
import UnitUpgrades from "./UnitUpgrades";
import UnitContext from "context/UnitContext";
import ListContext from "context/ListContext";

function CounterpartUnit() {
  const { unit, unitCard, unitIndex } = useContext(UnitContext);
  const { handleCardZoom } = useContext(ListContext);

  return (
    <Box sx={{ ml: "25px", display: "flex", flexFlow: "row nowrap" }}>
      <div sx={{ mr: 0.5 }}>
        <UnitAvatar
          key="avatar"
          id={unitCard.id}
          handleClick={() => handleCardZoom(unitCard.id)}
        />
      </div>
      <div
        sx={{
          flex: 1,
          mr: 0.5,
          display: "flex",
          flexFlow: "column nowrap",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <CardName key="name" id={unitCard.id} />
        <UnitUpgrades key="upgrades" />
      </div>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          borderLeft: "1px solid rgba(255,255,255,0.12)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <UnitPoints key="points" unit={unit} parentheses={true} />
        <UnitActions unit={unit} unitIndex={unitIndex} isCounterpart={true} />
      </Box>
    </Box>
  );
}

export default CounterpartUnit;
