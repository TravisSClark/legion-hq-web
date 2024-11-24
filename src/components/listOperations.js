import _ from 'lodash';
import cards, {cardsIdsByType as cardIdsByType} from 'constants/cards';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import interactions from 'components/cardInteractions';
import listTemplate from 'constants/listTemplate';
import battleForcesDict from 'constants/battleForcesDict';

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
  list.unitObjectStrings = unitObjectStrings;
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

function deleteItem(items, i) {
  return items.slice(0, i).concat(items.slice(i + 1, items.length))
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
  return consolidate(list);
}

function unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  if (counterpart.loadoutUpgrades[upgradeIndex]) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  unit.loadoutUpgrades[upgradeIndex] = upgradeId;
  return consolidate(list);
}

function unequipLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  if (unit.loadoutUpgrades[upgradeIndex]) {
    unit.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function equipUpgradeToAll(list, unitIndex, upgradeIndex, upgradeId) {
  // applying upgrade to multiple units
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  const newUnitHash = getUnitHash(newUnit);
  newUnit.unitObjectString = newUnitHash;
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [...upgradeCard.additionalUpgradeSlots];
    newUnit.upgradesEquipped.push(null);
  }
  if (list.unitObjectStrings.includes(newUnitHash)) {
    list.units[list.unitObjectStrings.indexOf(newUnitHash)].count += unit.count;
    list.units = deleteItem(list.units, unitIndex);
  } else {
    list.units[unitIndex] = newUnit;
    list.unitObjectStrings[unitIndex] = newUnitHash;
  }
  return consolidate(list);
}

function equipUpgradeToOne(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.count = 1;
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  newUnit.unitObjectString = getUnitHash(newUnit);
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [...upgradeCard.additionalUpgradeSlots];
    newUnit.upgradesEquipped.push(null);
  }
  const newUnitHashIndex = findUnitHashInList(list, newUnit.unitObjectString);
  if (newUnitHashIndex > -1) {
    list = incrementUnit(list, newUnitHashIndex);
  } else {
    list.units.splice(unitIndex + 1, 0, newUnit);
    list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
  }
  list = decrementUnit(list, unitIndex);

  return consolidate(list);
}

function equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[upgradeId];
  counterpart.upgradesEquipped[upgradeIndex] = upgradeId;
  counterpart.totalUnitCost += upgradeCard.cost;
  return consolidate(list);
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
  return consolidate(list);
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

function restoreUnit(list, index) {
  let unit = list.units[index];
  let perUnitCost = unit.totalUnitCost / unit.count;

  const killedFiltered = list.killedUnits.filter(function(item){
    return item === unit.unitId + unit.count;
  })

  if(killedFiltered.length !== 0 && killedFiltered.length <= unit.totalUnitCost){
    killedFiltered.pop();
    const remainingUnits = list.killedUnits.filter(function(item){
      return item !== unit.unitId + perUnitCost;
    });

    list.killedUnits = killedFiltered.concat(remainingUnits);
    list.killPoints -= perUnitCost;
  }

  return list;
}

function killUnit(list, index) {
  let unit = list.units[index];
  let perUnitCost = unit.totalUnitCost / unit.count;

  const killedFiltered = list.killedUnits.filter(function(item){
    return item === unit.unitId + perUnitCost;
  })

  if(killedFiltered.length < unit.count) {
    list.killedUnits.push(unit.unitId + unit.count);
    list.killPoints += perUnitCost;
  }

  return list;
}

function getEligibleUnitsToAdd(list, rank, userSettings) {
  const validUnitIds = [];
  const cardsById = cardIdsByType.unit; // Object.keys(cards);
  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];

    if (card.rank !== rank) continue;


    if(!userSettings.showStormTide && (id === "AA" || id === "AK")){
      continue;
    }
    // TODO - idk stormtide, but it seems odd that the 0pt one is the one shown in the mode, and the 60pt one is the one outside it
    else if (userSettings.showStormTide && (list.mode.includes('storm tide') && id === 'AA')) {
      continue;
    } else if (userSettings.showStormTide && (!list.mode.includes('storm tide') && id === 'AK')) {
      continue;
    }

    if(!list.battleForce)
    {
      if (!list.faction.includes(card.faction) && !card.affiliations) continue;
      if (!list.faction.includes(card.faction) && card.affiliations && !card.affiliations.includes(list.faction)) continue;
    } else {
      if (!battleForcesDict[list.battleForce][rank].includes(id)) continue;
    }
    if (list.uniques.includes(id)) continue;
    if (list.commanders.includes(card.cardName)) continue;
    if (card.specialIssue && card.specialIssue !== list.battleForce)continue;

    if (card.detachment) {
      for (let i = 0; i < list.units.length; i++) {
        const unit = list.units[i];
        if (unit.unitId === card.detachment) {
          validUnitIds.push(id);
          break;
        }
      }
    } else {
      validUnitIds.push(id);
    }
  }
  return sortIds(validUnitIds);
}

/** 
 * Items in the requirements array or subarrays must be one of the following:
 * 
 * A SINGLE lodash match object (shortcut so we don't need to lead with AND for a single req or etc)
 * 
 * 'NOT' followed by a lodash object to be negated
 * 'AND' followed by multiple lodash objects and/or more subarrays as && 
 * 'OR' followed by lodash objects and/or more subarrays as ||
 * 
 * ... else return true;
 * 
 * e.g. one of the most complicated requirements[] is for Echo, ARC Marksman:
 * "requirements": [
            "AND",
            {
                "cardSubtype": "clone trooper"
            },
            [
                "OR",
                {
                    "rank": "corps"
                },
                {
                    "rank": "special"
                }
            ]
        ],
 * 
 * 
 */
function isRequirementsMet(requirements, unitCard) {
  const operator = requirements[0];
  if (operator instanceof Object) {
      return _.isMatch(unitCard, operator);
  }else if (operator === 'NOT') {
    return !_.isMatch(unitCard, requirements[1]);
  }
  else if(operator === 'AND'){
    for(let i=1; i< requirements.length; i++){
      if (requirements[i] instanceof Array){
        if(!isRequirementsMet(requirements[i], unitCard))
          return false;
      } else if (requirements[i] instanceof Object){
        if(!_.isMatch(unitCard, requirements[i]))
          return false;
      }
    }
    return true;
  }
  else if (operator === 'OR') {
    for(let i=1; i< requirements.length; i++){
      if (requirements[i] instanceof Array && isRequirementsMet(requirements[i], unitCard)){
        return true;
      } else if (requirements[i] instanceof Object && _.isMatch(unitCard, requirements[i])){
        return true;
      }
    }
    return false;
  } 
  else {
    // Empty array of requirements
    return true;
  }
}

function getEquippableLoadoutUpgrades(
  list, upgradeType, id, upgradeIndex, upgradesEquipped, additionalUpgradeSlots
) {
  const upgrades = getEquippableUpgrades(
    list, upgradeType, id, upgradesEquipped, additionalUpgradeSlots
  );
  const validIds = upgrades.validIds;
  const invalidIds = upgrades.invalidIds;
  const validLoadoutUpgradeIds = [];
  const invalidLoadoutUpgradeIds = [...invalidIds];
  const parentUpgradeCard = cards[upgradesEquipped[upgradeIndex]];
  for (let i = 0; i < validIds.length; i++) {
    const upgradeId = validIds[i]
    const upgradeCard = cards[upgradeId];
    if (
      upgradeCard.cost <= parentUpgradeCard.cost &&
      upgradeId !== parentUpgradeCard.id
    ) {
      validLoadoutUpgradeIds.push(upgradeCard.id);
    } else {
      invalidLoadoutUpgradeIds.push(upgradeCard.id);
    }
  }
  return {
    validIds: validLoadoutUpgradeIds,
    invalidIds: invalidLoadoutUpgradeIds
  };
}

function addContingency(list, commandId) {
  list.contingencies.push(commandId);
  return list;
}

function addCommand(list, commandId) {
  list.commandCards.push(commandId);
  list.commandCards = sortCommandIds(list.commandCards);
  return list;
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

function removeContingency(list, contingencyIndex) {
  list.contingencies = deleteItem(list.contingencies, contingencyIndex);
  return list;
}

function removeCommand(list, commandIndex) {
  list.commandCards = deleteItem(list.commandCards, commandIndex);
  return list;
}

function sortCommandIds(cardIds) {
  return cardIds.sort((firstId, secondId) => {
    const firstType = Number.parseInt(cards[firstId].cardSubtype);
    const secondType = Number.parseInt(cards[secondId].cardSubtype);
    if (firstType > secondType) return 1;
    else if (firstType < secondType) return -1;
    return 0;
  });
}

function getEligibleBattlesToAdd(list, type) {
  const validIds = [];
  const invalidIds = [];
  const scenarioMissionIds = ['Df', 'Oe'];
  // const cardsById = cardIdsByType.battle; //Object.keys(cards);

  let currentCards;
  if (type === 'primary') currentCards = list.primaryCards;
  else if (type === 'secondary') currentCards = list.secondaryCards;
  else if (type === 'advantage') currentCards = list.advantageCards;
  else return;
  cardIdsByType['battle'].forEach(id => {
    const card = cards[id];
    // if (card.cardType !== 'battle') return;
    if (card.cardSubtype !== type) return;
    if (currentCards.includes(id)) return;
    if (scenarioMissionIds.includes(id)) return;
    if (currentCards.length > 3) invalidIds.push(id);
    if (list.mode === '500-point mode') {
      if (card.keywords.includes('Skirmish')) validIds.push(id);
      else invalidIds.push(id);
    } else {
      if (card.keywords.includes('Skirmish')) invalidIds.push(id);
      else validIds.push(id);
    }
  });
  return { validIds, invalidIds };
}

function getEligibleContingenciesToAdd(list) {
if (!list.contingencies) list.contingencies = [];
const validCommandIds = [];
const invalidCommandIds = [];
// const cardsById = cardIdsByType.command; // Object.keys(cards);

let numContingencies = 0;
list.units.forEach((unit) => {
  const unitCard = cards[unit.unitId];
  if (unitCard.contingencies && unitCard.contingencies > 0)
    numContingencies += unitCard.contingencies
});
cardIdsByType['command'].forEach(id => {
  const card = cards[id];
  // if (card.cardType !== 'command') return;
  if (list.commandCards.includes(id)) return;
  if (list.contingencies.includes(id)) return;
  if (!list.faction.includes(card.faction)) return;
  if (id === 'aa') return;
  if (id === 'jl' || id === 'ka' || id ==='kb') return;
  if (
    list.contingencies.length >= numContingencies ||
    (card.commander && !list.commanders.includes(card.commander))
  ) {
    invalidCommandIds.push(id);
    return;
  }
  validCommandIds.push(id);
});
return {
  validIds: sortCommandIds(validCommandIds),
  invalidIds: sortCommandIds(invalidCommandIds)
};
}

function getEligibleCommandsToAdd(list) {
  const stormTideCommands = {
    '500-point mode': ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AH', 'AI', 'AJ'],
    'standard mode': ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AH', 'AI', 'AJ'],
    'grand army mode': ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AH', 'AI', 'AJ'],
    'storm tide: infantry': ['AC', 'AE', 'AG'],
    'storm tide: armored': ['AB', 'AF', 'AJ'],
    'storm tide: special forces': ['AD', 'AH', 'AI']
  };

  const validCommandIds = [];
  const invalidCommandIds = [];
  // const cardsById = cardIdsByType.command; // Object.keys(cards);

  const pipCounts = { '1': 0, '2': 0, '3': 0 };
  list.commandCards.forEach(id => {
    const commandCard = cards[id];
    pipCounts[commandCard.cardSubtype] += 1;
  });
  cardIdsByType['command'].forEach(id => {
    const card = cards[id];
    // if (card.cardType !== 'command') return;
    if (list.commandCards.includes(id)) return;
    if (list.contingencies && list.contingencies.includes(id)) return;

    if (
      stormTideCommands[list.mode] &&
      stormTideCommands[list.mode].length === 3 &&
      stormTideCommands[list.mode].includes(id)
    ) {
      validCommandIds.push(id);
      return;
    } else if (
      stormTideCommands[list.mode] &&
      stormTideCommands[list.mode].length === 3 &&
      stormTideCommands['standard mode'].includes(id)
    ) {
      invalidCommandIds.push(id);
      return;
    }

    if (!list.faction.includes(card.faction)) return;
    if (id === 'aa') return; // Standing Orders
    if (id === 'jl' || id === 'ka' || id === 'kb') return; // Duplicates
    if ((id === 'tv' || id === 'ud') && !list.uniques.includes('tn')) return; // grogu's command card

    if (card.battleForce && card.battleForce !== list.battleForce) {
      return;
    }
    if (
      pipCounts[card.cardSubtype] > 1 ||
      (card.commander && !list.commanders.includes(card.commander))
    ) {
      invalidCommandIds.push(id);
      return;
    }
    validCommandIds.push(id);
  });
  return {
    validIds: sortCommandIds(validCommandIds),
    invalidIds: sortCommandIds(invalidCommandIds)
  };
}

// TODO: wtf is additionalUpgradeSlots showing up unused?
function getEquippableUpgrades(
  list, upgradeType, unitId, upgradesEquipped, additionalUpgradeSlots
) {
  const impRemnantUpgrades = ['ej', 'ek', 'fv', 'iy', 'fu', 'gm', 'gl', 'em', 'en', 'ja'];
  const validUpgradeIds = [];
  const invalidUpgradeIds = [];
  // const cardsById = cardIdsByType.upgrade; // Object.keys(cards);

  if (!unitId) return { validUpgradeIds: [], invalidUpgradeIds: [] };
  const unitCard = cards[unitId];
  for (let i = 0; i < cardIdsByType['upgrade'].length; i++) {
    const id = cardIdsByType['upgrade'][i];
    const card = cards[id];

    if (card.cardSubtype !== upgradeType) continue;
    if (card.faction && card.faction !== '' && list.faction !== card.faction) continue;

    let uniqueEntries = list.uniques.filter(i=>i === id);
    if(card.uniqueCount){  
      if(uniqueEntries.length >= card.uniqueCount) continue;
    }
    else if (list.uniques.includes(id)) continue;
    if (upgradesEquipped.includes(id)) continue;
    if (card.isUnique && list.battleForce && !battleForcesDict[list.battleForce].allowedUniqueUpgrades.includes(id)) continue;

    // dynamically add the force affinity
    const { faction } = unitCard;

    // TODO - not a big fan of modifying unitCard data - leads to unexpected stickiness esp with old points
    // TODO - this needs to be determined based on faction/BF alone... not this
    unitCard['light side'] = unitCard['dark side'] = false;
    if (faction === 'rebels' || faction === 'republic') unitCard['light side'] = true;
    // TODO this line breaks stuff if we get a light-side merc bf
    else if (faction === 'separatists' || faction === 'empire' || faction === 'mercenary') unitCard['dark side'] = true;

    if (
      unitCard.id in interactions.eligibility &&
      interactions.eligibility[unitCard.id].conditionFunction(card)
    ) {
      const interaction = interactions.eligibility[unitCard.id];
      if (interaction.resultFunction(card)) {
        validUpgradeIds.push(id);
      }
    } else if (list.battleForce === 'Imperial Remnant' && card.cardSubtype === 'heavy weapon') {

      if (unitCard.cardSubtype !== 'droid trooper' && unitCard.cardSubtype.includes('trooper')) {
        if (impRemnantUpgrades.includes(id)) validUpgradeIds.push(id);
        else if (isRequirementsMet(card.requirements, unitCard)) validUpgradeIds.push(id)
        else invalidUpgradeIds.push(id);
      } else if (isRequirementsMet(card.requirements, unitCard)) validUpgradeIds.push(id);
      else invalidUpgradeIds.push(id);
    } else if (isRequirementsMet(card.requirements, unitCard)) {
      validUpgradeIds.push(id);
    } else {
      invalidUpgradeIds.push(id);
    }
  }
  return {
    validIds: sortIds(validUpgradeIds),
    invalidIds: sortIds(invalidUpgradeIds)
  };
}

function sortIds(ids) {
  const sortedIds = ids.sort((a, b) => {
    const cardA = cards[a];
    const cardB = cards[b];
    const nameA = cardA.displayName ? cardA.displayName : cardA.cardName;
    const nameB = cardB.displayName ? cardB.displayName : cardB.cardName;
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });
  return sortedIds;
}

/**
 * Check validation ONLY for things pertaining to this unit's currently equipped upgrades. 
 * Generally, should *probably* not do things that have a further reach than upgrade bar itself (I think)
 * e.g. adding Field Commander or Maul's Darksaber for list validation
 * @param {} list 
 * @param {*} unitIndex 
 * @param {*} upgradeIndex 
 * @param {*} upgradeId 
 */
function validateUpgrades(list, unitIndex){
  const unit = list.units[unitIndex];
  const card = cards[unit.unitId];

  unit.validationIssues = [];
  
  // Validation for each of the 'must equip' keywords (that I know of)

  if(card.flexResponse){
    let heavyCount = 0;
    unit.upgradesEquipped.forEach((id)=>{
      if(id === null)
        return;
      const equipCard = cards[id];
      if(equipCard.cardSubtype === 'heavy weapon'){
        heavyCount++;
      }
    });
    if(heavyCount < card.flexResponse){
      let cardName = card.displayName ? card.displayName : card.cardName;
      unit.validationIssues.push( { level:2, text: cardName + " needs " + card.flexResponse + " Heavy Weapon upgrades (Flexible Response)" });
    }
  }

  // Equip
  if (card.equip){
    card.equip.forEach((equipReq)=>{
      const equipCard = cards[equipReq];
      if(!unit.upgradesEquipped.includes(equipReq)){
        let cardName = card.displayName ? card.displayName : card.cardName;
        unit.validationIssues.push( { level:2, text: cardName + " is missing " + equipCard.cardName + " (Equip)"});
      }
    });
  }

  if(card.keywords.includes("Heavy Weapon Team")){
    let hasHeavy = false;
    unit.upgradesEquipped.forEach((id)=>{
      if(id === null)
        return;
      const equipCard = cards[id];
      if(equipCard.cardSubtype === 'heavy weapon'){
        hasHeavy = true;
      }
    });
    if(!hasHeavy){
      let cardName = card.displayName ? card.displayName : card.cardName;
      unit.validationIssues.push( { level:2, text: cardName + " is missing a Heavy Weapon upgrade (Heavy Weapon Team)" });
    }
  }

  if(card.keywords.includes("Programmed")){
    let hasProto = false;
    unit.upgradesEquipped.forEach((id)=>{
      if(id === null)
        return;
      const equipCard = cards[id];
      if(equipCard.cardSubtype === 'protocol'){
        hasProto = true;
      }
    });
    if(!hasProto){
      unit.validationIssues.push( { level:2, text: card.cardName + " is missing a Programming upgrade (Programmed)" });
    }
  }

}

function equipUpgrade(list, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll = false) {
  if (action === 'UNIT_UPGRADE') {
    if (isApplyToAll) {
      list = equipUpgradeToAll(list, unitIndex, upgradeIndex, upgradeId);
    } else {
      list = equipUpgradeToOne(list, unitIndex, upgradeIndex, upgradeId);
    }
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'LOADOUT_UPGRADE') {
    list = equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  }

  validateUpgrades(list, unitIndex);

  return list;
}

function unequipUpgrade(list, action, unitIndex, upgradeIndex) {
  
  // const upgradeId = list.units[unitIndex].upgradesEquipped[upgradeIndex];

  if (action === 'UNIT_UPGRADE') {
    function unequip(list, unitIndex, upgradeIndex) {
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
      const newUnitHashIndex = findUnitHashInList(list, newUnit.unitObjectString);
      if (newUnitHashIndex > -1) {
        list = incrementUnit(list, newUnitHashIndex);
      } else {
        list.units.splice(unitIndex + 1, 0, newUnit);
        list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
      }
      list = decrementUnit(list, unitIndex);
      return consolidate(list);
    }
    list = unequip(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = unequipCounterpartUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'LOADOUT_UPGRADE') {
    list = unequipLoadoutUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex);
  }

  validateUpgrades(list, unitIndex);


  return list;
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
    hasUniques: unitCard.isUnique,
    totalUnitCost: unitCard.cost * unitCount,
    unitObjectString: unitId,
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
      newUnit.unitObjectString += upgradeId;
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
      // const upgradeCard = cards[upgradeId];
      // if ('additionalUpgradeSlots' in upgradeCard) {
      //   newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
      //   newUnit.loadoutUpgrades.push(null);
      // }
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
      hasUniques,
      totalUnitCost,
      unitObjectString,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    } = counterpart;
    unit.counterpart = {
      count: 1,
      counterpartId: unitId,
      hasUniques,
      totalUnitCost,
      unitObjectString,
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
    list.units.forEach(unit => {
      list.unitObjectStrings.push(unit.unitObjectString);
    });
  } catch (e) {
    return false;
  }
  try {
    let commandCardSlots = 7;
    otherSegments.forEach(cardId => {
      commandCardSlots -=1;
      if (cardId === '') return;
      // if (cardId.includes('*')) {}
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

function mergeLists(primaryList, secondaryList) {
  let unitsToAdd = [];
  for (let i = 0; i < secondaryList.units.length; i++) {
    const unit = secondaryList.units[i];
    if (unit.hasUniques) {
      if (primaryList.uniques.includes(unit.unitId)) continue;
      let isValid = true;
      unit.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId && primaryList.uniques.includes(upgradeId)) isValid = false;
      });
      if (!isValid) continue;
      unitsToAdd.push(unit);
    } else if (primaryList.unitObjectStrings.includes(unit.unitObjectString)) {
      primaryList.units[i].count += unit.count;
    } else {
      unitsToAdd.push(unit);
    }
  }
  unitsToAdd.forEach(unitToAdd => primaryList.units.push(unitToAdd));
  return consolidate(primaryList);
}

// All (most...) battleForce-specific stuff (should) goes here
function battleForceValidation(currentList, unitCounts){

  const validationIssues = [];
  // TODO is a switch against the code standard? ;)
  // Should destroy this in favor of adding a 'rule' to apply for BzF in the object, e.g.
  // rules:[... {type:'unitLimit', min:0, max:1, types:['ay', 'sr']}]

  if(battleForcesDict[currentList.battleForce]?.rules?.take2NonEwokRebs){
    let rebelsCount = currentList.units.reduce((rebelsCount, unit)=>{
      const card = cards[unit.unitId];
      if (card.faction === "rebels")
        return rebelsCount + unit.count;
      else return rebelsCount;
    }, 0);

    if(rebelsCount < 2){
      validationIssues.push({level:2, text:"List must have at least 2 non-Ewok REBEL units."});
    }
  }

  if( battleForcesDict[currentList.battleForce]?.rules?.unitLimits){
    let unitLimits = battleForcesDict[currentList.battleForce].rules.unitLimits;

    unitLimits.forEach( limit =>{
      let unitCount = limit.ids.reduce((count, id)=>{
        return count + (unitCounts[id] ? unitCounts[id] : 0)}, 0);
      
      if(unitCount < limit.count[0] || unitCount > limit.count[1]){
        let name = limit.ids.map(id=> cards[id].displayName ? cards[id].displayName : cards[id].cardName).join(" OR ");
        if(limit.count[0] === 0)
          validationIssues.push({level:2, text:"Limit " + limit.count[1] + " " + name.toUpperCase()});
        else
          validationIssues.push({level:2, text:"You must have " + limit.count[0] + " - " + limit.count[1] + " " + name.toUpperCase()});
      }
    });
  }  

  if( battleForcesDict[currentList.battleForce]?.rules?.minOneOfEachCorps){
    let corpsCounts = battleForcesDict[currentList.battleForce].corps.map(
      id=>{return{id, count:(unitCounts[id] ? unitCounts[id] : 0)}}
    )

    if(battleForcesDict[currentList.battleForce]?.rules?.buildsAsCorps){
      let moreCorps = battleForcesDict[currentList.battleForce]?.rules?.buildsAsCorps.map(
        id=>{return{id, count:(unitCounts[id] ? unitCounts[id] : 0)}}
      );
      corpsCounts = corpsCounts.concat(moreCorps);
    }

    let hasNone = false;
    let hasMoreThanOne =false;
    corpsCounts.forEach(c=>{
      if(c.count === 0){
        hasNone = true;
      } else if(c.count > 1){
        hasMoreThanOne = true;
      }
    });

    if(hasNone && hasMoreThanOne){
      validationIssues.push({level:2, text:"You must have at least one of each Corps type before adding additional ones"});
    }
  }  
  
  
  return validationIssues;
}

function mercValidation(currentList, rank, mercs){
  const validationIssues = [];

  let hasAoc = false;
  let aocRanks = []; 

  let mercLimits = { commander:1, operative:1, corps:2, special:1, heavy:1, support:1 }

  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId]

    // Check for Allies of Convenience
    if(!hasAoc)
    {
      // check for AoC keyword or Underworlds Connection card
      hasAoc = card.keywords.find(k => k === "Allies of Convenience") || unit.upgradesEquipped.find(c => c !== null && c === 'rf');
    }
  });

  if(!battleForcesDict[currentList.battleForce]?.rules?.countMercs){
    Object.keys(ranks).forEach(t =>{

      if(mercs[t] > mercLimits[t]){
        if(!hasAoc || mercs[t] > mercLimits[t] + 1){
          validationIssues.push({level:2, text:"Too many MERCENARY " + t.toUpperCase() + " units! (maximum " + (hasAoc ? mercLimits[t]+1:mercLimits[t]) + ")"});
        } 
        aocRanks.push(t);
      }
      if(aocRanks.length > 1){
        validationIssues.push({level:2, text:"Allies of Convenience only allows ONE additional merc of any rank (" + aocRanks.join(", ")+ ")"});
      }

    });
  }
  return validationIssues;
}

function rankValidation(currentList, ranks, mercs, rankReqs){
  const validationIssues = [];

  // TODO this is ugly - probably should be a BF flag
  const battleForce = battleForcesDict[currentList.battleForce];
  const countMercs = battleForce?.rules?.countMercs; // currentList.battleForce === "Shadow Collective" || currentList.battleForce === "Bright Tree Village"

  if(rankReqs.commOp && (ranks.commander + ranks.operative) > rankReqs.commOp
    && !(ranks.commander > rankReqs.commander || ranks.operative > rankReqs.operative)){
    validationIssues.push({level:2, text:"Limit of " + rankReqs.commOp + " total COMMMANDERS and OPERATIVES"});
  }

  Object.keys(ranks).forEach(t =>{
    let min =rankReqs[t][0]; 
    let max = rankReqs[t][1];

    // mercs don't count for minimum, unless they do
    const countMin = !countMercs ? (ranks[t] - mercs[t]) : ranks[t];
    if(countMin < min){
      validationIssues.push({level:2, text:"Not enough " + t.toUpperCase() + " units! (minimum " + min + ")"});
    }
    
    if(ranks[t] > max){
      validationIssues.push({level:2, text:"Too many " + t.toUpperCase() + " units! (maximum " + max + ")"});
    }
  });

  // Warn user if it looks like they're trying to use a Field Comm on incompatible army
  // level 1 since the Comm miss itself is a level 2 already

  if(ranks['commander'] < rankReqs['commander'][0] && currentList.hasFieldCommander && battleForce?.rules?.noFieldComm)
  {
    validationIssues.push({level:1, text:"This battleforce can't use the Field Commander keyword"});
  }

  return validationIssues;
}

function applyRankAdjustments(currentList, rankReqs) {
  
  let extraRankCounts = {}
  
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId];
    if (card.entourage) {
      if(!extraRankCounts[card.entourage]){
        extraRankCounts[card.entourage] = 0;
      }
      extraRankCounts[card.entourage] += unit.count;

    } 
    if (card.detachment) {
      // *technically* this is backwards... but still works ;)
      if(!extraRankCounts[card.id]) {
        extraRankCounts[card.id] = 0;
      }
      extraRankCounts[card.id] += unit.count;
    } 
    if (card.associate){
      if(currentList.units.find(u => u.unitId === card.associate) !== undefined){
        extraRankCounts[card.id] = 1;
      }
    }
  });

  // Do this on a separate pass so we don't get whacked by random list order
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId];

    if(extraRankCounts[unit.unitId]){
      let allowance = Math.min(unit.count, extraRankCounts[unit.unitId]);
      rankReqs[card.rank][1] += allowance;
      extraRankCounts[unit.unitId] -= allowance;
    }
  });

  return;
}

function applyFieldCommander(list, rankReqs){
  const bf = battleForcesDict[list.battleForce];
  if(list.hasFieldCommander && !bf?.rules?.noFieldComm)
  {
      rankReqs.commander[0] = 0;
  }
}

function getOriginalRankLimits(currentList){
  const battleForce = currentList.battleForce;
  let dictRankReqs;

  if(battleForce){
    if(battleForcesDict[battleForce][currentList.mode])
      dictRankReqs = battleForcesDict[battleForce][currentList.mode];
    else{
      dictRankReqs = battleForcesDict[battleForce]['standard mode'];
    }
  } else{
    dictRankReqs = legionModes[currentList.mode].unitCounts;
  }

  // copy over so we can play with limits
  let rankReqs = {};
  (Object.keys(dictRankReqs)).forEach(r =>{
    if(dictRankReqs[r].length)
      rankReqs[r] = [dictRankReqs[r][0], dictRankReqs[r][1]]
    else
      rankReqs[r] = dictRankReqs[r];
  });
  
  return rankReqs;
}

function getRankLimits(currentList){

  let rankReqs = getOriginalRankLimits(currentList);
  applyRankAdjustments(currentList, rankReqs);  
  applyFieldCommander(currentList, rankReqs);

  return rankReqs;
}

// TODO most of this was written before understanding the whole 'running total' state we have going
// Would be better to move most of this into the proper unit/upgrade modify steps instead of 
// iterating everything every time something's added
function validateList(currentList){
  let validationIssues = [];

  const battleForce = currentList.battleForce;

  let ranks = {...currentList.unitCounts} //{ commander:0, operative:0, corps:0, special:0, heavy:0, support:0 }
  let mercs = { commander:0, operative:0, corps:0, special:0, heavy:0, support:0 }

  // Determine what our rank requirements are, warn if unknown
  // TODO need more definitive handling for the other modes...
  if(battleForce && !battleForcesDict[battleForce][currentList.mode]){
      validationIssues.push({level:1, text:"Playing a battleforce in a mode with no defined battleforce construction rules (Defaulting to 1000pt)"});
  } 
  
  let rankReqs = getRankLimits(currentList);


  let unitCounts = {};
  // count units, count up them mercs, pull in any unit-specific issues
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId];

    if(!unitCounts[unit.unitId]){
      unitCounts[unit.unitId] = 0;
    }
    unitCounts[unit.unitId] += unit.count;

    if(unit.validationIssues?.length > 0){
      validationIssues = validationIssues.concat(unit.validationIssues);
    }

    if(card.faction === 'mercenary'){
      mercs[card.rank] += unit.count;
    }
  });

  // Check detachment or any similar keywords once we know the full list count for units
  Object.getOwnPropertyNames(unitCounts).forEach(id =>{
    const card = cards[id];

    if(card.detachment){
      let parent = cards[card.detachment];
      let parentCount = unitCounts[card.detachment] ? unitCounts[card.detachment] : 0;

      if(unitCounts[id] > parentCount){
        let cardName = (card.displayName ? card.displayName : card.cardName).toUpperCase();
        let parentName = (parent.displayName ? parent.displayName : parent.cardName).toUpperCase();

        if(card.isUnique){
          validationIssues.push({level:2, text:"In order to use " + cardName + ", you must include " + parentName + ". (DETACHMENT)" });
        }
        else{
          validationIssues.push({level:2, text:"Too many " + cardName + "s  ("+ unitCounts[id] + ")." +
            "You need one " + parentName + "(" + parentCount + ") per " + cardName + ". (DETACHMENT)" });
        }
      }
    }
  })

  // TODO - now that we count units by ID, use that for BF validation
  validationIssues.push(...battleForceValidation(currentList, unitCounts));
  validationIssues.push(...rankValidation(currentList, ranks, mercs, rankReqs));
  validationIssues.push(...mercValidation(currentList, ranks, mercs));

  return validationIssues;
}

export {
  rehashList,
  convertHashToList,
  changeListTitle,
  setListMode,
  addUnit,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  addCommand,
  addContingency,
  removeContingency,
  removeCommand,
  equipUpgrade,
  unequipUpgrade,
  equipCounterpartUpgrade,
  unequipCounterpartUpgrade,
  equipLoadoutUpgrade,
  unequipLoadoutUpgrade,
  incrementUnit,
  decrementUnit,
  restoreUnit,
  killUnit,
  mergeLists,
  getEligibleBattlesToAdd,
  getEligibleCommandsToAdd,
  getEligibleContingenciesToAdd,
  getEligibleUnitsToAdd,
  getEquippableUpgrades,
  getEquippableLoadoutUpgrades,
  validateList,
  getRankLimits,
  getOriginalRankLimits,
  countPoints
};
