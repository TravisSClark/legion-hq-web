/**
 * Do some basic checks on cards.json data to make sure manual steps aren't getting messed up
 */

import fs from "fs-extra";
import appKeywords from "../src/constants/keywords.js";
import cards, {cardIdsByType} from '../src/constants/cards.js'
import _ from 'lodash';

const args = process.argv.slice(2);

// import {getEquippableUpgrades} from '../src/components/eligibleCardListGetter';
async function cardsJsonCheck() {

  const cardIds = Object.getOwnPropertyNames(cards);
  const cardTypes = Object.getOwnPropertyNames(cardIdsByType);

  const fixWeapon= (id)=>{
    const c = cards[id];

    let weapons = c.weapons;

    if(weapons){
      weapons.forEach(w=>{

        let range = w.range;
        let newRange = range.split('-').map(r=>parseInt(r));

        if(w.type === 'a'){
          newRange = [0];
        }

        w.type = undefined;
        Object.getOwnPropertyNames(w.dice).forEach(n=>{
          if(w.dice[n] === null)
            w.dice[n]=0
          })

        w.range = newRange


      })
    }

  }

  cardIdsByType.unit.forEach(id=>{

    fixWeapon(id);
    
  })

    cardIdsByType.upgrade.forEach(id=>{

    fixWeapon(id);
    
  })

    cardIdsByType.command.forEach(id=>{

    fixWeapon(id);
    
  })


  fs.writeFileSync("newJson.json", JSON.stringify(cards, (k,v)=>{
    if(v instanceof Array && v.length > 0 && Number.isInteger(v[0])){
      return v;
    }
    else return v;
  }, 2)); 

}

await cardsJsonCheck();
