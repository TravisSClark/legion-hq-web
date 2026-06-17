import React, { useContext } from "react";
import { Icon } from "@material-ui/core";
import DataContext from "context/DataContext";
import factions from "constants/factions";
import themes from "constants/themes";

function FactionIcon({ faction, style }) {
  const { userSettings } = useContext(DataContext);
  const { themeColor } = userSettings;
  if (faction in factions) {
    const paletteType = themes.palettes[themeColor].type;
    return (
      <Icon>
        <img
          alt={faction}
          src={factions[faction].icon[paletteType]}
          style={
            style
              ? style
              : {
                  marginBottom: 5,
                  height: 20,
                }
          }
        />
      </Icon>
    );
  } else return <div />;
}

export default FactionIcon;
