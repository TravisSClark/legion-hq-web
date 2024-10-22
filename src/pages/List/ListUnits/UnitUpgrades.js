import React, { useContext } from 'react';
import AddCounterpartButton from './AddCounterpartButton';
import AddUpgradeButton from './AddUpgradeButton';
import UpgradeChip from './UpgradeChip';
import ListContext from 'context/ListContext';
import UnitContext from 'context/UnitContext';

function UnitUpgrades({
  counterpartId,
  addCounterpartHandler,
}) {

  const {unit, unitIndex, unitCard, totalUpgradeBar, actionPrefix} = useContext(UnitContext);
  const addCounterpartButtons = [];
  const addUpgradesButtons = [];
  const upgradeChips = [];
  const hasLoadout = unit.loadoutUpgrades ? unit.loadoutUpgrades.length > 0 : false;

  const {setCardPaneFilter, handleCardZoom} = useContext(ListContext);
  console.log("TODO REMOVE" + unitCard.cardName);

  if (addCounterpartHandler) {
    addCounterpartButtons.push(
      <AddCounterpartButton
        key={counterpartId}
        counterpartId={counterpartId}
        handleClick={addCounterpartHandler}
      />
    );
  }
  unit.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
    const upgradeType = totalUpgradeBar[upgradeIndex];

    if (upgradeId) {
      upgradeChips.push(
        <UpgradeChip
          unitIndex={unitIndex}
          upgradeIndex={upgradeIndex}
          key={upgradeId}
          upgradeId={upgradeId}
          loadoutId={hasLoadout ? unit.loadoutUpgrades[upgradeIndex] : undefined}
          handleClick={() => handleCardZoom(upgradeId)}
        />
      );
    } else {

      console.log("TODO REMOVE " + actionPrefix + "_UPGRADE");

      addUpgradesButtons.push(
        <AddUpgradeButton
          key={`${totalUpgradeBar[upgradeIndex]}_${upgradeIndex}`}
          type={totalUpgradeBar[upgradeIndex]}
          // handleClick={addUpgradeHandlers[upgradeIndex]}
          handleClick={
            () =>{ 
              setCardPaneFilter({
                action: actionPrefix + '_UPGRADE',
                upgradeType, unitIndex, upgradeIndex,
                hasUniques: unit.hasUniques,
                unitId: unitCard.id,
                upgradesEquipped: unit.upgradesEquipped,
                additionalUpgradeSlots: unit.additionalUpgradeSlots
              })
          }
          }
        />
      );
    }
  });
  return (
    <div style={{ flex: 'display', flexFlow: 'row wrap', alignItems: 'center' }}>
      {addCounterpartButtons}
      {addUpgradesButtons}
      {upgradeChips}
    </div>
  );
};

export default UnitUpgrades;
