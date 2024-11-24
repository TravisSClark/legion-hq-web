import cards from "./cards";
export default function listReducer(oldList, action){

  let list = cloneList(oldList);

  switch(action.type){

    case "addUnit":
      list = handleAddUnit(list, action.unitId, action.stackSize);
      break;
  }

  // TODO; should be able to make some of these conditional
  list = consolidate(list);
  return list;

}


const handleAddUnit = (currentList, unitId, stackSize) => {
  // if (width === 'xs' || width === 'sm') {
  //   setCardPaneFilter({ action: 'DISPLAY' });
  // }
  //setStackSize(1);
  const newList = addUnit(currentList, unitId, stackSize);
  // updateThenValidateList({ ...newList });
}

function addUnit(list, unitId, stackSize = 1) {
  const unitCard = cards[unitId];
  let unitIndex = findUnitHash(list, unitId);

  // TODO TODO - this  will break stuff again if a list can have 2 units with Contingencies
  // Should set list.contingencies=[] by default and let consolidate handle the show/no-show/emptying of it
  if (unitCard.keywords.includes('Contingencies')) {
    if (!list.contingencies) list.contingencies = [];
  }
  if (unitIndex > -1) {
    list.units[unitIndex].count += stackSize;
    list.units[unitIndex].totalUnitCost += unitCard.cost * stackSize;
  } else {
    const newUnitObject = {
      unitId,
      count: unitCard.isUnique ? 1 : stackSize,
      hasUniques: unitCard.isUnique,
      totalUnitCost: unitCard.cost * stackSize,
      unitObjectString: unitId,
      upgradesEquipped: [],
      loadoutUpgrades: [],
      additionalUpgradeSlots: []
    };
    for (let i = 0; i < unitCard.upgradeBar.length; i++) {
      newUnitObject.upgradesEquipped.push(null);
      if (unitCard.keywords.includes('Loadout')) {
        newUnitObject.loadoutUpgrades.push(null);
      }
    }
    list.units.push(newUnitObject);
    list.unitObjectStrings.push(unitId);
    unitIndex = list.units.length - 1;

    if (unitCard.equip) {
      for (let i = 0; i < unitCard.equip.length; i++) {
        let upgradeType = cards[unitCard.equip[i]].cardSubtype;
        let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);
        if (list.units[list.units.length - 1].upgradesEquipped[upgradeIndex]) {
          while (list.units[list.units.length - 1].upgradesEquipped[upgradeIndex] && upgradeIndex < unitCard.upgradeBar.length - 1) {
            upgradeIndex += 1;
          }
        }
        equipUpgradeToAll(list, unitIndex, upgradeIndex, unitCard.equip[i]);
      }
    }

    // find any upgrades with 0 cost that are the only eligible in slot
    // narrow down upgrade types we check to ones that CAN be a no-cost one-of, e.g. there's always more than 1 grenade type eligible
    let freeSoloUpgradeTypes = ["armament"];
    
    freeSoloUpgradeTypes.forEach(upgradeType => {
      let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);

      if(upgradeIndex > -1){
        let eligibleUpgrades = getEquippableUpgrades(list, upgradeType, unitId, [], []);
        if(eligibleUpgrades.validIds.length === 1){
          let freeSoloId = eligibleUpgrades.validIds[0];
          if(cards[freeSoloId].cost === 0){
            // If this card was already added via equip above, it'll break things if added again
            // (currently a futureproof w no known case)
            if(!(unitCard.equip?.find(u => u === freeSoloId))){
              equipUpgradeToAll(list, unitIndex, upgradeIndex, freeSoloId);
            }
          }
        }
      }

    });

    if (unitCard.command) {
      unitCard.command.forEach((commandId) => addCommand(list, commandId));
    }
  }

  validateUpgrades(list, unitIndex);
  return consolidate(list);
}



/**
 * Lots of various reduction and housekeeping things. 
 * E.g. remove Contingencies deck if you no longer have
 * @param {} list 
 * @returns 
 */
 // TODO need to specialize this; should at least be a on-upgrade and on-unit fire, not this whole big thing
 function consolidate(list) {
  let hasContingencyKeyword = false;
  list.hasFieldCommander = false;
  list.commanders = [];
  list.uniques = [];
  list.unitCounts = { ...listTemplate.unitCounts };
  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    if (!unit.loadoutUpgrades) unit.loadoutUpgrades = [];
    const unitCard = cards[unit.unitId];
    unit.hasUniques = false;
    if (unitCard.isUnique) {
      list.uniques.push(unitCard.id);
      unit.hasUniques = true;
    }
    if(unit.counterpart)list.uniques.push(unit.counterpart.counterpartId);

    if (unitCard.keywords.includes('Contingencies')) hasContingencyKeyword = true;
    if (unitCard.rank === 'commander' || unitCard.rank === 'operative' || unitCard.isUnique) {
      list.commanders.push(unitCard.cardName);
    }
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.isUnique) {
          list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
        }
        if(upgradeCard.uniqueCount){
          list.uniques.push(upgradeCard.id);
        }
        if (upgradeCard.keywords.includes('Field Commander')) {
          list.hasFieldCommander = true;
        }
      }
    }
    for (let j = 0; j < unit.loadoutUpgrades.length; j++) {
      const upgradeId = unit.loadoutUpgrades[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.isUnique) {
          list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
        }
      }
    }

    list.unitCounts[unitCard.rank] += unit.count;
    
    // if (unitCard.associate){
    //   if(list.units.find(u => u.unitId === unitCard.associate) !== undefined){
    //     list.unitCounts[unitCard.rank]--;
    //   }
    // }
    if (unit.unitId === 'rc' && unit.upgradesEquipped.includes('rq')) { // Maul + Darksaber interaction
      list.unitCounts['commander']++;
      list.unitCounts['operative']--;
    }
    if(battleForcesDict[list.battleForce]?.rules?.buildsAsCorps?.includes(unit.unitId)){
      list.unitCounts[unitCard.rank] -= unit.count;
      list.unitCounts['corps'] += unit.count;
    } 
  }
  for (let i = list.commandCards.length - 1; i > -1 ; i--) {
    const { commander } = cards[list.commandCards[i]];
    if (commander && !list.commanders.includes(commander)) {
      list = removeCommand(list, i);
    }
  }
  if (list.contingencies) {
    for (let i = list.contingencies.length - 1; i > -1; i--) {
      const { commander } = cards[list.contingencies[i]];
      if (commander && !list.commanders.includes(commander)) {
        list = removeContingency(list, i);
      }
    }
  }
  if (!list.battleForce) list.battleForce = '';
  if (!hasContingencyKeyword) list.contingencies = [];
  list.commandCards = sortCommandIds(list.commandCards);
  return countPoints(list);
}

// TODO implement this better
const cloneList = list => {
  return JSON.parse(JSON.stringify(list));
}