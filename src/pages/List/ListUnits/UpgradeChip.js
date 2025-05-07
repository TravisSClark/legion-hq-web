import React, { useContext } from "react";
import { Chip, Button, Typography } from "@material-ui/core";
import CardIcon from "common/CardIcon";
import cards from "constants/cards";
import ListContext from "context/ListContext";
import UnitContext from "context/UnitContext";

function UpgradeLabel({ card, handleSwapUpgrade }) {
  return (
    <div style={{ display: "flex", flex: 0, alignItems: "center" }}>
      <Button
        disableRipple
        size="small"
        onClick={handleSwapUpgrade}
        style={{ textTransform: "none" }}
      >
        <Typography variant="body2">
          {`${card.displayName ? card.displayName : card.cardName} (${
            card.cost
          })`}
        </Typography>
      </Button>
    </div>
  );
}

function UpgradeAvatar({ card, handleClick }) {
  return <CardIcon size="small" card={card} handleClick={handleClick} />;
}

function UpgradeChip({
  chipSize = "medium",
  upgradeId,
  handleClick,
  upgradeIndex,
}) {
  const upgradeCard = cards[upgradeId];

  const { handleUnequipUpgrade, setCardPaneFilter } = useContext(ListContext);

  const { unitCard, unitIndex, unit, totalUpgradeBar, actionPrefix } =
    useContext(UnitContext);

  const upgradeType = totalUpgradeBar[upgradeIndex];

  let pointDelta = 0;
  if (unit.upgradeInteractions && upgradeId in unit.upgradeInteractions) {
    pointDelta = unit.upgradeInteractions[upgradeId];
  }

  return (
    <Chip
      size={chipSize}
      label={
        <UpgradeLabel
          card={{ ...upgradeCard, cost: upgradeCard.cost + pointDelta }}
          handleSwapUpgrade={() =>
            setCardPaneFilter({
              action: actionPrefix + "_UPGRADE",
              upgradeType,
              unitIndex,
              upgradeIndex,
              unitId: unitCard.id,
              upgradesEquipped: unit.upgradesEquipped,
              additionalUpgradeSlots: unit.additionalUpgradeSlots,
            })
          }
        />
      }
      sx={[
        {
          "& .MuiChip-label": {
            padding: 2,
            backgroundColor: "red",
          },
        },
      ]}
      avatar={<UpgradeAvatar card={upgradeCard} handleClick={handleClick} />}
      style={{ marginRight: 4, marginTop: 4, marginBottom: 6, height: "auto" }}
      onDelete={() =>
        handleUnequipUpgrade(actionPrefix + "_UPGRADE", unitIndex, upgradeIndex)
      }
    />
  );
}

export default UpgradeChip;
