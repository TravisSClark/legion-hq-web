import React from "react";
import ListContext from "context/ListContext";
import DragDropContainer from "./DragDropContainer";
import ListUnit from "./ListUnit";
import CounterpartUnit from "./CounterpartUnit";
import cards from "constants/cards";
import UnitContext from "context/UnitContext";
import { getUpgradeBar } from "components/eligibleCardListGetter";

function ListUnits() {
  const { currentList, reorderUnits, setCardPaneFilter } =
    React.useContext(ListContext);

  const equippedCounterparts = [];

  currentList.units.forEach((u) => {
    if (u.counterpart && u.counterpart.count > 0) {
      equippedCounterparts.push(u.counterpart.counterpartId);
    }
  });

  const items = currentList.units.map((unit, unitIndex) => {
    unit.additionalUpgradeSlots ??= [];
    unit.specialUpgradeSlots ??= [];
    const unitCard = cards[unit.unitId];
    const { counterpartId } = unitCard;
    let counterpartUnit = null;
    let addCounterpartHandler;

    if (counterpartId) {
      // Show counterpart add icon(s) if unit has a counterpart option and it's not already in list
      if (!equippedCounterparts.includes(counterpartId)) {
        // Special case for IG-11 (tj) + 'Nanny Programming' (tp)
        if (unit.unitId === "tj" && !unit.upgradesEquipped.includes("tp")) {
          addCounterpartHandler = null;
        } else {
          addCounterpartHandler = () =>
            setCardPaneFilter({
              action: "COUNTERPART",
              unitIndex,
              counterpartId,
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
              totalUpgradeBar: [...counterpartCard.upgradeBar],
              // TODO: this is not *great*; relies on card funcs following "COUNTERPART_UPGRADE" et al to work
              actionPrefix: "COUNTERPART",
            }}
          >
            <CounterpartUnit />
          </UnitContext.Provider>
        );
      }
    }

    return {
      id: unit.unitId + unit.upgradesEquipped.join(""),
      component: (
        <UnitContext.Provider
          value={{
            unit,
            unitIndex,
            unitCard,
            totalUpgradeBar: getUpgradeBar(unit),
            // TODO: this is not *great*; relies on card funcs following "UNIT_UPGRADE" et al to work (...also makes it tough to find the full action key in source ;) )
            actionPrefix: "UNIT",
          }}
        >
          <ListUnit
            counterpartUnit={counterpartUnit}
            addCounterpartHandler={addCounterpartHandler}
          />
        </UnitContext.Provider>
      ),
    };
  });
  return (
    <div id="list-units" style={{ display: "flex", flexFlow: "column" }}>
      <DragDropContainer items={items} reorderUnits={reorderUnits} />
    </div>
  );
}

export default ListUnits;
