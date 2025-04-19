import cards, { cardsIdsByType } from 'constants/cards';

import battleForcesDict from 'constants/battleForcesDict';
import legionModes from 'constants/legionModes';
import {areRequirementsMet, impRemnantUpgrades} from 'components/eligibleCardListGetter';

const upgradesProvidingAlliesOfConvenience = cardsIdsByType["upgrade"].filter(c=>cards[c].keywords?.some(k=> k==='Allies of Convenience' || k.name ==="Allies of Convenience"));
/**
 * Check validation ONLY for things pertaining to this unit's currently equipped upgrades. 
 * Generally, should *probably* not do things that have a further reach than upgrade bar itself (I think)
 * e.g. adding Field Commander or Maul's Darksaber for list validation
 * @param {} list 
 * @param {*} unitIndex 
 * @param {*} upgradeIndex 
 * @param {*} upgradeId 
 */
function validateUpgrades(list, unitIndex, listUniqueUpgrades){
  const unit = list.units[unitIndex];
  const card = cards[unit.unitId];
  card.forceAffinity = unit.forceAffinity;

  unit.validationIssues = [];

  unit.upgradesEquipped.forEach(id=>{
    if(!id) return;
    const card = cards[id];
    if(card.uniqueCount || card.isUnique || card.isUniqueTitle){
      listUniqueUpgrades[id] = listUniqueUpgrades[id] ? listUniqueUpgrades[id] + unit.count : unit.count;
    }
    if(list.battleForce && (card.isUnique || card.isUniqueTitle)){
      if(!battleForcesDict[list.battleForce].allowedUniqueUpgrades.includes(id))
        unit.validationIssues.push({level:2, text: '"' + card.cardName + "\" upgrade is not allowed in this battleforce." });
    }
  })
  
  // Validation for each of the 'must equip' keywords (that I know of)

  if (card.flexResponse) {
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

    if(card.keywords.find(k=> k === "Heavy Weapon Team" || k.name === "Heavy Weapon Team")){

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

  if(card.keywords.find(k=> k === "Programmed" || k.name === "Programmed")){
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


  // Loop upgrades for checks
  // For now, this just confirms we don't have 2+ Leader cards

  let leaderList = [];
  unit.upgradesEquipped.forEach(id=>{

    if(!id) return;
    const upgradeCard = cards[id];

    if(upgradeCard.keywords.includes("Leader")){
      leaderList.push(upgradeCard.cardName);
    }

    else if (list.battleForce === 'Imperial Remnant' && upgradeCard.cardSubtype === 'heavy weapon' && card.cardSubtype === 'trooper') {
      if (impRemnantUpgrades.includes(id)) 
        return;
    } else if (!areRequirementsMet(upgradeCard.requirements, card)) {
      unit.validationIssues.push({level:2, text: card.cardName.toUpperCase() + " cannot equip " + upgradeCard.cardName.toUpperCase()})
    }
  });

  if(leaderList.length > 1){
    unit.validationIssues.push( { level:2, text: card.cardName + " has too many LEADER upgrades (" + leaderList.join(' and ') + ")"});
  }
}

function battleForceValidation(currentList, unitCounts){

  const validationIssues = [];
  // Should destroy this in favor of adding a 'rule' to apply for BzF in the object, e.g.
  // rules:[... {type:'unitLimit', min:0, max:1, types:['ay', 'sr']}]

  if(!currentList.battleForce){
    return validationIssues;
  }

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

  if(currentList.battleForce == "Tempest Force" && unitCounts["we"] !== 1){
    validationIssues.push({level:2, text: "Until 'Imperial Officer' gets reworked, you'll need to include Major Marquand (under Heavies) to fulfill Commander requirements"})
  }
  
  return validationIssues;
}

function mercValidation(currentList, currentRanks, mercs, rankIssues){
  const validationIssues = [];

  // If we have the countMercs rule (SC, BTV), bail
  if(!battleForcesDict[currentList.battleForce]?.rules?.countMercs){

    let hasAoc = false;
    let aocRanks = []; 

    let mercLimits = { commander:1, operative:1, corps:2, special:1, heavy:1, support:1 }

    // Check for Allies of Convenience or Underworlds Connection card
    currentList.units.forEach((unit)=>{
      if(!hasAoc)
      {
        const card = cards[unit.unitId]
        hasAoc = card.keywords.some(k=> k==='Allies of Convenience' || k.name ==="Allies of Convenience") || unit.upgradesEquipped.find(c => upgradesProvidingAlliesOfConvenience.includes(c));
      }
    });

    Object.keys(currentRanks).forEach(t =>{

      if(mercs[t] > mercLimits[t]){
        if(!hasAoc || mercs[t] > mercLimits[t] + 1){
          let issue = {level:2, text:"Too many mercenary " + t.toUpperCase() + " units! (maximum " + (hasAoc ? mercLimits[t]+1:mercLimits[t]) + ")"}
          validationIssues.push(issue);
          rankIssues[t].push(issue);
        }
        if(hasAoc)
          aocRanks.push(t);
      }
    });

    if(aocRanks.length > 1){
      validationIssues.push({level:2, text:"Allies of Convenience only allows ONE additional merc of any rank (" + aocRanks.join(", ")+ ")"});
    }
  }
  return validationIssues;
}

function rankValidation(currentList, currentRanks, rankLimits, mercs, rankIssues){
  const validationIssues = [];

  const battleForce = battleForcesDict[currentList.battleForce];
  const countMercs = battleForce?.rules?.countMercs;
  const countMercs = battleForce?.rules?.countMercs;

  if(rankLimits.commOp && (currentRanks.commander + currentRanks.operative) > rankLimits.commOp
    && !(currentRanks.commander > rankLimits.commander || currentRanks.operative > rankLimits.operative)){
      
    let issue = {level:2, text:"Limit of " + rankLimits.commOp + " total COMMMANDERS and OPERATIVES"}
    validationIssues.push(issue);
    rankIssues.commander.push(issue);
    rankIssues.operative.push(issue);
  }

  Object.keys(currentRanks).forEach(r =>{

    const [min, max] = rankLimits[r];

    // mercs don't count for minimum, unless they do
    const countMin = !countMercs ? (currentRanks[r] - mercs[r]) : currentRanks[r];
    if(countMin < min){
      let issue = {level:2, text:"Not enough " + (mercs[r] > 0 ? "non-mercenary ": "" ) + r.toUpperCase() + " units! (minimum " + min + ")"}
      validationIssues.push(issue);
      rankIssues[r].push(issue);
    }
    
    if(currentRanks[r] > max){
      let issue = {level:2, text:"Too many " + r.toUpperCase() + " units! (maximum " + max + ")"};
      validationIssues.push(issue);
      rankIssues[r].push(issue);
    }
  });

  // Warn user if it looks like they're trying to use a Field Comm on incompatible army
  // level 1 since the missing commander itself is a level 2 already
  if(currentRanks['commander'] < rankLimits['commander'][0] && currentList.hasFieldCommander && battleForce?.rules?.noFieldComm)
  {
    let issue = {level:1, text:"This battleforce can't use the Field Commander keyword"}
    validationIssues.push(issue);
    // does not add to rankIssues since this warning is redundant irt not having a cmdr
  }

  return validationIssues;
}

// Would be better to move some of this into the proper unit/upgrade modify steps instead of 
// iterating everything every time something's changed
// See if anyone complains about LHQ chugging first then go from there ;)
function validateList(currentList, rankLimits){
  let validationIssues = [];

  const battleForce = currentList.battleForce ? battleForcesDict[currentList.battleForce] : null;

  let currentRanks = {commander:0, operative:0, corps:0, special:0, heavy:0, support:0 };
  let rankIssues = {commander:[], operative:[], corps:[], special:[], heavy:[], support:[]}

  let gameTimeRanks = {...currentRanks};
  let mercs = {...currentRanks };

  // Determine what our rank requirements are, warn if unknown
  if (battleForce && !battleForce[currentList.mode]){
      validationIssues.push({level:1, text:"Playing a battleforce in a mode with no defined battleforce construction rules (Defaulting to 1000pt)"});
  } 

  const faction = currentList.faction;

  let forceAffinity = 'dark side';
  if (faction === 'rebels' || faction === 'republic') forceAffinity = 'light side';
  else if ( faction === 'mercenary') forceAffinity = battleForcesDict[currentList.battleForce].forceAffinity;
  
  const listUniqueUpgrades = {};
  let unitCounts = {};

  // count units, count up them mercs, pull in any unit-specific issues
  currentList.units.forEach((unit, index)=>{
    const card = cards[unit.unitId];
    unit.validationIssues = [];

    if(!unitCounts[unit.unitId]){
      unitCounts[unit.unitId] = 0;
    }
    unitCounts[unit.unitId] += unit.count;
    if(card.faction === 'mercenary'){
      mercs[card.rank] += unit.count;
    }

    currentRanks[card.rank] += unit.count;
    gameTimeRanks[card.rank] += unit.count; // DON'T update this using the buildsAsCorps rules below so we see what our gametime counts are

    // Maul + Darksaber interaction - TODO, make it data/rules-driven
    if (unit.unitId === 'rc' && unit.upgradesEquipped.includes('rq')) { 
      currentRanks['commander']++;
      currentRanks['operative']--;
    }

    if(battleForcesDict[currentList.battleForce]?.rules?.buildsAsCorps?.includes(unit.unitId)){
      currentRanks[card.rank] -= unit.count;
      currentRanks['corps'] += unit.count;
    } 

    unit.forceAffinity = forceAffinity;

    // side-effect of tallying list's unique upgrades to the passed in obj for use later
    validateUpgrades(currentList, index, listUniqueUpgrades);

    if (battleForce && !battleForce[card.rank].includes(unit.unitId)){
        unit.validationIssues.push({level:2, text: '"' + card.cardName + "\" is not allowed in this battleforce." });
    }
    else if( card.specialIssue && (!battleForce || card.specialIssue !== battleForce.name)){
      unit.validationIssues.push({level:2, text: '"' + card.displayName + "\" is not allowed outside the " +card.specialIssue.toUpperCase() + " battleforce. (Special Issue)" });
    }

    if(unit.validationIssues?.length > 0){
      validationIssues = validationIssues.concat(unit.validationIssues);
    }
  });

  if(battleForcesDict[currentList.battleForce]?.rules?.buildsAsCorps){
    validationIssues.push({level:1, text:"Your battleforce treats some units as Corps during army building (they are still Special Forces during the game)" });
  }

  Object.getOwnPropertyNames(listUniqueUpgrades).forEach(id=>{
    const upgradeCard = cards[id];
    const limit = upgradeCard.uniqueCount ? upgradeCard.uniqueCount : 1;

    if(listUniqueUpgrades[id] > limit){
      const name = upgradeCard.cardName.toUpperCase();
      validationIssues.push({level:2, text:"Too many \"" + name + "\" upgrades! (" + listUniqueUpgrades[id] +" equipped, limit " + limit+ ")" });
    }
  })

  // Check detachment or any similar keywords once we know the full list count for units
  Object.getOwnPropertyNames(unitCounts).forEach(id =>{
    const card = cards[id];

    if(card.detachment){
      let parent = cards[card.detachment];
      let parentCount = unitCounts[card.detachment] ? unitCounts[card.detachment] : 0;

      if(unitCounts[id] > parentCount){
        let cardName = (card.displayName ? card.displayName : card.cardName).toUpperCase();
        let parentName = (parent.displayName ? parent.displayName : parent.cardName).toUpperCase();

        if(card.isUnique || card.isUniqueTitle){
          validationIssues.push({level:2, text:"In order to use " + cardName + ", you must include " + parentName + ". (DETACHMENT)" });
        }
        else{
          validationIssues.push({level:2, text:"Too many " + cardName + "s  ("+ unitCounts[id] + ")." +
            "You need one " + parentName + "(" + parentCount + ") per " + cardName + ". (DETACHMENT)" });
        }
      }
    }
  })

  // ranks gets decorated with issues here so the tooltip/top-bar can indicate issues
  validationIssues.push(...battleForceValidation(currentList, unitCounts));
  validationIssues.push(...rankValidation(currentList, currentRanks, rankLimits, mercs, rankIssues));
  validationIssues.push(...mercValidation(currentList, currentRanks, mercs, rankIssues));

  // TODO confusing naming - unit counts is more like 'rank counts' irt currentList
  // TODO at some point, adding to currentList like it's a plain ol' object will come back to bite me
  // for now... it's okay since all these are updated as side-effects of the currentList update (or so I think)
  currentList.unitCounts = currentRanks;
  currentList.gametimeUnitCounts = gameTimeRanks;
  currentList.rankIssues = rankIssues;

  return validationIssues;
}

function applyFieldCommander(list, rankReqs){

  list.hasFieldCommander = false;

  for (let i = 0; i < list.units.length && !list.hasFieldCommander; i++) {
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];

    if (unitCard.keywords.some(k=> k==='Field Commander' || k.name ==="Field Commander")) list.hasFieldCommander = true;

    for (let j = 0; j < unit.upgradesEquipped.length && !list.hasFieldCommander; j++) { 
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.keywords.some(k=> k==='Field Commander' || k.name ==="Field Commander")) {
          list.hasFieldCommander = true;
        }
      }
    }
  }

  const bf = battleForcesDict[list.battleForce];
  if(list.hasFieldCommander && !bf?.rules?.noFieldComm)
  {
      rankReqs.commander[0] = 0;
  }
}

// Quantify keywords that expand our rank maximums
function applyRankAdjustments(currentList, rankReqs) {
  
  // map of unitIds:count allowed due to keywords below
  let extraRankCounts = {}
  
  // Count all the things adding ranks
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

  // Do this on a separate pass so we don't get whacked by unit order
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

function getRankLimits(currentList){

  let rankReqs = getOriginalRankLimits(currentList);
  applyRankAdjustments(currentList, rankReqs);  
  applyFieldCommander(currentList, rankReqs);

  return rankReqs;
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
    dictRankReqs = legionModes[currentList.mode].rankReqs;
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

function checkValidCards(currentList) {
  for (let i = 0; i < currentList.units.length; i++) {
    let unit = currentList.units[i];
    if (unit.unitId && !cards[unit.unitId]) {
      currentList.units.splice(i, 1);
      i--;
    } else {
      for (let j = 0; j < unit.upgradesEquipped.length; j++) {
        let id = unit.upgradesEquipped[j];
        if(id && !cards[id]) {
          unit.upgradesEquipped.splice(j, 1);
          j--;
        };
      }
    }
  }
  return currentList;
}

export {
  validateList,
  getOriginalRankLimits, 
  getRankLimits,
  checkValidCards
}