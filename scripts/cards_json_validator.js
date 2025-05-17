/**
 * Do some basic checks on cards.json data to make sure manual steps aren't getting messed up
 */

import fs from "fs-extra";
import appKeywords from "../src/constants/keywords.js";
import cards, {cardIdsByType} from '../src/constants/cards.js'
import _ from 'lodash';

const args = process.argv.slice(2);

const keywordsWithFields = [
    ["Associate", "associate"],
    ["Entourage", "entourage"],
    ["Mercenary", "affiliations"],
    ["Special Issue", "specialIssue"],
    ["Detachment", "detachment"],
    ["Equip", "equip"],
  ];

function areRequirementsMet(requirements, unitCard) {
  const operator = requirements[0];
  if (operator instanceof Object) {
      return _.isMatch(unitCard, operator);
  } else if (operator === 'NOT') {
    return !_.isMatch(unitCard, requirements[1]);
  } else if (operator === 'AND') {
    for (let i=1; i< requirements.length; i++) {
      if (requirements[i] instanceof Array){
        if (!areRequirementsMet(requirements[i], unitCard))
          return false;
      } else if (requirements[i] instanceof Object){
        if (!_.isMatch(unitCard, requirements[i]))
          return false;
      }
    }
    return true;
  } else if (operator === 'OR') {
    for (let i=1; i< requirements.length; i++){
      if (requirements[i] instanceof Array && areRequirementsMet(requirements[i], unitCard)){
        return true;
      } else if (requirements[i] instanceof Object && _.isMatch(unitCard, requirements[i])){
        return true;
      }
    }
    return false;
  } else {
    // Empty array of requirements
    return true;
  }
}

function validateKeywords(c, keywords){

  if(!keywords) return;

  keywords.forEach(k=>{
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
  })
}

// import {getEquippableUpgrades} from '../src/components/eligibleCardListGetter';
async function cardsJsonCheck() {
  
  const isNumber = ["minicount", "hp", "courage", "speed"];

  const cardIds = Object.getOwnPropertyNames(cards);
  const cardTypes = Object.getOwnPropertyNames(cardIdsByType);
  // First, do a check of everything
  Object.getOwnPropertyNames(cards).forEach(id=>{
    const c = cards[id];
    if (c.id != id) console.error("ID MISMATCH!", id, c.id, c.cardName);

    if( !cardTypes.includes(c.cardType)){
      console.error("UNRECOGNIZED CARD TYPE", c.cardType, c.cardName, c.id);
    }
  })

  cardIdsByType.unit.forEach(id=>{
    const c = cards[id];

    validateKeywords(c, c.keywords);

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
    if(c.weapons){
      c.weapons.forEach(w=>{
        validateKeywords(c, w.keywords);
      })
    }
  })

  console.warn("'Aligned' Force upgrades are currently bugged for no-unit detection")
  cardIdsByType.upgrade.forEach((id) => {
    let hasUnit = false;

    const upgradeCard = cards[id];
    for(let i=0; !hasUnit && i < cardIdsByType.unit.length; i++){
      hasUnit = areRequirementsMet(upgradeCard.requirements, cards[cardIdsByType.unit[i]] )
    }
    if(!hasUnit){
      console.warn('Unit not found for upgrade', upgradeCard.cardName);
    }
      // areRequirementsMet(upgradeCard.requirements, cards[id])  
  });

  const { unit, upgrade, command, battle, counterpart } = cardIdsByType;

  console.log(cardIds.length + " Cards total");
  console.log(unit.length + " Units");
  console.log(upgrade.length + " Upgrades");
  console.log(command.length + " CCs");
  console.log(battle.length + " Battle");
  console.log(counterpart.length + " Counterparts");
}

await cardsJsonCheck();
