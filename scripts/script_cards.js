// Duplicate of LHQ's card so we can run it with node (ie node scripts need 'with... json' which breaks LHQ code)

import CardsJson from '../src/constants/cards.json' with {type:'json'}

const cards = JSON.parse(JSON.stringify(CardsJson));

const cardIdsByType = {};
const upgradeIdsBySubtype = {};

Object.keys(cards).forEach(id=>{
  const type = cards[id].cardType;
  if(!cardIdsByType[type]){
    cardIdsByType[type] = [];
  }
  cardIdsByType[type].push(id);


  if(type === 'upgrade'){
    const subtype = cards[id].cardSubtype;
    if(!upgradeIdsBySubtype[subtype]){
      upgradeIdsBySubtype[subtype] = [];
    }
    upgradeIdsBySubtype[subtype].push(id);  }

});

export {cardIdsByType, upgradeIdsBySubtype};
export default cards;

