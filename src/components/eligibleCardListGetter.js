import _ from "lodash";
import cards, { cardIdsByType, upgradeIdsBySubtype } from "constants/cards";

import interactions from "components/cardInteractions";
import battleForcesDict from "constants/battleForcesDict";
import { sortCommandIds } from "./listOperations";
import register from "constants/register";
import { makeModifiedCard } from "./utility";

/**
 * Functions for getting the lists of eligible cards that can be added based on list state
 *
 */
const impRemnantUpgrades = [
  "ej",
  "ek",
  "iy",
  "fu",
  "gm",
  "gl",
  "em",
  "en",
  "ja",
  // "Bo", // cheating ;)
];

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
 */
function areRequirementsMet(requirements, unitCard) {
  const operator = requirements[0];
  if (operator instanceof Object) {
    return _.isMatch(unitCard, operator);
  } else if (operator === "NOT") {
    return !_.isMatch(unitCard, requirements[1]);
  } else if (operator === "AND") {
    for (let i = 1; i < requirements.length; i++) {
      if (requirements[i] instanceof Array) {
        if (!areRequirementsMet(requirements[i], unitCard)) return false;
      } else if (requirements[i] instanceof Object) {
        if (!_.isMatch(unitCard, requirements[i])) return false;
      }
    }
    return true;
  } else if (operator === "OR") {
    for (let i = 1; i < requirements.length; i++) {
      if (
        requirements[i] instanceof Array &&
        areRequirementsMet(requirements[i], unitCard)
      ) {
        return true;
      } else if (
        requirements[i] instanceof Object &&
        _.isMatch(unitCard, requirements[i])
      ) {
        return true;
      }
    }
    return false;
  } else {
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
    return nameA > nameB ? 1 : -1;
  });
  return sortedIds;
}

function sortUnitIds(ids) {
  const sortedIds = ids.sort((a, b) => {
    const cardA = cards[a];
    const cardB = cards[b];

    // TODO breaks if we get a cross-faction battleforce or etc
    if (cardA.faction !== cardB.faction) {
      return cardA.faction === "mercenary" ? 1 : -1;
    }

    return cardA.cardName > cardB.cardName ? 1 : -1;
  });
  return sortedIds;
}

function sortUpgradeIds(ids) {
  const sortedIds = ids.sort((a, b) => {
    const cardA = cards[a];
    const cardB = cards[b];

    // TODO: might need another look, but I think it's ok overall (and convenient!)
    // By putting stuff with a longer req count at the top, you tend to get your units' unique upgrades at the top
    // e.g. Mando Super Commandos are often going to pick their Shield Equip
    // only non-human-intuitive thing I've seen at a quick look is that 'Jedi Guardian' becomes
    // the top of Republic spec forces 'leader' slot since he has more reqs
    if (cardA.requirements && cardB.requirements) {
      if (cardA.requirements.length !== cardB.requirements.length) {
        return cardA.requirements.length > cardB.requirements.length ? -1 : 1;
      }
    }
    const nameA = cardA.displayName ? cardA.displayName : cardA.cardName;
    const nameB = cardB.displayName ? cardB.displayName : cardB.cardName;
    return nameA > nameB ? 1 : -1;
  });
  return sortedIds;
}

function getEligibleUnitsToAdd(list, rank, preamble=false) {
  const validUnitIds = [];
  const cardsById = cardIdsByType.unit; // Object.keys(cards);
  const uniqueCardNames = getListUniques(list, "name");


  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];

    const battleForce = battleForcesDict[list.battleForce];

    if (!battleForce) {
      if (!list.faction.includes(card.faction) && !card.affiliations) continue;
      if (
        !list.faction.includes(card.faction) &&
        card.affiliations &&
        !card.affiliations.includes(list.faction)
      )
        continue;
      if (card.rank !== rank) continue;
    } else {
      // If a unit builds as corps per BF, just have it show in both corps and sf lists
      if (rank === "corps" && battleForce?.rules?.buildsAsCorps?.includes(id));
      else if (!battleForce[rank].includes(id))
        // do nothing
        continue;
      else if (card.rank !== rank) continue;
    }

    if(preamble && !preamble(list, rank, card)) continue;

    if (
      uniqueCardNames.includes(card.cardName) ||
      uniqueCardNames.includes(card.title)
    )
      continue;

    if (card.specialIssue && card.specialIssue !== list.battleForce) continue;

    // Show detachment units only after their detach target is present in list
    if (card.detachment && !(battleForce?.rules?.ignoreDetach === id)) {
      for (let i = 0; i < list.units.length; i++) {
        const unit = list.units[i];
        const unitCard = cards[unit.unitId];
        if (unit.unitId === card.detachment || unitCard.rank === card.detachment) {
          validUnitIds.push(id);
          break;
        }
      }
    } else {
      validUnitIds.push(id);
    }
  }
  return sortUnitIds(validUnitIds);
}

function getEligibleCcs(list) {
  const validCcs = [];
  const pipCounts = { 1: 0, 2: 0, 3: 0 };
  list.commandCards.forEach((id) => {
    pipCounts[cards[id].cardSubtype] += 1;
  });

  const cardNames = list.units.map((u) => cards[u.unitId].cardName);
  // const uniqueCardNames = list.units.filter(u=>cards[u.unitId].isUnique).map(u=>cards[u.unitId].cardName);
  const listCounterparts = [];

  list.units.forEach((u) => {
    if (u.counterpart && u.counterpart.count > 0) {
      listCounterparts.push(cards[u.counterpart.counterpartId].cardName);
    }
  });

  cardIdsByType["command"].forEach((id) => {
    const card = cards[id];

    if (pipCounts[card.cardSubtype] > 1) return false;
    if (!list.faction.includes(card.faction)) return false;
    if (card.battleForce && card.battleForce !== list.battleForce) return false;

    if (list.commandCards.includes(id)) return false;

    // For now, leave both in in case there's a card I'm not thinking of (...again, I don't think there is)
    if (card.commander) {
      let commanders = Array.isArray(card.commander)
        ? card.commander
        : [card.commander];
      if (
        !cardNames.some((c) => commanders.includes(c)) &&
        !listCounterparts.some((c) => commanders.includes(c))
      )
        return false;
    }
    if (card.requirements) {
      let requirementsMet = false;
      let i = 0;
      while (!requirementsMet && i < list.units.length) {
        requirementsMet = areRequirementsMet(
          card.requirements,
          cards[list.units[i].unitId]
        );
        i++;
      }
      if (!requirementsMet) return false;
    }

    if (id === "aa") return false; // Standing Orders

    validCcs.push(id);
    return true;
  });

  return validCcs;
}

function getEligibleCommandsToAdd(list) {
  const validCommandIds = getEligibleCcs(list);

  return {
    validIds: sortCommandIds(validCommandIds),
    invalidIds: [], // sortCommandIds(invalidCommandIds)
  };
}

function getEligibleUpgrades(list, upgradeType, unitId, upgradesEquipped = [], preamble=false) {
  const validUpgradeIds = [];
  const invalidUpgradeIds = [];

  if (!unitId) return { validUpgradeIds: [], invalidUpgradeIds: [] };

  const uniqueCardNames = getListUniques(list, "name");
  const unitCardCopy = makeModifiedCard(unitId, upgradesEquipped, list.faction, list.battleForce);

  for (let i = 0; i < upgradeIdsBySubtype[upgradeType].length; i++) {
    const id = upgradeIdsBySubtype[upgradeType][i]; //cardIdsByType['upgrade'][i];
    const card = cards[id];

    if (card.cardSubtype !== upgradeType) continue;
    if (card.faction && card.faction !== "" && list.faction !== card.faction)
      continue;

    if(preamble && !preamble(list, card, unitId, upgradesEquipped)) continue;

    if (card.isUnique) {
      if (uniqueCardNames.includes(card.cardName)) continue;
    }

    let alreadyEquipped = false;
    upgradesEquipped.forEach((u) => {
      if (u == null) return;

      let uCard = cards[u];
      if (id === u || uCard.cardName === card.cardName) {
        alreadyEquipped = true;
      }
    });
    if (alreadyEquipped) continue;

    if (
      card.isUnique &&
      list.battleForce &&
      !battleForcesDict[list.battleForce].allowedUniqueUpgrades.includes(id)
    )
      continue;

    // Imp remnant's mixed heavies rule (and a cheat to get Imp March working)
    if (
      list.battleForce === "Imperial Remnant" &&
      // card.cardSubtype === "heavy weapon" &&
      unitCardCopy.cardSubtype === "trooper" &&
      impRemnantUpgrades.includes(id)
    ) {
      validUpgradeIds.push(id);
      continue;
    }

    // The 'normal' way to check for an upgrade - see if the unit meets the upgrade's requirements
    if (areRequirementsMet(card.requirements, unitCardCopy)) {
      validUpgradeIds.push(id);
    } else {
      invalidUpgradeIds.push(id);
    }
  }
  return {
    validIds: sortUpgradeIds(validUpgradeIds),
    invalidIds: sortIds(invalidUpgradeIds),
  };
}

function getEligibleBattlesToAdd(list, type) {
  const validIds = [];
  const invalidIds = [];

  let currentCards;
  if (type === "primary") currentCards = list.primaryCards;
  else if (type === "secondary") currentCards = list.secondaryCards;
  else if (type === "advantage") currentCards = list.advantageCards;
  else return;
  cardIdsByType["battle"].forEach((id) => {
    const card = cards[id];
    if (card.cardSubtype !== type) return;
    if (currentCards.includes(id)) return;
    if (card.faction && card.faction !== list.faction) return;
    if (currentCards.length >= 3) {
      invalidIds.push(id);
    } else if (list.mode === "500-point mode") {
      if (card.keywords.includes("Recon")) validIds.push(id);
      else invalidIds.push(id);
    } else {
      if (card.keywords.includes("Recon")) invalidIds.push(id);
      else validIds.push(id);
    }
  });
  return { validIds, invalidIds };
}

function unitHasUniques(unit) {
  if (unit.counterpartId) {
    return true;
  }
  const unitCard = cards[unit.unitId];
  let hasUniques = unitCard.isUnique;

  if (!hasUniques) {
    unit.upgradesEquipped.forEach((up) => {
      if (cards[up]?.isUnique) hasUniques = true;
    });
  }
  return hasUniques;
}

function getListUniques(list, field) {
  const uniques = [];

  list.units.forEach((u) => {
    if (cards[u.unitId]?.isUnique) {
      uniques.push(field === "id" ? u.unitId : cards[u.unitId].cardName);
    } else if (cards[u.unitId]?.isUniqueTitle) {
      uniques.push(field === "id" ? u.unitId : cards[u.unitId].title);
    }
    u.upgradesEquipped.forEach((up) => {
      if (cards[up]?.isUnique) {
        uniques.push(field === "id" ? up : cards[up].cardName);
      }
    });
    // TODO counterpart check COULD go here, but currently no counterparts have non-unique parent cards (and I suspect it will stay that way)
  });

  return uniques;
}

function findUnitIndexInList(unit, list) {
  // A unit matches if:
  // unit ids match
  // selected upgrades match
  // *technically* if counterparts match, but so far, all of those have been unique cards

  let index = -1;

  list.units.forEach((listUnit, listIndex) => {
    if (listUnit.unitId === unit.unitId) {
      let upgradesMatch = true;
      let i = 0;
      while (upgradesMatch && i < unit.upgradesEquipped.length) {
        if (unit.upgradesEquipped[i] !== listUnit.upgradesEquipped[i]) {
          upgradesMatch = false;
        }
        i++;
      }
      if (upgradesMatch) index = listIndex;
    }
  });

  return index;
}

// NOT a strict match for this file, going to call "good enough"
function getUpgradeBar(unit) {
  if (!unit) {
    return [];
  }

  const unitCard = cards[unit.unitId];

  return [
    ...unitCard.upgradeBar,
    ...unit.additionalUpgradeSlots,
    ...unit.specialUpgradeSlots,
  ];
}


export {
  getEligibleBattlesToAdd,
  getEligibleUnitsToAdd,
  getEligibleCommandsToAdd,
  getEligibleUpgrades,
  unitHasUniques,
  getListUniques,
  findUnitIndexInList,
  areRequirementsMet,
  impRemnantUpgrades,
  getUpgradeBar,
};
