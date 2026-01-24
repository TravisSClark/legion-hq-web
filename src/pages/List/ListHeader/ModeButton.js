import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonBase,
  Chip,
  Icon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import LargerTooltip from "common/LargerTooltip";
import legionModes from "constants/legionModes";
import DataContext from "context/DataContext";
import { ExpandMore } from "@material-ui/icons";

function ModeButton({
  currentMode,
  points,
  maxPoints,
  tooltip,
  handleChangeMode,
}) {
  const [anchorEl, setAnchorEl] = useState();
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl();
  const { userSettings } = useContext(DataContext);

  const isOverPoints = points > maxPoints;
  const pointsDiff = Math.abs(maxPoints - points);

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuList>
          {Object.getOwnPropertyNames(legionModes).map((modeName) => {
            const mode = legionModes[modeName];

            return (
              <MenuItem
                key={"mn-" + modeName}
                selected={currentMode === modeName}
                onClick={() => {
                  handleChangeMode(modeName);
                  handleCloseMenu();
                }}
              >
                {mode.name} ({mode.maxPoints} pts)
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <ButtonBase onClick={handleOpenMenu}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: isOverPoints ? "#f44336" : "transparent",
            borderRadius: 10,
            borderWidth: 1,
            paddingRight: 7,
            paddingLeft: 7,
            borderColor: isOverPoints ? "transparent" : "#aaa",
            borderStyle: "solid",
          }}
        >
          <Typography variant="caption">
            {points} / {maxPoints} ({pointsDiff})
          </Typography>
          <div
            style={{
              display: "flex",
              flex: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" style={{ fontSize: "0.5rem" }}>
              {legionModes[currentMode].name.toUpperCase()}
            </Typography>
            <ExpandMore fontSize="small" sx={{ fontSize: 16 }} />
          </div>
        </div>
      </ButtonBase>
    </React.Fragment>
  );
}

ModeButton.defaultProps = {
  tooltip:
    "Toggle between Recon (600), Standard (1000), and Grand Army (1600) formats.",
};

ModeButton.propTypes = {
  tooltip: PropTypes.string,
  points: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  handleChangeMode: PropTypes.func.isRequired,
};

export default ModeButton;
