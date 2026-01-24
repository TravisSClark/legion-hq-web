import legionModes from "constants/legionModes";
import {
  addAdditionalUpgradeSlots,
  consolidate,
  sortUpgrades,
  updateSpecialUpgradeSlots,
} from "./listOperations";
import listTemplate from "constants/listTemplate";
import battleForcesDict from "constants/battleForcesDict";
import cards, { cardIdsByType } from "constants/cards";
import {
  findUnitIndexInList,
  getListUniques,
  unitHasUniques,
} from "./eligibleCardListGetter";

// Functions which act upon lists wholesale, rather than tweaking data inside a list

function mergeLists(primaryList, secondaryList) {
  let unitsToAdd = [];

  let primaryUniques = getListUniques(primaryList, "id");

  for (let i = 0; i < secondaryList.units.length; i++) {
    const unit = secondaryList.units[i];
    if (unitHasUniques(unit)) {
      if (primaryUniques.includes(unit.unitId)) continue;
      let isValid = true;
      unit.upgradesEquipped.forEach((upgradeId) => {
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
  unitsToAdd.forEach((unitToAdd) => primaryList.units.push(unitToAdd));
  return consolidate(primaryList);
}

function processUnitSegment(segment) {
  const unitSegment = segment.slice(0, 3);
  let upgradeSegment = segment.slice(3);
  let additionalUpgradeCards = [];
  const unitCount = Number.parseInt(unitSegment.charAt(0));
  const unitId = unitSegment.charAt(1) + unitSegment.charAt(2);
  const unitCard = cards[unitId];
  const newUnit = {
    unitId,
    count: unitCount,
    totalUnitCost: unitCard.cost * unitCount,
    upgradesEquipped: [],
    additionalUpgradeSlots: [],
    specialUpgradeSlots: [],
  };

  updateSpecialUpgradeSlots(newUnit);

  let upgradeIndex = 0;
  for (let i = 0; i < upgradeSegment.length; i++) {
    if (upgradeSegment.charAt(i) === "0") {
      newUnit.upgradesEquipped[upgradeIndex] = null;
      upgradeIndex++;
    } else {
      const upgradeId = upgradeSegment.charAt(i) + upgradeSegment.charAt(i + 1);
      const upgradeCard = cards[upgradeId];
      newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
      if (
        upgradeCard.additionalUpgradeSlots &&
        upgradeCard.additionalUpgradeSlots.length > 0
      ) {
        additionalUpgradeCards.push(upgradeCard);
      }
      i++;
      upgradeIndex++;
    }
  }
  if (additionalUpgradeCards) {
    additionalUpgradeCards.map(function (upgradeCard) {
      addAdditionalUpgradeSlots(newUnit, upgradeCard);
    });
  }
  return newUnit;
}

function segmentToUnitObject(unitIndex, segment) {
  let unit;
  if (segment.includes("+")) {
    unit = processUnitSegment(segment.split("+")[0]);
    const counterpart = processUnitSegment(segment.split("+")[1]);
    const { unitId, totalUnitCost, upgradesEquipped, additionalUpgradeSlots } =
      counterpart;

    unit.counterpart = {
      count: 1,
      counterpartId: unitId,
      totalUnitCost,
      upgradesEquipped,
      additionalUpgradeSlots,
    };
  } else unit = processUnitSegment(segment);
  return unit;
}

function convertJsonToList(jsonText) {
  let newList = JSON.parse(JSON.stringify(listTemplate));
  let importList = JSON.parse(jsonText);
  // console.log('list to import',JSON.stringify(importList));

  if (importList.armyFaction === "rebel") newList.faction = "rebels";
  else if (importList.armyFaction === "empire") newList.faction = "empire";
  else if (importList.armyFaction === "republic") newList.faction = "republic";
  else if (importList.armyFaction === "separatist")
    newList.faction = "separatists";
  else newList.faction = "";

  if (importList.battleForce) newList.battleForce = importList.battleForce;

  function findId(name, type) {
    let ids = cardIdsByType[type];

    const uname = name.toUpperCase();

    let foundId = "";
    for (let i = 0; i < ids.length && foundId === ""; i++) {
      let card = cards[ids[i]];

      let nameTitle = card.cardName + (card.title ? " " + card.title : "");
      let echoRule = card.cardName + (card.title ? ", " + card.title : "");

      // console.log(nameTitle)

      if (
        uname === nameTitle.toUpperCase() ||
        uname === card.ttsName?.toUpperCase() ||
        uname === echoRule.toUpperCase()
      ) {
        if (
          !card.affiliations &&
          card.faction &&
          card.faction !== newList.faction
        ) {
          continue;
        }
        if (card.affiliations && !card.affiliations.includes(newList.faction)) {
          continue;
        }
        return ids[i];
      }
    }

    return foundId;
  }

  importList.units?.forEach((u) => {
    let id = findId(u.name, "unit");

    if (!id) {
      console.warn("unable to find ID for " + u.name);
      return;
    }

    const newUnit = {
      unitId: id,
      count: 1,
      upgradesEquipped: [],
      additionalUpgradeSlots: [],
      specialUpgradeSlots: [],
    };

    updateSpecialUpgradeSlots(newUnit);

    u.upgrades?.forEach((up) => {
      let upId = findId(up, "upgrade");

      if (!upId) {
        // check for counterpart
        // TODO need ID10 case or etc here
        let counterpartId = findId(up, "counterpart");

        if (counterpartId) {
          newUnit.counterpart = {
            count: 1,
            counterpartId,
            upgradesEquipped: [],
            additionalUpgradeSlots: [],
          };
        }
      } else {
        const upgradeCard = cards[upId];
        newUnit.upgradesEquipped.push(upId);
        if (upgradeCard.additionalUpgradeSlots) {
          addAdditionalUpgradeSlots(newUnit, upgradeCard);
        }
      }
    });

    newUnit.upgradesEquipped = sortUpgrades(newUnit);

    let unitIndex = newList.units.length - 1;
    let newUnitIndex = findUnitIndexInList(newUnit, newList); // <- TODO
    // If this unit already exists...
    if (newUnitIndex > -1) {
      newList.units[newUnitIndex].count += newUnit.count;
    } else {
      newList.units.push(newUnit);
    }
  });
  importList.commandCards?.forEach((cc) => {
    if (cc == "Standing Orders") {
      return;
    }
    let ccId = findId(cc, "command");

    if (ccId) {
      newList.commandCards.push(ccId);
    }
  });

  if (importList.battleFieldDeck) {
    let bDeck = importList.battleFieldDeck;

    bDeck.conditions?.forEach((c) => {
      let bcId = findId(c, "battle");
      if (bcId) newList.advantageCards.push(bcId);
    });

    bDeck.deployment?.forEach((c) => {
      let bcId = findId(c, "battle");
      if (bcId) newList.primaryCards.push(bcId);
    });

    bDeck.objective?.forEach((c) => {
      let bcId = findId(c, "battle");
      if (bcId) newList.secondaryCards.push(bcId);
    });
  }

  newList.title = importList.title ? importList.title : "Untitled";

  console.log("import", JSON.stringify(newList));
  return consolidate(newList);
  // list.battleFieldDeck
}

function convertHashToList(faction, url) {
  let list = JSON.parse(JSON.stringify(listTemplate));
  list.faction = faction;
  let segments;
  if (url.includes(":")) {
    segments = url.split(":");

    let idx = 0;
    let points = parseInt(segments[idx]);

    if (points) {
      idx++;
      let mode = Object.getOwnPropertyNames(legionModes).find(
        (n) => legionModes[n].maxPoints === points
      );
      if (mode) {
        list.mode = mode;
      }
    }

    let bfCode = Object.getOwnPropertyNames(battleForcesDict).find(
      (k) => battleForcesDict[k].linkId === segments[idx]
    );
    if (bfCode) {
      list.battleForce = bfCode;
    }

    segments = segments[segments.length - 1].split(",");
  } else {
    list.battleForce = "";
    segments = url.split(",");
  }
  const unitSegments = [];
  const otherSegments = [];
  try {
    let oldCounterparts = ["lw", "ji", "jj"];
    segments.forEach((segment) => {
      // TODO - this is *probably* defunct, unless there's a gameuplink archive out there
      let hasOldCounterpart = false;
      oldCounterparts.forEach((id) => {
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
    list.units = unitSegments.map((segment, i) =>
      segmentToUnitObject(i, segment)
    );
  } catch (e) {
    return false;
  }
  try {
    otherSegments.forEach((cardId) => {
      if (cardId === "") return;
      const card = cards[cardId];
      if (card.cardType === "command") {
        list.commandCards.push(cardId);
      } else if (card.cardSubtype === "primary") {
        list.primaryCards.push(cardId);
      } else if (card.cardSubtype === "secondary") {
        list.secondaryCards.push(cardId);
      } else if (card.cardSubtype === "advantage") {
        list.advantageCards.push(cardId);
      }
    });
  } catch (e) {
    return false;
  }
  if (list.faction === "mercenary") list.battleForce = "Shadow Collective";
  if (
    list.faction === "separatists" &&
    list.battleForce === "Echo Base Defenders"
  ) {
    list.battleForce = "Separatist Invasion";
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
  return { ...list, title: title.substring(0, 64) };
}

export {
  mergeLists,
  convertHashToList,
  convertJsonToList,
  rehashList,
  changeListTitle,
};
