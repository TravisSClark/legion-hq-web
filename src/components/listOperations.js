import _ from 'lodash';
import cards from 'constants/cards';

import interactions from 'components/cardInteractions';
import listTemplate from 'constants/listTemplate';
import battleForcesDict from 'constants/battleForcesDict';
import { validateUpgrades } from './listValidator';
import { getEquippableUpgrades } from './eligibleCardListGetter';


// Contains and only contains functions which modify the contents of the Legion list
// (split other things into appropriate helpers in components so this doesn't go to 2k+ LOC again XD)

function countPoints(list) {
  list.pointTotal = 0;
  list.units.forEach((unit, unitIndex) => {
    const unitCard = cards[unit.unitId];
    unit.totalUnitCost = unitCard.cost;
    
    unit.upgradeInteractions = {};
    unit.upgradesEquipped.forEach((upgradeId) => {
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        unit.totalUnitCost += upgradeCard.cost;
        if (upgradeId in interactions.upgradePoints) {
          const interaction = interactions.upgradePoints[upgradeId];
          if (interaction.isConditionMet(list, unit)) {
            unit.totalUnitCost += interaction.pointDelta;
            unit.upgradeInteractions[upgradeId] = interaction.pointDelta;
          }
        }
      }
    });
    if(unit.counterpart){
      const counterpartCard = cards[unit.counterpart.counterpartId];
      unit.counterpart.totalUnitCost = counterpartCard.cost;

      unit.counterpart.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId) {
          const upgradeCard = cards[upgradeId];
          unit.counterpart.totalUnitCost += upgradeCard.cost;
        }
      });
     
      unit.totalUnitCost += unit.counterpart.totalUnitCost;
    }

    unit.totalUnitCost *= unit.count;
    list.pointTotal += unit.totalUnitCost;
  });

  return list;
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
          for (let i = 0; i < unit.count; i++) list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
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
    
    if (unit.unitId === 'rc' && unit.upgradesEquipped.includes('rq')) { // Maul + Darksaber interaction - TODO, make it data/rules-driven
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

function deleteItem(items, i) {
  return items.slice(0, i).concat(items.slice(i + 1, items.length))
}

function findUnitHashInList(list, unitHash) {
  return list.unitObjectStrings.indexOf(unitHash);
}

function getUnitHash(unit) {
  return `${unit.unitId}${unit.upgradesEquipped.join('')}`;
}

function equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  counterpart.loadoutUpgrades[upgradeIndex] = upgradeId;
  return list;
}

function unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  if (counterpart.loadoutUpgrades[upgradeIndex]) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return list;
}

function equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  unit.loadoutUpgrades[upgradeIndex] = upgradeId;
  return list;
}

function unequipLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  if (unit.loadoutUpgrades[upgradeIndex]) {
    unit.loadoutUpgrades[upgradeIndex] = null;
  }
  return list;
}

function equipUnitUpgrade(list, unitIndex, upgradeIndex, upgradeId, isApplyToAll) {
  // applying upgrade to multiple units
  const unit = list.units[unitIndex];
  const count = isApplyToAll ? unit.count : 1;
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  const newUnitHash = getUnitHash(newUnit);
  newUnit.unitObjectString = newUnitHash;
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [...upgradeCard.additionalUpgradeSlots];
    newUnit.upgradesEquipped.push(null);
  }
  let newUnitHashIndex = findUnitHashInList(list, newUnit.unitObjectString);
  // If a unit with that upgrade doesn't exist
  if (newUnitHashIndex > -1) {
    list.units[list.unitObjectStrings.indexOf(newUnitHash)].count += count;
    list = decrementUnit(list, unitIndex);
  } else if (isApplyToAll) {
    list.units[unitIndex] = newUnit;
    list.unitObjectStrings[unitIndex] = newUnitHash;
  } else {
    newUnit.count = 1;
    list.units.splice(unitIndex + 1, 0, newUnit);
    list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
    list = decrementUnit(list, unitIndex);
  }
  return [list, newUnit];
}

function equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[upgradeId];
  counterpart.upgradesEquipped[upgradeIndex] = upgradeId;
  counterpart.totalUnitCost += upgradeCard.cost;
  return list;
}

function unequipCounterpartUpgrade(list, unitIndex, upgradeIndex) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[counterpart.upgradesEquipped[upgradeIndex]];
  counterpart.upgradesEquipped[upgradeIndex] = null;
  counterpart.totalUnitCost -= upgradeCard.cost;
  if (counterpart.loadoutUpgrades.length > 0) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return list;
}

function addCounterpart(list, unitIndex, counterpartId) {
  const counterpartCard = cards[counterpartId];
  const unit = list.units[unitIndex];
  const unitCard = cards[unit.unitId];
  unit.counterpart = {
    count: 1,
    counterpartId: counterpartCard.id,
    totalUnitCost: counterpartCard.cost,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };

  if(counterpartCard.upgradeBar){
    for (let i = 0; i < counterpartCard.upgradeBar.length; i++) {
      unit.counterpart.upgradesEquipped.push(null);
      if (unitCard.keywords.includes('Loadout')) {
        unit.counterpart.loadoutUpgrades.push(null);
      }
    }
  }
  return consolidate(list);
}

function removeCounterpart(list, unitIndex) {
  const counterpart = list.units[unitIndex].counterpart;
  list.uniques = deleteItem(list.uniques, list.uniques.indexOf(counterpart.counterpartId));
  delete list.units[unitIndex].counterpart;
  return consolidate(list);
}

function addUnit(list, unitId, stackSize = 1) {
  const unitCard = cards[unitId];
  let unitIndex = findUnitHashInList(list, unitId);

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
        let newUnit;
        [list, newUnit] = equipUnitUpgrade(list, unitIndex, upgradeIndex, unitCard.equip[i], true);
        unitIndex = findUnitHashInList(list, newUnit.unitObjectString);
      }
    }

    // find any upgrades with 0 cost that are the only eligible in slot
    // narrow down upgrade types we check to ones that CAN be a no-cost one-of, e.g. there's always more than 1 grenade type eligible
    let freeSoloUpgradeTypes = ["armament"];
    
    freeSoloUpgradeTypes.forEach(upgradeType => {
      let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);

      if(upgradeIndex > -1){
        let eligibleUpgrades = getEquippableUpgrades(list, upgradeType, unitId);
        if(eligibleUpgrades.validIds.length === 1){
          let freeSoloId = eligibleUpgrades.validIds[0];
          if(cards[freeSoloId].cost === 0){
            // If this card was already added via equip above, it'll break things if added again
            // (currently a futureproof w no known case)
            if(!(unitCard.equip?.find(u => u === freeSoloId))){
              let newUnit;
              [list, newUnit] = equipUnitUpgrade(list, unitIndex, upgradeIndex, freeSoloId, true);
              unitIndex = findUnitHashInList(list, newUnit.unitObjectString);
            }
          }
        }
      }

    });

    if (unitCard.command) {
      unitCard.command.forEach((commandId) => addCommand(list, commandId));
    }
  }
  list = consolidate(list);
  validateUpgrades(list, unitIndex);
  return list;
}

function incrementUnit(list, index) {
  list.units[index].count += 1;
  return consolidate(list);
}

function decrementUnit(list, index) {
  const unitObject = list.units[index];
  if (unitObject.count === 1) {
    list.unitObjectStrings = deleteItem(list.unitObjectStrings, index);
    list.units = deleteItem(list.units, index);
  } else {
    list.units[index].count -= 1;
  }
  return consolidate(list);
}

function addContingency(list, commandId) {
  list.contingencies.push(commandId);
  return list;
}

function removeContingency(list, contingencyIndex) {
  list.contingencies = deleteItem(list.contingencies, contingencyIndex);
  return list;
}

function addCommand(list, commandId) {
  list.commandCards.push(commandId);
  list.commandCards = sortCommandIds(list.commandCards);
  return list;
}

function removeCommand(list, commandIndex) {
  list.commandCards = deleteItem(list.commandCards, commandIndex);
  return list;
}

// TODO - this seems to get called too much in CC lifecycle
function sortCommandIds(cardIds) {
  return cardIds.sort((firstId, secondId) => {
    const firstType = Number.parseInt(cards[firstId].cardSubtype);
    const secondType = Number.parseInt(cards[secondId].cardSubtype);
    if (firstType > secondType) return 1;
    else if (firstType < secondType) return -1;
    return 0;
  });
}

function addBattle(list, type, id) {
  if (type === 'primary') {
    list.primaryCards.push(id);
  } else if (type === 'secondary') {
    list.secondaryCards.push(id);
  } else if (type === 'advantage') {
    list.advantageCards.push(id);
  }
  return list;
}

function removeBattle(list, type, index) {
  if (type === 'primary') {
    list.primaryCards = deleteItem(list.primaryCards, index);
  } else if (type === 'secondary') {
    list.secondaryCards = deleteItem(list.secondaryCards, index);
  } else if (type === 'advantage') {
    list.advantageCards = deleteItem(list.advantageCards, index);
  } else return;
  return list;
}

// TODO remove these routers in favor of calling the right action type directly from the click handler
function equipUpgrade(list, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll = false) {
  if (action === 'UNIT_UPGRADE') {
    let newUnit;
    [list, newUnit] = equipUnitUpgrade(list, unitIndex, upgradeIndex, upgradeId, isApplyToAll);
    unitIndex = findUnitHashInList(list, newUnit.unitObjectString);
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'UNIT_LOADOUT_UPGRADE') {
    list = equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  }

  list = consolidate(list);
  validateUpgrades(list, unitIndex);
  return list;
}

// TODO remove these routers in favor of calling the right action type directly from the click handler
function unequipUpgrade(list, action, unitIndex, upgradeIndex) {
  // const upgradeId = list.units[unitIndex].upgradesEquipped[upgradeIndex];
  if (action === 'UNIT_UPGRADE') {
    let newUnit;
    [list, newUnit] = unequipUnitUpgrade(list, unitIndex, upgradeIndex);
    unitIndex = findUnitHashInList(list, newUnit.unitObjectString);
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = unequipCounterpartUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'UNIT_LOADOUT_UPGRADE') {
    list = unequipLoadoutUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex);
  }

  list = consolidate(list);
  validateUpgrades(list, unitIndex);
  return list;
}

function unequipUnitUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  const upgradeId = unit.upgradesEquipped[upgradeIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.count = 1;
  newUnit.upgradesEquipped[upgradeIndex] = null;
  if (newUnit.loadoutUpgrades && newUnit.loadoutUpgrades[upgradeIndex]) {
    newUnit.loadoutUpgrades[upgradeIndex] = null;
  }
  newUnit.unitObjectString = getUnitHash(newUnit);
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [];
    newUnit.upgradesEquipped.pop();
  }
  let newUnitHashIndex = findUnitHashInList(list, newUnit.unitObjectString);
  if (newUnitHashIndex > -1) {
    list = incrementUnit(list, newUnitHashIndex);
  } else {
    list.units.splice(unitIndex + 1, 0, newUnit);
    list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
  }
  list = decrementUnit(list, unitIndex);
  return [list, newUnit];
}


export {
  addUnit,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  addCommand,
  removeCommand,
  addContingency,
  removeContingency,
  equipUpgrade,
  unequipUpgrade,
  equipCounterpartUpgrade,
  unequipCounterpartUpgrade,
  equipLoadoutUpgrade,
  unequipLoadoutUpgrade,
  incrementUnit,
  decrementUnit,
  countPoints, 

  // TODO - these are *probably* unneeded by importing classes via redundancy or tbd consolidate refactor; reassess
  sortCommandIds,
  consolidate
};
