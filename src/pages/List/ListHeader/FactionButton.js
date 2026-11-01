import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import FactionIcon from "common/FactionIcon";

function FactionButton({ currentList, handleFactionMenuOpen }) {
  return (
    <ButtonBase onClick={handleFactionMenuOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 1,
          padding: 8,
          borderColor: "#aaa",
          borderStyle: "solid",
        }}
      >
        <FactionIcon faction={currentList.faction} />
        {currentList.battleForce
          ? currentList.battleForce
          : currentList.faction.charAt(0).toUpperCase() +
            currentList.faction.slice(1)}
        <ExpandMore fontSize="small" sx={{ fontSize: 16 }} />
      </div>
    </ButtonBase>
  );
}

FactionButton.propTypes = {
  handleClick: PropTypes.func,
  faction: PropTypes.oneOf([
    "rebels",
    "empire",
    "republic",
    "separatists",
    "mercenary",
    "mandalorians",
  ]).isRequired,
};

export default FactionButton;
