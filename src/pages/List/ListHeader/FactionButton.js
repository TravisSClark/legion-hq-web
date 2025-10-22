import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import FactionIcon from "common/FactionIcon";

function FactionButton({ currentList, handleFactionMenuOpen }) {
  return (
    <Button
      size="medium"
      variant="outlined"
      startIcon={<FactionIcon faction={currentList.faction} />}
      onClick={handleFactionMenuOpen}
    >
      {currentList.battleForce ? currentList.battleForce : currentList.faction}
    </Button>
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
