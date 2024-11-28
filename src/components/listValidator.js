import ranks from 'constants/ranks';
import _ from 'lodash';
import cards from 'constants/cards';

import battleForcesDict from 'constants/battleForcesDict';
import legionModes from 'constants/legionModes';
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


function applyFieldCommander(list, rankReqs){
  const bf = battleForcesDict[list.battleForce];
  if(list.hasFieldCommander && !bf?.rules?.noFieldComm)
  {
      rankReqs.commander[0] = 0;
  }
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

export {
  validateList,
  validateUpgrades,
  getOriginalRankLimits, 
  getRankLimits
}