import PropTypes from "prop-types";
import { ButtonBase } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
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
        <FactionIcon faction={currentList.faction} style={{ padding: 3 }} />
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
  ]).isRequired,
};

export default FactionButton;
