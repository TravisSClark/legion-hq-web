import React, { useContext } from 'react';
import { Divider, Chip, Button, IconButton, Icon, Typography } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import CardIcon from 'common/CardIcon';
import cards from 'constants/cards';
import loadoutIcon from 'assets/loadout.png';
import ListContext from 'context/ListContext';
import UnitContext from 'context/UnitContext';

function UpgradeLabel({ card, handleSwapUpgrade, handleChangeLoadout }) {


  const {unit} = useContext(UnitContext);

  const hasLoadout = unit.loadoutUpgrades ? unit.loadoutUpgrades.length > 0 : false;
  
  if (handleChangeLoadout) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2">
          {`${card.displayName ?
            card.displayName :
            card.cardName} (${card.cost})`}
        </Typography>
        {hasLoadout && (
          <IconButton
            size="small"
            onClick={handleChangeLoadout}
            style={{ zIndex: 1, marginLeft: 4, width: 26, height: 26 }}
          >
            <Icon>
              <img
                alt="loadout"
                src={loadoutIcon}
                style={{ width: 14, height: 19, marginBottom: 1 }}
              />
            </Icon>
          </IconButton>
        )}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        disableRipple
        size="small"
        onClick={handleSwapUpgrade}
        style={{ textTransform: 'none' }}
      >
        <Typography variant="body2">
          {`${card.displayName ?
            card.displayName :
            card.cardName} (${card.cost})`}
        </Typography>
      </Button>
      {hasLoadout && (
        <IconButton
          size="small"
          onClick={handleChangeLoadout}
          style={{ zIndex: 1, marginLeft: 4, width: 26, height: 26 }}
        >
          <Icon>
            <img
              alt="loadout"
              src={loadoutIcon}
              style={{ width: 14, height: 19, marginBottom: 1 }}
            />
          </Icon>
        </IconButton>
      )}
    </div>
  );
}

function LoadoutLabel({
  upgradeCard, loadoutCard, handleChangeLoadout, handleDeleteLoadout
}) {
  return (
    <div style={{ alignItems: 'flex-start', flexFlow: 'column nowrap' }}>
      <UpgradeLabel
        card={upgradeCard}
        handleChangeLoadout={handleChangeLoadout}
      />
      <Divider />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">
            {`${loadoutCard.displayName ?
              loadoutCard.displayName :
              loadoutCard.cardName} (${loadoutCard.cost})`}
          </Typography>
          <IconButton
            size="small"
            onClick={handleDeleteLoadout}
            style={{ marginLeft: 4 }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </div>
    </div>
  );
}

function UpgradeAvatar({ card, handleClick }) {
  return (
    <CardIcon
      size="small"
      card={card}
      handleClick={handleClick}
    />
  );
}

function UpgradeChip({
  chipSize = 'medium',
  upgradeId,
  loadoutId,
  handleClick,
  upgradeIndex
}) {
  const upgradeCard = cards[upgradeId];
  const loadoutCard = cards[loadoutId];

  const {handleUnequipUpgrade, setCardPaneFilter} = useContext(ListContext);

  const {unitCard, unitIndex, unit, totalUpgradeBar, actionPrefix } = useContext(UnitContext);

  const upgradeType = totalUpgradeBar[upgradeIndex];

  let pointDelta = 0;
  if (unit.upgradeInteractions && upgradeId in unit.upgradeInteractions) {
    pointDelta = unit.upgradeInteractions[upgradeId];
  }
  const hasLoadout = unit.loadoutUpgrades.length > 0;

  return (
    <Chip
      size={chipSize}
      label={(hasLoadout && loadoutCard) ? (
        <LoadoutLabel
          upgradeCard={{ ...upgradeCard, cost: upgradeCard.cost + pointDelta }}
          loadoutCard={loadoutCard}
          handleChangeLoadout={() => setCardPaneFilter({
            action: actionPrefix+'_LOADOUT_UPGRADE',
            upgradeType, unitIndex, upgradeIndex,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots
          })}
          handleDeleteLoadout={() => handleUnequipUpgrade(
            actionPrefix+'_LOADOUT_UPGRADE', unitIndex, upgradeIndex
          )}
        />
      ) : (
        <UpgradeLabel
          card={{ ...upgradeCard, cost: upgradeCard.cost + pointDelta }}
          handleSwapUpgrade={() => setCardPaneFilter({
            action: actionPrefix+'_UPGRADE',
            upgradeType, unitIndex, upgradeIndex,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots
          })}
          handleChangeLoadout={() => setCardPaneFilter({
            action: actionPrefix+'_LOADOUT_UPGRADE',
            upgradeType, unitIndex, upgradeIndex,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots
          })}
        />
      )}
      avatar={<UpgradeAvatar card={upgradeCard} handleClick={handleClick} />}
      style={{ marginRight: 4, marginTop: 4, marginBottom: 6, height: 'auto' }}
      onDelete={ () => handleUnequipUpgrade(
        actionPrefix+'_UPGRADE', unitIndex, upgradeIndex
      )}
    />
  );
};

export default UpgradeChip;
