/**
 * Do some basic checks on cards.json data to make sure manual steps aren't getting messed up
 */

import fs from "fs-extra";
import appKeywords from "../src/constants/keywords.js";

const args = process.argv.slice(2);

// import {getEquippableUpgrades} from '../src/components/eligibleCardListGetter';
async function cardsJsonCheck() {
  const keywordsWithFields = [
    ["Associate", "associate"],
    ["Entourage", "entourage"],
    ["Mercenary", "affiliations"],
    ["Special Issue", "specialIssue"],
    ["Detachment", "detachment"],
    ["Equip", "equip"],
  ];
  const isNumber = ["minicount", "hp", "courage", "speed"];

  console.log();
  const data = await fs.readFile("../src/constants/cards.json", "utf8");

  const obj = JSON.parse(data);

  const ids = Object.getOwnPropertyNames(obj);

  const cardArrays = {
    unit: [],
    upgrade: [],
    command: [],
    battle: [],
    counterpart: [],
  };

  let cardUrls = [];
  let iconUrls = [];

  ids.forEach((id) => {
    let c = obj[id];
    cardUrls.push(`/${c.cardType}Cards/${c.imageName}`);
    iconUrls.push(`/${c.cardType}Icons/${c.imageName}`);

    if (c.id != id) console.error("ID MISMATCH!", id, c.id, c.cardName);

    try {
      cardArrays[c.cardType].push(c);
    } catch {
      console.error(
        "Unrecognized cardType: id:",
        id + ", cardType:",
        c.cardType
      );
      return;
    }

    switch (c.cardType) {
      case "unit":
        c.keywords.forEach((k) => {
          const kw = keywordsWithFields.find(
            (kw) => kw[0] === k.name || kw[0] === k
          );
          if (kw) {
            if (c[kw[1]] == undefined) {
              console.log(
                c.cardName + ",",
                c.id,
                ": cards.json entry is missing a rule for keyword: ",
                k,
                "->",
                kw[1]
              );
            }
          }

          const matchingKeyword = Object.getOwnPropertyNames(appKeywords).find(
            (a) => a === k || a === k.name
          );
          if (!matchingKeyword) {
            console.log(
              "could not find keyword entry",
              k,
              "in unit",
              c.cardName,
              c.id
            );
          }
        });

        if (!c.stats) {
          console.log("missing stats for: ", c.cardName, c.id);
        } else {
          const stats = c.stats;

          isNumber.forEach((k) => {
            if (!stats[k] && stats[k] !== 0) {
              console.log(k, "needs to be defined", c.id);
            } else if (!Number.isInteger(stats[k]))
              console.log(k, "needs to be a number", c.cardName, c.id);
          });
        }

        break;
      // Look for 'orphaned' upgrades that don't map to any units
      case "upgrade":
        break;
    }
  });

  const { unit, upgrade, command, battle, counterpart } = cardArrays;

  console.log();
  console.log(ids.length + " Cards total");
  console.log(unit.length + " Units");
  console.log(upgrade.length + " Upgrades");
  console.log(command.length + " CCs");
  console.log(battle.length + " Battle");
  console.log(counterpart.length + " Counterparts");
}

await cardsJsonCheck();
