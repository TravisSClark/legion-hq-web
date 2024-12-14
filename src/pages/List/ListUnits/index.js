import React from 'react';
import ListContext from 'context/ListContext';
import DragDropContainer from './DragDropContainer';
import ListUnit from './ListUnit';
import CounterpartUnit from './CounterpartUnit';
import cards from 'constants/cards';
import UnitContext from 'context/UnitContext';

function ListUnits() {
  const {
    currentList,
    reorderUnits,
    setCardPaneFilter,
  } = React.useContext(ListContext);

  const items = currentList.units.map((unit, unitIndex) => {
    const unitCard = cards[unit.unitId];
    const { counterpartId } = unitCard;
    let counterpartUnit = null;
    let addCounterpartHandler;
    
    if(counterpartId){
      // Show counterpart add icon(s) if unit has a counterpart option and it's not already in list
      if (!currentList.uniques.includes(counterpartId)){
        // general case (not IG-11) & Special case for IG-11 (tj) + 'Nanny Programming' (tp)
        if(unit.unitId !== 'tj' || (unit.unitId === 'tj' && currentList.uniques.includes('tp'))){
          addCounterpartHandler = () => setCardPaneFilter({
            action: 'COUNTERPART', unitIndex, counterpartId
          });
        }
      }
      // else, if unit has counterpart equipped, render it
      else if (unit.counterpart) {
        const counterpartCard = cards[counterpartId];

        counterpartUnit = (
          <UnitContext.Provider 
            value={{
              unit: unit.counterpart,
              unitIndex,
              unitCard: counterpartCard,
              totalUpgradeBar:[...counterpartCard.upgradeBar, ...unit.counterpart.additionalUpgradeSlots],
              // TODO: this is not *great*; relies on card funcs following "COUNTERPART_UPGRADE" et al to work
              actionPrefix:"COUNTERPART"
          }}>
            <CounterpartUnit/>
          </UnitContext.Provider>
        );
      }
    }

    return {
      id: unit.unitObjectString,
      component: (
        <UnitContext.Provider 
          value={{
            unit,
            unitIndex,
            unitCard,
            totalUpgradeBar:[...unitCard.upgradeBar, ...unit.additionalUpgradeSlots],
            // TODO: this is not *great*; relies on card funcs following "UNIT_UPGRADE" et al to work
            actionPrefix:"UNIT"
        }}>
          <ListUnit
            counterpartUnit={counterpartUnit}
            addCounterpartHandler={addCounterpartHandler}
          />
        </UnitContext.Provider>
      )
    }
  });
  return (
    <div id="list-units" style={{ display: 'flex', flexFlow: 'column' }}>
      <DragDropContainer items={items} reorderUnits={reorderUnits} />
    </div>
  );
};

export default ListUnits;