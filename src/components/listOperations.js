import cards from "constants/cards";

import interactions, { getSpecialSlots } from "components/cardInteractions";
import {
  findUnitIndexInList,
  getEligibleUpgrades,
  getUpgradeBar,
} from "./eligibleCardListGetter";
import battleForcesDict from "constants/battleForcesDict";

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
    if (unit.counterpart) {
      const counterpartCard = cards[unit.counterpart.counterpartId];
      unit.counterpart.totalUnitCost = counterpartCard.cost;

      unit.counterpart.upgradesEquipped.forEach((upgradeId) => {
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
 * Removes command cards if commander is removed
 * @param {} list
 * @returns
 */
// TODO need to specialize this; should at least be a on-upgrade and on-unit fire, not this whole big thing
function consolidate(list) {
  // TODO see about moving these into validator
  let cardNames = [];
  list.units.forEach((u) => {
    cardNames.push(cards[u.unitId].cardName);
    if (u.counterpart) {
      cardNames.push(cards[u.counterpart.counterpartId].cardName);
    }
  });

  for (let i = list.commandCards.length - 1; i > -1; i--) {
    let { commander } = cards[list.commandCards[i]];
    commander = typeof Array.isArray(commander) ? commander : [commander];
    if (commander && !cardNames.some((c) => commander.includes(c))) {
      list = removeCommand(list, i);
    }
  }

  list.commandCards = sortCommandIds(list.commandCards);
  return countPoints(list);
}

function equipUnitUpgrade(
  list,
  unitIndex,
  upgradeIndex,
  upgradeId,
  isApplyToAll
) {
  // applying upgrade to multiple units
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];

  let newIndex = unitIndex;
  const count = isApplyToAll && !upgradeCard.isUnique ? unit.count : 1;

  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;

  if ("additionalUpgradeSlots" in upgradeCard) {
    addAdditionalUpgradeSlots(newUnit, upgradeCard);
  }

  newUnit.upgradesEquipped = sortUpgrades(newUnit);

  let newUnitIndex = findUnitIndexInList(newUnit, list); // <- TODO
  // If this unit already exists...
  if (newUnitIndex > -1) {
    list.units[newUnitIndex].count += count;
    list = decrementUnit(list, unitIndex, count);
  } else if (list.units[unitIndex].count === count) {
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
  return list;
}

function addCounterpart(list, unitIndex, counterpartId) {
  const counterpartCard = cards[counterpartId];
  const unit = list.units[unitIndex];
  unit.counterpart = {
    count: 1,
    counterpartId: counterpartCard.id,
    totalUnitCost: counterpartCard.cost,
    upgradesEquipped: [],
  };

  if (counterpartCard.upgradeBar) {
    for (let i = 0; i < counterpartCard.upgradeBar.length; i++) {
      unit.counterpart.upgradesEquipped.push(null);
    }
  }
  return consolidate(list);
}

function removeCounterpart(list, unitIndex) {
  delete list.units[unitIndex].counterpart;
  return consolidate(list);
}

/* 
  Update special upgrade slots for upgrades like Electrobinoculars and Imperial March:
  1. see if this unit has eligibility for special slots
  2. If it has no upgradebar or additional slot types matching the special slot, add it
    a. Special upgrade slots go on the end for a unit, after upgradebar and after addtl slots
    b. Add a new null element on upgrades equipped
*/
function updateSpecialUpgradeSlots(unit) {
  unit.specialUpgradeSlots = [];
  const unitCard = cards[unit.unitId];

  let specialSlots = getSpecialSlots(unitCard);

  specialSlots.forEach((s) => {
    const { type, upgrades } = s;
    if (
      !unitCard.upgradeBar.includes(type) &&
      !unit.additionalUpgradeSlots.includes(type)
    ) {
      unit.specialUpgradeSlots.push({ type, upgrades });
      unit.upgradesEquipped.push(null);
    }
  });
}

// TODO lots of bad shortcuts here that don't extend well
// Check for special slots; remove or append them to end of unit bar accordingly
function addAdditionalUpgradeSlots(unit, upgradeCard) {
  if (
    !upgradeCard.additionalUpgradeSlots ||
    upgradeCard.additionalUpgradeSlots.length === 0
  )
    return;

  const slots = upgradeCard.additionalUpgradeSlots;

  unit.additionalUpgradeSlots = unit.additionalUpgradeSlots.concat(slots);

  // insert before special upgrades; they're always last (granted, that's mostly arbitrary, still looks nicer imo to have them at end of bar)
  let offset =
    unit.upgradesEquipped.length - unit.specialUpgradeSlots.length - 1;

  let newSlot = null;

  if (unit.specialUpgradeSlots.map((u) => u.type).includes(slots[0])) {
    newSlot = unit.upgradesEquipped.pop();
    unit.specialUpgradeSlots = [];
  }

  // uE is a [null, null...] until sth equipped. Hence, null by default, move the popped special upgrade over if there was one
  unit.upgradesEquipped.splice(offset, 0, newSlot);
}

function removeAdditionalUpgradeSlot(unit) {
  unit.additionalUpgradeSlots = [];

  let offset =
    unit.upgradesEquipped.length - unit.specialUpgradeSlots.length - 1;

  unit.upgradesEquipped.splice(offset, 1);

  updateSpecialUpgradeSlots(unit);
}

function addUnit(list, unitId, stackSize = 1) {
  const unitCard = cards[unitId];

  const newUnitObject = {
    unitId,
    count: unitCard.isUnique || unitCard.isUniqueTitle ? 1 : stackSize,
    totalUnitCost: unitCard.cost * stackSize,
    upgradesEquipped: [],
    additionalUpgradeSlots: [], // for slots added by things like ST Captain and Comms Tech
    specialUpgradeSlots: [], // for slots we get for 'free' from upgrades themselves, like binoculars and Imperial March
  };

  for (let i = 0; i < unitCard.upgradeBar.length; i++) {
    newUnitObject.upgradesEquipped.push(null);
  }

  updateSpecialUpgradeSlots(newUnitObject);

  // TODO will need something *like* this to do buildsAsCorps 'right' if we get interactions that don't slot nicely with existing rules
  // ie, thought this was needed for Imp March + Imp Remnant, it isn't *yet* since Scouts+Deaths already have the Training slot and can therefore
  // get Imp March eligibility via getEligibleUpgrades changes alone
  if (list.battleForce) {
    if (
      battleForcesDict[list.battleForce]?.rules?.buildsAsCorps?.includes(
        newUnitObject.unitId
      )
    ) {
      newUnitObject.effectiveRank = "corps";
    }
  }

  let unitIndex = findUnitIndexInList(newUnitObject, list);

  if (unitIndex > -1) {
    list.units[unitIndex].count += stackSize;
    list.units[unitIndex].totalUnitCost += unitCard.cost * stackSize;
  } else {
    list.units.push(newUnitObject);
    unitIndex = list.units.length - 1;

    if (unitCard.equip) {
      for (let i = 0; i < unitCard.equip.length; i++) {
        let upgradeType = cards[unitCard.equip[i]].cardSubtype;
        let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);
        if (list.units[list.units.length - 1].upgradesEquipped[upgradeIndex]) {
          while (
            list.units[list.units.length - 1].upgradesEquipped[upgradeIndex] &&
            upgradeIndex < unitCard.upgradeBar.length - 1
          ) {
            upgradeIndex += 1;
          }
        }
        [list, unitIndex] = equipUnitUpgrade(
          list,
          unitIndex,
          upgradeIndex,
          unitCard.equip[i],
          true
        );
      }
    }

    // find any upgrades with 0 cost that are the only eligible in slot
    // narrow down upgrade types we check to ones that CAN be a no-cost one-of, e.g. there's always more than 1 grenade type eligible
    let freeSoloUpgradeTypes = ["armament"];

    freeSoloUpgradeTypes.forEach((upgradeType) => {
      let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);

      if (upgradeIndex > -1) {
        let eligibleUpgrades = getEligibleUpgrades(list, upgradeType, unitId);
        if (eligibleUpgrades.validIds.length === 1) {
          let freeSoloId = eligibleUpgrades.validIds[0];
          if (cards[freeSoloId].cost === 0 && freeSoloId !== "rq") {
            // If this card was already added via equip above, it'll break things if added again
            // (currently a futureproof w no known case)
            if (!unitCard.equip?.find((u) => u === freeSoloId)) {
              [list] = equipUnitUpgrade(
                list,
                unitIndex,
                upgradeIndex,
                freeSoloId,
                true
              );
            }
          }
        }
      }
    });

    if (unitCard.command) {
      unitCard.command.forEach((commandId) => addCommand(list, commandId));
    }
  }
  sortUnitsByRank(list);
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

function sortUnitsByRank(list) {
  const ranks = [
    "commander",
    "operative",
    "corps",
    "special",
    "support",
    "heavy",
  ];
  list.units.sort(
    (a, b) =>
      ranks.indexOf(cards[a.unitId].rank) - ranks.indexOf(cards[b.unitId].rank)
  );
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

function sortCommandIds(cardIds) {
  return cardIds.sort((firstId, secondId) => {
    const firstType = Number.parseInt(cards[firstId].cardSubtype);
    const secondType = Number.parseInt(cards[secondId].cardSubtype);
    if (firstType > secondType) return 1;
    else if (firstType < secondType) return -1;
    return 0;
  });
}

function getBattleArray(list, type) {
  let typeIndex = battleTypes.findIndex((t) => t === type);
  if (typeIndex !== -1) {
    return list[battleTypes[typeIndex] + "Cards"];
  } else {
    console.warn("Unrecognized battle type: " + type);
    return null;
  }
}

function addBattle(list, type, id) {
  let currentCards = getBattleArray(list, type);
  if (!currentCards) return;

  let nextType = type;
  let typeIndex = battleTypes.findIndex((t) => t === type);

  currentCards.push(id);

  // intentionally go undef here and use it above, rather than messing w wraparound
  if (currentCards.length >= 3) nextType = battleTypes[typeIndex + 1];

  return { list, nextType };
}

function removeBattle(list, type, index) {
  let currentCards = getBattleArray(list, type);
  if (!currentCards) return list;

  currentCards.splice(index, 1);

  return list;
}

function equipUpgrade(
  list,
  action,
  unitIndex,
  upgradeIndex,
  upgradeId,
  isApplyToAll = false
) {
  if (action === "UNIT_UPGRADE" || action === "UNIT_UPGRADE_SPECIAL") {
    let newIndex;
    [list, newIndex] = equipUnitUpgrade(
      list,
      unitIndex,
      upgradeIndex,
      upgradeId,
      isApplyToAll
    );
    unitIndex = newIndex;
  } else if (action === "COUNTERPART_UPGRADE") {
    list = equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  }

  list = consolidate(list);
  return { list, unitIndex };
}

// TODO remove these routers in favor of calling the right action type directly from the click handler
function unequipUpgrade(list, action, unitIndex, upgradeIndex) {
  // const upgradeId = list.units[unitIndex].upgradesEquipped[upgradeIndex];
  if (action === "UNIT_UPGRADE" || action === "UNIT_UPGRADE_SPECIAL") {
    list = unequipUnitUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === "COUNTERPART_UPGRADE") {
    list = unequipCounterpartUpgrade(list, unitIndex, upgradeIndex);
  }

  return consolidate(list);
}

// Returns a sorted list of upgrades so we can consolidate identical stacks regardless of add order
function sortUpgrades(unit) {
  const { upgradesEquipped } = unit;

  const upgradeBar = getUpgradeBar(unit).map((u) => (u.type ? u.type : u));
  const sortedUpgrades = Array(upgradeBar.length).fill(null);
  const upgradesByType = {};

  // get all the cards, then make an object {comms:[{id:'aa', cardName:'Comms Jammer'...}...], armament:[...]...}
  for (let i = 0; i < upgradesEquipped.length; i++) {
    if (upgradesEquipped[i]) {
      let upgradeCard = cards[upgradesEquipped[i]];
      let upgradeTypeList = upgradesByType[upgradeCard.cardSubtype];
      if (!upgradeTypeList) {
        upgradesByType[upgradeCard.cardSubtype] = [];
        upgradeTypeList = upgradesByType[upgradeCard.cardSubtype];
      }

      for (let j = 0; j <= upgradeTypeList.length; j++) {
        // Sort these BACKWARDS abc so we can just pop() the arrays below
        // TODO make this check for unique(?) so that those show up first
        if (
          j === upgradeTypeList.length ||
          upgradeCard.cardName > upgradeTypeList[j].cardName
        ) {
          upgradeTypeList.splice(j, 0, upgradeCard);
          break;
        }
      }
    }
  }

  // Iterate our upgradeBar, if upgradesByType has a match, add it in! (and with uBT being sorted already, now bar is sorted!)
  for (let i = 0; i < upgradeBar.length; i++) {
    let sortedPool = upgradesByType[upgradeBar[i]];
    if (sortedPool && sortedPool.length > 0) {
      sortedUpgrades[i] = sortedPool.pop().id;
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

  // TODO does not work if additionalUpgradeSlots has a config where >1 upgrade card provides aUS
  if ("additionalUpgradeSlots" in upgradeCard) {
    removeAdditionalUpgradeSlot(newUnit);
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
  equipUpgrade,
  unequipUpgrade,
  equipCounterpartUpgrade,
  unequipCounterpartUpgrade,
  incrementUnit,
  decrementUnit,
  countPoints,
  sortCommandIds,
  consolidate,
  sortUpgrades,
  updateSpecialUpgradeSlots,
  addAdditionalUpgradeSlots,
};
