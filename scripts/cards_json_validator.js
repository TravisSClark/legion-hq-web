/**
 * Do some basic checks on cards.json data to make sure manual steps aren't getting messed up
 */

import fs from "fs-extra";
import appKeywords from "../src/constants/keywords.js";
import cards, {cardIdsByType} from './script_cards.js'
import _ from 'lodash';

const args = process.argv.slice(2);


const keywordNames =  Object.getOwnPropertyNames(appKeywords);


const doesKeywordNeedValue = {
  "Advanced Targeting": true,
  "Agile": false,
  "AI": true,
  "Aid": true,
  "Allies of Convenience": false,
  "Armor": true,
  "Arsenal": true,
  "Associate": true,
  "Ataru Mastery": false,
  "Attack Run": false,
  "Barrage": false,
  "Block": false,
  "Bolster": true,
  "Bounty": false,
  "Cache": true,
  "Calculate Odds": false,
  "Charge": false,
  "Climbing Vehicle": false,
  "Complete the Mission": false,
  "Compel": true,
  "Coordinate": true,
  "Counterpart": true,
  "Cover": true,
  "Cunning": false,
  "Danger Sense": true,
  "Dauntless": false,
  "Death from Above": false,
  "Defend": true,
  "Deflect": false,
  "Demoralize": true,
  "Detachment": true,
  "Direct": true,
  "Disciplined": false,
  "Disengage": false,
  "Distract": false,
  "Divine Influence": false,
  "Djem So Mastery": false,
  "Duelist": false,
  "Enrage": true,
  "Entourage": true,
  "Equip": true,
  "Exemplar": false,
  "Expert Climber": false,
  "Field Commander": false,
  "Fire Support": false,
  "Flexible Response": true,
  "Full Pivot": false,
  "Generator": true,
  "Guardian": true,
  "Guidance": false,
  "Gunslinger": false,
  "Heavy Weapon Team": false,
  "Hold the Line": false,
  "Hover": true,
  "Strafe": false,
  "Hunted": false,
  "I'm Part of the Squad Too": false,
  "Immune: Blast": false,
  "Immune: Enemy Effects": false,
  "Immune: Melee": false,
  "Immune: Melee Pierce": false,
  "Immune: Pierce": false,
  "Immune: Range 1 Weapons": false,
  "Impervious": false,
  "Incognito": false,
  "Inconspicuous": false,
  "Independent": true,
  "Indomitable": false,
  "Infiltrate": false,
  "Inspire": true,
  "Interrogate": false,
  "Jar'Kai Mastery": false,
  "Jedi Hunter": false,
  "Jump": true,
  "Juyo Mastery": false,
  "Latent Power": false,
  "Low Profile": false,
  "Makashi Mastery": false,
  "Marksman": false,
  "Master of the Force": true,
  "Master Storyteller": false,
  "Mercenary": true,
  "Nimble": false,
  "Observe": true,
  "One Step Ahead": false,
  "Outmaneuver": false,
  "Override": false,
  "Plodding": false,
  "Precise": true,
  "Prepared Position": false,
  "Programmed": false,
  "Pulling the Strings": false,
  "Quick Thinking": false,
  "Ready": true,
  "Recharge": true,
  "Reinforcements": false,
  "Regenerate": true,
  "Reliable": false,
  "Relentless": false,
  "Reposition": false,
  "Retinue": false,
  "Ruthless": false,
  "Scale": false,
  "Scout": true,
  "Scouting Party": true,
  "Secret Mission": false,
  "Self-Destruct": true,
  "Self-Preservation": false,
  "Sentinel": false,
  "Sharpshooter": true,
  "Shielded": true,
  "Shien Mastery": false,
  "Smoke": false,
  "Special Issue": true,
  "Soresu Mastery": true,
  "Speeder": true,
  "Spotter": true,
  "Spur": false,
  "Stationary": false,
  "Steady": false,
  "Strategize": true,
  "Tactical": true,
  "Take Cover": true,
  "Teamwork": false,
  "Target": true,
  "Tempted": false,
  "Transport": false,
  "Uncanny Luck": true,
  "Unconcerned": false,
  "Unhindered": false,
  "Unstoppable": false,
  "Weak Point": true,
  "Weighed Down": false,
  "We're Not Regs": false,
  "Wheel Mode": false,
  "Wound": true,
  "Area Weapon": false,
  "Arm": true,
  "Beam": true,
  "Blast": false,
  "Critical": false,
  "Cumbersome": false,
  "Detonate": true,
  "Fixed": true,
  "High Velocity": false,
  "Immobilize": true,
  "Immune: Deflect": false,
  "Impact": true,
  "Ion": true,
  "Lethal": true,
  "Long Shot": false,
  "Overrun": true,
  "Pierce": true,
  "Poison": true,
  "Primitive": false,
  "Ram": true,
  "Scatter": false,
  "Spray": false,
  "Suppressive": false,
  "Tow Cable": false,
  "Versatile": false,
  "Bane Tokens": false,
  "Here I Am": false,
  "Smoke and Mirrors": false,
  "Kablamo!": false,
  "Cycle": false,
  "Divulge": false,
  "Graffitti Tokens": false,
  "Leader": false,
  "Noncombatant": false,
  "Permanent": false,
  "Reconfigure": false,
  "Repair": true,
  "Restore": false,
  "Sidearm": false,
  "Small": false,
  "Treat": true,
}

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

    const kwName = k.name ? k.name: k;

    const kwNeedingField = keywordsWithFields.find(
      (kw) => kw[0] === kwName
    );


    if (kwNeedingField) {
      if (c[kwNeedingField[1]] == undefined) {
        console.log(
          c.cardName + ",",
          c.id,
          ": cards.json entry is missing a rule for keyword: ",
          k,
          "->",
          kwNeedingField[1]
        );
        return;
      }

      let cwVal = doesKeywordNeedValue[kwName]
      if(cwVal == undefined){
        console.log('no kwval entry for', kwName);
        return;
      } else{
        if(cwVal && k.value == undefined){
          console.log('kw needs value', '"'+c.cardName+'"', ' "'+kwName+'"')
        }else if(!cwVal && k.value !=undefined){
          console.log('found kw.value when not expecting one', c.cardName, kwName)
        }

      }

    }

    const matchingKeyword = keywordNames.find(
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
