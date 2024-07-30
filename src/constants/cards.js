import CardsJson from './cards.json';

const cards = JSON.parse(JSON.stringify(CardsJson));

const cardIdsByType = {
};

Object.keys(cards).forEach(id=>{
  const type = cards[id].cardType;
  if(!cardIdsByType[type]){
    cardIdsByType[type] = [];
  }
  cardIdsByType[type].push(id);
});

export {cardIdsByType as cardsIdsByType};
export default cards;

