
import legionModes from 'constants/legionModes';
import { consolidate } from './listOperations';
import _ from 'lodash';
import listTemplate from 'constants/listTemplate';
import battleForcesDict from 'constants/battleForcesDict';
import cards from 'constants/cards';
import { findUnitIndexInList, getListUniques, unitHasUniques } from './eligibleCardListGetter';


// Functions which act upon lists wholesale, rather than tweaking data inside a list

function mergeLists(primaryList, secondaryList) {
  let unitsToAdd = [];

  let primaryUniques = getListUniques(primaryList);

  for (let i = 0; i < secondaryList.units.length; i++) {
    const unit = secondaryList.units[i];
    if (unitHasUniques(unit)) {
      if (primaryUniques.includes(unit.unitId)) continue;
      let isValid = true;
      unit.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId && primaryUniques.includes(upgradeId)) isValid = false;
      });
      if (!isValid) continue;
      unitsToAdd.push(unit);
    } else if (findUnitIndexInList(unit, primaryList) > -1) {
      primaryList.units[i].count += unit.count;
    } else {
      unitsToAdd.push(unit);
    }
  }
  unitsToAdd.forEach(unitToAdd => primaryList.units.push(unitToAdd));
  return consolidate(primaryList);
}


function processUnitSegment(segment) {
  const unitSegment = segment.slice(0, 3);
  let loadoutSegment; let upgradeSegment = segment.slice(3);
  if (upgradeSegment.includes('_')) {
    loadoutSegment = upgradeSegment.split('_')[1];
    upgradeSegment = upgradeSegment.split('_')[0]
  }
  const unitCount = Number.parseInt(unitSegment.charAt(0));
  const unitId = unitSegment.charAt(1) + unitSegment.charAt(2);
  const unitCard = cards[unitId];
  const newUnit = {
    unitId,
    count: unitCount,
    totalUnitCost: unitCard.cost * unitCount,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };
  let upgradeIndex = 0;
  for (let i = 0; i < upgradeSegment.length; i++) {
    if (upgradeSegment.charAt(i) === '0') {
      newUnit.upgradesEquipped[upgradeIndex] = null;
      upgradeIndex++;
    } else {
      const upgradeId = upgradeSegment.charAt(i) + upgradeSegment.charAt(i + 1);
      const upgradeCard = cards[upgradeId];
      newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
      if ('additionalUpgradeSlots' in upgradeCard) {
        newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
        newUnit.upgradesEquipped.push(null);
      }
      i++;
      upgradeIndex++;
    }
  }
  let loadoutIndex = 0;
  for (let i = 0; loadoutSegment && i < loadoutSegment.length; i++) {
    if (loadoutSegment.charAt(i) === '0') {
      newUnit.loadoutUpgrades[loadoutIndex] = null;
      loadoutIndex++;
    } else {
      const upgradeId = loadoutSegment.charAt(i) + loadoutSegment.charAt(i + 1);
      newUnit.loadoutUpgrades[loadoutIndex] = upgradeId;
      i++;
      loadoutIndex++;
    }
  }
  return newUnit;
}

function segmentToUnitObject(unitIndex, segment) {
  let unit; let counterpart;
  if (segment.includes('+')) {
    unit = processUnitSegment(segment.split('+')[0]);
    counterpart = processUnitSegment(segment.split('+')[1]);
    const {
      unitId,
      totalUnitCost,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    } = counterpart;
    unit.counterpart = {
      count: 1,
      counterpartId: unitId,
      totalUnitCost,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    };
  } else unit = processUnitSegment(segment);
  return unit;
}

function convertHashToList(faction, url) {
  let list = JSON.parse(JSON.stringify(listTemplate));
  list.faction = faction;
  list.contingencies = [];
  let segments;
  if (url.includes(':')) {
    segments = url.split(':');

    let idx=0;
    let points = parseInt(segments[idx]);

    if(points){
      idx++;
      let mode = Object.getOwnPropertyNames(legionModes).find(n => legionModes[n].maxPoints === points);
      if(mode){
        list.mode = mode;
      }
    }

    let bfCode = Object.getOwnPropertyNames(battleForcesDict).find(k=>battleForcesDict[k].linkId === segments[idx]);
    if(bfCode){
      list.battleForce = bfCode;
    }

    segments = segments[segments.length-1].split(',');
  } else {
    list.battleForce = '';
    segments = url.split(',');
  }
  const unitSegments = [];
  const otherSegments = [];
  try {
    let oldCounterparts = ['lw', 'ji', 'jj'];
    segments.forEach(segment => {
      // TODO - this is *probably* defunct, unless there's a gameuplink archive out there
      let hasOldCounterpart = false;
      oldCounterparts.forEach(id => {
        if (segment === `1${id}`) hasOldCounterpart = true;
      });
      if (hasOldCounterpart) return;
      else if (segment.length > 2) unitSegments.push(segment);
      else otherSegments.push(segment);
    });
  } catch (e) {
    return false;
  }
  try {
    list.units = unitSegments.map((segment, i) => segmentToUnitObject(i, segment));
  } catch (e) {
    return false;
  }
  try {
    let commandCardSlots = 7;
    otherSegments.forEach(cardId => {
      commandCardSlots -=1;
      if (cardId === '') return;
      const card = cards[cardId];
      if (card.cardType === 'command') {
        if (commandCardSlots > 0) {
          list.commandCards.push(cardId);
        } else {
          list.contingencies.push(cardId);
        }
      } else if (card.cardSubtype === 'primary') {
        list.primaryCards.push(cardId);
      } else if (card.cardSubtype === 'secondary') {
        list.secondaryCards.push(cardId);
      } else if (card.cardSubtype === 'advantage') {
        list.advantageCards.push(cardId);
      }
    });
  } catch (e) {
    // console.log(e);
    return false;
  }
  if (list.faction === 'mercenary') list.battleForce = 'Shadow Collective';
  if (list.faction === 'separatists' && list.battleForce === 'Echo Base Defenders') {
    list.battleForce = 'Separatist Invasion';
  }
  return consolidate(list);
}

function rehashList(list) {
  const unitObjectStrings = [];
  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];
    let unitObjectString = unitCard.id;
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        unitObjectString += upgradeId;
      }
    }
    unitObjectStrings.push(unitObjectString);
  }
  return unitObjectStrings;
}

function changeListTitle(list, title) {
  return { ...list, title: title.substring(0, 30) };
}

function setListMode(list, mode) {
  if (legionModes[mode]) {
    list.mode = mode;
  }
  return list;
}

export{
  mergeLists,
  convertHashToList,
  rehashList,
  changeListTitle,
  setListMode
}