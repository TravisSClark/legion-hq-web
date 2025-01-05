import _ from 'lodash';
import cards from 'constants/cards';

import interactions from 'components/cardInteractions';
import listTemplate from 'constants/listTemplate';
import battleForcesDict from 'constants/battleForcesDict';
import { findUnitIndexInList, getEquippableUpgrades } from './eligibleCardListGetter';

const battleTypes = ["primary", "secondary", "advantage"];

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
  // TODO see about moving these into validator
  list.hasFieldCommander = false;
  const cardNames = list.units.map(u=>cards[u.unitId].cardName);

  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];

    if (unitCard.keywords.includes('Contingencies')) hasContingencyKeyword = true;
    if (unitCard.keywords.includes('Field Commander')) list.hasFieldCommander = true;

    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.keywords.includes('Field Commander')) {
          list.hasFieldCommander = true;
        }
      }
    }
  }

  for (let i = list.commandCards.length - 1; i > -1 ; i--) {
    const { commander } = cards[list.commandCards[i]];
    if (commander && !cardNames.includes(commander)) {
      list = removeCommand(list, i);
    }
  }

  if (list.contingencies) {
    for (let i = list.contingencies.length - 1; i > -1; i--) {
      const { commander } = cards[list.contingencies[i]];
      if (commander && !cardNames.includes(commander)) {
        list = removeContingency(list, i);
      }
    }
  }
  if (!hasContingencyKeyword) list.contingencies = [];
  list.commandCards = sortCommandIds(list.commandCards);
  return countPoints(list);
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
  const upgradeCard = cards[upgradeId];

  let newIndex = unitIndex;
  const count = (isApplyToAll && !upgradeCard.isUnique) ? unit.count : 1;

  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;

  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [...upgradeCard.additionalUpgradeSlots];
    newUnit.upgradesEquipped.push(null);
  }

  newUnit.upgradesEquipped = sortUpgrades(newUnit);

  let newUnitIndex = findUnitIndexInList(newUnit, list); // <- TODO
  // If this unit already exists...
  if (newUnitIndex > -1) {
    list.units[newUnitIndex].count += count;
    list = decrementUnit(list, unitIndex, count);
  } else if (list.units[unitIndex].count == count) {
    list.units[unitIndex] = newUnit;
  } else {
    newUnit.count = count;
    list.units.splice(unitIndex + 1, 0, newUnit);
    newIndex = unitIndex + 1;
    list = decrementUnit(list, unitIndex, count);
  }

  return [list, newIndex];
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
  delete list.units[unitIndex].counterpart;
  return consolidate(list);
}

function addUnit(list, unitId, stackSize = 1) {
  const unitCard = cards[unitId];

  const newUnitObject = {
    unitId,
    count: unitCard.isUnique ? 1 : stackSize,
    totalUnitCost: unitCard.cost * stackSize,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };
  let unitIndex = findUnitIndexInList(newUnitObject, list);

  // TODO TODO - this  will break stuff again if a list can have 2 units with Contingencies
  // Should set list.contingencies=[] by default and let consolidate handle the show/no-show/emptying of it
  if (unitCard.keywords.includes('Contingencies')) {
    if (!list.contingencies) list.contingencies = [];
  }
  if (unitIndex > -1) {
    list.units[unitIndex].count += stackSize;
    list.units[unitIndex].totalUnitCost += unitCard.cost * stackSize;
  } else {
    for (let i = 0; i < unitCard.upgradeBar.length; i++) {
      newUnitObject.upgradesEquipped.push(null);
      if (unitCard.keywords.includes('Loadout')) {
        newUnitObject.loadoutUpgrades.push(null);
      }
    }
    list.units.push(newUnitObject);
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
        [list, unitIndex] = equipUnitUpgrade(list, unitIndex, upgradeIndex, unitCard.equip[i], true);
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
              [list] = equipUnitUpgrade(list, unitIndex, upgradeIndex, freeSoloId, true);
            }
          }
        }
      }

    });

    if (unitCard.command) {
      unitCard.command.forEach((commandId) => addCommand(list, commandId));
    }
  }
  return consolidate(list);
}

function incrementUnit(list, index, count = 1) {
  list.units[index].count += count;
  return consolidate(list);
}

function decrementUnit(list, index, count = 1) {
  const unitObject = list.units[index];
  if (unitObject.count <= count) {
    list.units.splice(index, 1);
  } else {
    list.units[index].count -= count;
  }
  return consolidate(list);
}

function addContingency(list, commandId) {
  list.contingencies.push(commandId);
  return list;
}

function removeContingency(list, contingencyIndex) {
  list.contingencies.splice(contingencyIndex, 1);
  return list;
}

function addCommand(list, commandId) {
  list.commandCards.push(commandId);
  list.commandCards = sortCommandIds(list.commandCards);
  return list;
}

function removeCommand(list, commandIndex) {
  list.commandCards.splice(commandIndex, 1);
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

function getBattleArray(list, type){

  let typeIndex = battleTypes.findIndex((t)=>t===type);
  if(typeIndex != -1){
    return list[battleTypes[typeIndex]+"Cards"];
  } else{
    console.warn("Unrecognized battle type: " + type);
    return null;
  }
}

function addBattle(list, type, id) {

  let currentCards = getBattleArray(list, type);
  if(!currentCards) return;

  let nextType = type;
  let typeIndex = battleTypes.findIndex((t)=>t===type);

  currentCards.push(id);

  // intentionally go undef here and use it above, rather than messing w wraparound
  if(currentCards.length >= 3)
      nextType = battleTypes[typeIndex + 1];

  return {list, nextType};
}

function removeBattle(list, type, index) {

  let currentCards = getBattleArray(list, type);
  if(!currentCards) return list;

  currentCards.splice(index, 1);

  return list;
}

// TODO remove these routers in favor of calling the right action type directly from the click handler
function equipUpgrade(list, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll = false) {
  if (action === 'UNIT_UPGRADE') {
    let newIndex;
    [list, newIndex] = equipUnitUpgrade(list, unitIndex, upgradeIndex, upgradeId, isApplyToAll);
    unitIndex = newIndex;
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'UNIT_LOADOUT_UPGRADE') {
    list = equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  }

  list = consolidate(list);
  return {list, unitIndex};
}

// TODO remove these routers in favor of calling the right action type directly from the click handler
function unequipUpgrade(list, action, unitIndex, upgradeIndex) {
  // const upgradeId = list.units[unitIndex].upgradesEquipped[upgradeIndex];
  if (action === 'UNIT_UPGRADE') {
    list = unequipUnitUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = unequipCounterpartUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'UNIT_LOADOUT_UPGRADE') {
    list = unequipLoadoutUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex);
  }

  return consolidate(list);
}

// Returns a sorted list of upgrades so we can consolidate identical stacks regardless of add order
function sortUpgrades(unit){
  const unitCard = cards[unit.unitId];
  const {upgradesEquipped} = unit;

  const upgradeBar = unitCard.upgradeBar.concat(unit.additionalUpgradeSlots);
  const sortedUpgrades = Array(upgradeBar.length).fill(null);
  const upgradesByType = {};

  // get all the cards, then make an object {comms:[{id:'aa', cardName:'Comms Jammer'...}...], armament:[...]...}
  for( let i=0; i<upgradesEquipped.length; i++){

    if(upgradesEquipped[i]){
      let upgradeCard = cards[upgradesEquipped[i]];
      let upgradeTypeList = upgradesByType[upgradeCard.cardSubtype];
      if(!upgradeTypeList){
        upgradesByType[upgradeCard.cardSubtype] = [];
        upgradeTypeList = upgradesByType[upgradeCard.cardSubtype];
      }

      for(let j=0; j <= upgradeTypeList.length; j++)
      {
        // Sort these BACKWARDS abc so we can just pop() the arrays below
        // TODO make this check for unique(?) so that those show up first
        if(j==upgradeTypeList.length || upgradeCard.cardName > upgradeTypeList[j].cardName)
        {
          upgradeTypeList.splice(j, 0, upgradeCard);
          break;
        }
      }
    }
  }

  // Iterate our upgradeBar, if upgradesByType has a match, add it in! (and with uBT being sorted already, now bar is sorted!)
  for(let i=0; i<upgradeBar.length; i++){
    let sortedPool = upgradesByType[upgradeBar[i]];
    if(sortedPool && sortedPool.length > 0){
      sortedUpgrades[i] = sortedPool.pop().id
    }
  }

  // Typical total runtime of ~2N, gets worse with repeat upgrade types, but even that's like ~(NlogN + N) worst-case. 
  return sortedUpgrades;
}

function unequipUnitUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  const upgradeId = unit.upgradesEquipped[upgradeIndex];
  const upgradeCard = cards[upgradeId];

  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.count = 1;
  newUnit.upgradesEquipped[upgradeIndex] = null;

  if (newUnit.loadoutUpgrades && newUnit.loadoutUpgrades.length > 0) {
    newUnit.loadoutUpgrades[upgradeIndex] = null;
  }
  
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [];
    newUnit.upgradesEquipped.pop();
  }

  newUnit.upgradesEquipped = sortUpgrades(newUnit);

  let newUnitHashIndex = findUnitIndexInList(newUnit, list);

  if (newUnitHashIndex > -1) {
    list = incrementUnit(list, newUnitHashIndex);
  } else {
    list.units.splice(unitIndex + 1, 0, newUnit);
  }
  list = decrementUnit(list, unitIndex);

  return list;
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
