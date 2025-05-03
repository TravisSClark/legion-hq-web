import React, { useContext } from 'react';
import AddCounterpartButton from './AddCounterpartButton';
import AddUpgradeButton from './AddUpgradeButton';
import UpgradeChip from './UpgradeChip';
import ListContext from 'context/ListContext';
import UnitContext from 'context/UnitContext';

function UnitUpgrades() {

  const {unit, unitIndex} = useContext(UnitContext);
  const addCounterpartButtons = [];
  const addUpgradesButtons = [];
  const upgradeChips = [];

  const { handleCardZoom} = useContext(ListContext);

 
  unit.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {

    if (upgradeId) {
      upgradeChips.push(
        <UpgradeChip
          unitIndex={unitIndex}
          upgradeIndex={upgradeIndex}
          key={upgradeId}
          upgradeId={upgradeId}
          handleClick={() => handleCardZoom(upgradeId)}
        />
      );
    }
  });
  return (
    <div style={{ flex: 'display', flexFlow: 'row wrap', alignItems: 'center', marginLeft:10, marginRight:10 }}>
      {addCounterpartButtons}
      {addUpgradesButtons}
      {upgradeChips}
    </div>
  );
};

export default UnitUpgrades;
