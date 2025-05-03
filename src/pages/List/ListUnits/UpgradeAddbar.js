import React, { useContext } from 'react';
import AddCounterpartButton from './AddCounterpartButton';
import AddUpgradeButton from './AddUpgradeButton';
import ListContext from 'context/ListContext';
import UnitContext from 'context/UnitContext';

function UpgradeAddBar({
  counterpartId,
  addCounterpartHandler,
}) {

  const {unit, unitIndex, unitCard, totalUpgradeBar, actionPrefix} = useContext(UnitContext);
  const addCounterpartButtons = [];
  const addUpgradesButtons = [];

  const {setCardPaneFilter} = useContext(ListContext);

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

    if (!upgradeId) {
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
    </div>
  );
};

export default UpgradeAddBar;
