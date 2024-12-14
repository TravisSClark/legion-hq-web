import _ from 'lodash';
import cards, {cardsIdsByType as cardIdsByType} from 'constants/cards';

import interactions from 'components/cardInteractions';
import battleForcesDict from 'constants/battleForcesDict';
import { sortCommandIds } from './listOperations';

/**
 * Functions for getting the lists of eligible cards that can be added based on list state
 * 
 */


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

function getEquippableUpgrades(
  list, upgradeType, unitId, upgradesEquipped=[]
) {
  const impRemnantUpgrades = ['ej', 'ek', 'fv', 'iy', 'fu', 'gm', 'gl', 'em', 'en', 'ja'];
  const validUpgradeIds = [];
  const invalidUpgradeIds = [];

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


function getEquippableLoadoutUpgrades(
  list, upgradeType, id, upgradeIndex, upgradesEquipped
) {
  const upgrades = getEquippableUpgrades(
    list, upgradeType, id, upgradesEquipped
  );
  const validIds = upgrades.validIds;
  const invalidIds = upgrades.invalidIds;
  const validLoadoutUpgradeIds = [];
  const invalidLoadoutUpgradeIds = [...invalidIds];
  const parentUpgradeCard = cards[upgradesEquipped[upgradeIndex]];
  console.log(JSON.stringify(upgradesEquipped), upgradeIndex);
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

function getEligibleBattlesToAdd(list, type) {
  const validIds = [];
  const invalidIds = [];

  let currentCards;
  if (type === 'primary') currentCards = list.primaryCards;
  else if (type === 'secondary') currentCards = list.secondaryCards;
  else if (type === 'advantage') currentCards = list.advantageCards;
  else return;
  cardIdsByType['battle'].forEach(id => {
    const card = cards[id];
    if (card.cardSubtype !== type) return;
    if (currentCards.includes(id)) return;
    if (currentCards.length >= 3) {
      invalidIds.push(id);
    }
    else if (list.mode === '500-point mode') {
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

export{
  getEligibleBattlesToAdd,
  getEligibleUnitsToAdd,
  getEligibleContingenciesToAdd,
  getEligibleCommandsToAdd,
  getEquippableLoadoutUpgrades,
  getEquippableUpgrades,
}