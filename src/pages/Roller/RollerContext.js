import { defenseDice } from "constants/dice";
import { initial } from "lodash";
import { createContext, useContext, useReducer } from "react";

const RollerContext = createContext(null);
const RollerDispatchContext = createContext(null);

export function RollerProvider({children}){
  const [roller, dispatch] = useReducer(rollerReducer, initialRoller)

    return(
      <RollerContext.Provider value={roller}>
        <RollerDispatchContext.Provider value={dispatch}>
          {children}
        </RollerDispatchContext.Provider>
      </RollerContext.Provider>
    )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const attackDiceFaces = [
  [ 'blank', 'hit', 'hit', 'hit', 'hit', 'hit', 'crit', 'surge'], // red
  [ 'blank', 'blank', 'blank', 'hit', 'hit', 'hit', 'crit', 'surge'], //black
  [ 'blank', 'blank', 'blank', 'blank', 'blank', 'hit', 'crit', 'surge'], // white
];

const defenseDiceFaces = [
  [ 'block', 'block', 'block', 'blank', 'blank', 'surge'], // red
  [ 'block', 'blank', 'blank', 'blank', 'blank', 'surge'], // white
];

function roll(p){
  const attackRoll = [[],[],[]]
  
  // **Roll Attack Dice
  // Roll Dice
  for(let i=0; i< p.redCount; i++){
    attackRoll[0][i] = getRandomInt(8);
  }
  for(let i=0; i< p.blackCount; i++){
    attackRoll[1][i] = getRandomInt(8);
  }
  for(let i=0; i< p.whiteCount; i++){
    attackRoll[2][i] = getRandomInt(8);
  }

  // keep attackRoll intact; modify on totalResults
  let totalResults = {blank:0, hit:0, crit: 0, surge:0}

  for(let i=0; i<attackRoll.length; i++){

    for(let j=0; j<attackRoll[i].length; j++){
      totalResults[attackDiceFaces[i][attackRoll[i][j]]] ++;
    }
  }
  let initialRoll = {...totalResults};

  // TODO reroll Dice - need a decent Aim/Surge decision algo

  // Convert Attack Surges
  switch(p.attackSurge){
    case "none":
      break;
    case "hit":
      totalResults.hit += totalResults.surge;
      totalResults.surge = 0;
      break;
    case "crit":
      totalResults.crit += totalResults.surge;
      totalResults.surge = 0;
      break;
    case "tokens":
      console.error('not implemented - convert attack surge tokens')
      // totalResults.hit += p.attackSurgeTokens;
      // totalResults.surge = 0;
      break;
  }

  // **Apply dodge and color
  // Roll cover pool
  const coverRoll = [];
  let coverBlocks = 0;
  for(let i=0; i< totalResults.hit; i++){
    coverRoll.push(getRandomInt(6));
    // Apply cover
    if(coverRoll[i] < p.cover){
      coverBlocks++;
    }
  }

  totalResults.hit -= coverBlocks;

  // Apply Dodge

  //**Modify attack dice

  // **Roll defense dice
  const defenseRoll = [];
  let totalDefenseResults = {blank:0, block: 0, surge:0}
  let defenseIndex =  p.defenseDice == "red" ? 0 : 1;
  for(let i=0; i< totalResults.hit + totalResults.crit; i++){
    defenseRoll.push(getRandomInt(6));
    totalDefenseResults[defenseDiceFaces[defenseIndex][defenseRoll[i]]]++;
  }

  // Reroll defense dice

  // Convert defense surges
  if(p.defenseSurge){
    totalDefenseResults.block += totalDefenseResults.surge;
    totalDefenseResults.surge = 0;
  }

  // **Modify defense dice

  // **Compare Results
  let wounds = Math.max(totalResults.hit + totalResults.crit - totalDefenseResults.block, 0);

  console.log('rolled', JSON.stringify({initialRoll, totalResults, coverRoll, cover:p.cover, defenseRoll, defenseIndex, totalDefenseResults, surgeBlock:p.surgeBlock, wounds}));
  return {initialRoll, totalResults, wounds};
}



function handleMultiRoll(roller){

  let p = roller.parameters;

  let totalResults = {blank:0, hit:0, crit: 0, surge:0, wounds:0}

  for(let rolls=0; rolls< p.rollCount; rolls++){
    let singleResult = roll(p);

    totalResults.blank += singleResult.initialRoll.blank;
    totalResults.hit += singleResult.initialRoll.hit;
    totalResults.crit += singleResult.initialRoll.crit;
    totalResults.surge += singleResult.initialRoll.surge;

    totalResults.wounds += singleResult.wounds;
  }

  let expectedBlank = p.rollCount * (p.redCount * 1 + p.blackCount * 3 + p.whiteCount * 5)/8;
  let expectedHit = p.rollCount * (p.redCount * 5 + p.blackCount * 3 + p.whiteCount * 1)/8;
  let expectedCrit = p.rollCount * (p.redCount + p.blackCount + p.whiteCount)/8;
  let expectedSurge = p.rollCount * (p.redCount + p.blackCount + p.whiteCount)/8;

  let expected = {blank: expectedBlank, hit: expectedHit, crit:expectedCrit, surge: expectedSurge};
  console.log('expected', JSON.stringify(expected));


  return totalResults;

}


function rollerReducer(roller, action) {
  switch (action.type) {
    case 'updateParameters': {
      return {...roller, parameters:{...roller.parameters, ...action.parameters}};
    }

    case 'rollDice': {
      let results = handleMultiRoll(roller);
      console.log(results);
      return {...roller, results}

    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


// surges go 0 | 1 | 0 = none| hit/block | crit

const initialRoller = {
  parameters:{
    redCount:0,
    whiteCount:0,
    blackCount:0,

    attackSurge: 'none',
    defenseDice: 'white',
    defenseSurge: false,
    cover: 0,

    rollType: "multiple", // | "single"
    rollCount: 1,

    keywords:[],

  },
  results:{
    type: "multiple", // | "single"
  }
};

export function useRoller(){
  return useContext(RollerContext);
}

export function useRollerDispatch(){
  return useContext(RollerDispatchContext);
}