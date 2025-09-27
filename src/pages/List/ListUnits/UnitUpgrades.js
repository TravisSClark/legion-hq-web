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

  const {setCardPaneFilter, handleCardZoom} = useContext(ListContext);

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
          handleClick={() => handleCardZoom(upgradeId)}
        />
      );
    } else {

      let normalHandler = ()=> {
                console.log('normal upgrade');

        setCardPaneFilter({
        action: actionPrefix + '_UPGRADE',
        upgradeType, 
        unitIndex, 
        upgradeIndex,
        unitId: unitCard.id,
        upgradesEquipped: unit.upgradesEquipped,
      })};

      // console.log('upgradetype', JSON.stringify(upgradeType));
      let specialHandler = ()=>{
          setCardPaneFilter({
          action: actionPrefix + "_UPGRADE_SPECIAL",
          upgradeType: upgradeType.type, 
          unitIndex, 
          upgradeIndex,
          upgrades: upgradeType.upgrades,
          unitId: unitCard.id,
          upgradesEquipped: unit.upgradesEquipped,
        })}

      const isSpecial = typeof upgradeType === 'object'
      const clickHandler = isSpecial ? specialHandler : normalHandler;
      addUpgradesButtons.push(
        <AddUpgradeButton
          key={`${totalUpgradeBar[upgradeIndex]}_${upgradeIndex}`}
          type={isSpecial ? totalUpgradeBar[upgradeIndex].type : totalUpgradeBar[upgradeIndex]}
          // handleClick={addUpgradeHandlers[upgradeIndex]}
          handleClick={clickHandler}
          special={isSpecial}
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