/**
 * Do some basic checks on cards.json data to make sure manual steps aren't getting messed up
 */

import fs from "fs-extra";
import appKeywords from "../src/constants/keywords.js";
import cards, {cardIdsByType} from './script_cards.js'
import _ from 'lodash';

const args = process.argv.slice(2);

// import {getEquippableUpgrades} from '../src/components/eligibleCardListGetter';
async function cardsJsonCheck() {

  const cardIds = Object.getOwnPropertyNames(cards);
  const cardTypes = Object.getOwnPropertyNames(cardIdsByType);

  // modifies obj to remove empty keywords
  const fixKeywords = (obj) => {
    const keywords = obj.keywords;

    if(!keywords || !Array.isArray(keywords)){
      return;
    }

    for(let i =0; i< keywords.length; i++){
      let kw = keywords[i];

      if(kw.name == '' && kw.value == ''){
        obj.keywords.splice(i, 1);
        i--;
        console.log('fix keyword for ', obj.name);
      }

      if(kw.name &&  kw.name.includes(',')){
        // console.log('split candidate', kw);
        let split = kw.name.split(',');

        obj.keywords[i] = {name: split[0], value:0}
        for(let splitIdx=1; splitIdx<split.length; splitIdx++){
          obj.keywords.push({name: split[splitIdx], value:0});
        }
      }
    }
  }

  const fixWeapon= (id)=>{
    const c = cards[id];

    let weapons = c.weapons;

    if(weapons){
      weapons.forEach(w=>{

        fixKeywords(w);
        let range = w.range;
        if(Array.isArray(range)){
          return;
        }

        if(!range || !range.split){
          console.log('no range for weapon', w.id, w.name);
          return;
        }
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
    const c = cards[id];
    fixKeywords(c);

    fixWeapon(id);
  })

  cardIdsByType.upgrade.forEach(id=>{
    const c = cards[id];
    fixKeywords(c);
    fixWeapon(id);
    
  })

  cardIdsByType.command.forEach(id=>{
    const c = cards[id];
    fixKeywords(c);
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
