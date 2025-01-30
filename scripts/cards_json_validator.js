/**
 * Do some basic checks on cards.json data to make sure manual steps aren't getting messed up
 */

import fs from 'fs-extra';
// import {getEquippableUpgrades} from '../src/components/eligibleCardListGetter';
async function cardsJsonCheck(){

  const keywordsWithFields = [
    ["Associate", "associate"],
    ["Entourage", "entourage"],
    ["Mercenary", "affiliations"],
    ["Special Issue", "specialIssue"]
  ];

  console.log();
  const data = await fs.readFile('../src/constants/cards.json', 'utf8')

  const obj = JSON.parse(data);

  const ids = Object.getOwnPropertyNames(obj);

  const cardArrays = {
    unit: [],
    upgrade: [],
    command: [],
    battle:[],
    counterpart: [],
    flaw: []
  };


  let cardUrls = [];
  let iconUrls = [];

  ids.forEach(id =>{
    
    let c = obj[id];
    cardUrls.push(`/${c.cardType}Cards/${c.imageName}`);
    iconUrls.push(`/${c.cardType}Icons/${c.imageName}`);

    if(c.id != id)
      console.error("ID MISMATCH!", id, c.id, c.cardName);

    try{
      cardArrays[c.cardType].push(c);
    } catch{
      console.error("Unrecognized cardType: id:", id + ", cardType:", c.cardType);
      return;
    }

    switch(c.cardType){
      case "unit":
        c.keywords.forEach(k=>{
          const idx = keywordsWithFields.findIndex(kwf =>kwf[0] === k)
          if(idx > -1){
            // console.log(k, c[keywordsWithFields[idx][1]]);

            if(c[keywordsWithFields[idx][1]] == undefined){
              console.log(c.cardName+",", c.id, ": cards.json entry is missing a rule for keyword:",k, '->', keywordsWithFields[idx][1]);
            }
          }
        });
        break;
      // Look for 'orphaned' upgrades that don't map to any units
      case "upgrade":
        break;

    }
  });


  const {unit, upgrade, command, battle, counterpart, flaw} = cardArrays;

  console.log();
  console.log(ids.length + " Cards total");
  console.log(unit.length + " Units");
  console.log(upgrade.length + " Upgrades");
  console.log(command.length + " CCs");
  console.log(battle.length + " Battle");
  console.log(counterpart.length + " Counterparts");
  console.log(flaw.length + " Flaws");
}

await cardsJsonCheck();


