import React from 'react';
import _ from 'lodash';
import cards from 'constants/cards';


function generateUnitComponent(unit, index) {
  let unitText = [];
  const unitCard = cards[unit.unitId];
  if (unit.count === 1) {
    if (unit.unitId === 'pz') { // Kraken
      unitText.push(`${unitCard.cardName} - Kraken (${unit.totalUnitCost})`);
    } else if (unit.unitId === 'pz') { // Kalani
      unitText.push(`${unitCard.cardName} - Kalani (${unit.totalUnitCost})`);
    } else {
      unitText.push(`${unitCard.cardName} (${unit.totalUnitCost})`);
    }
    unitText.push(<br/>)
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      if (unit.upgradesEquipped[j]) {
        const upgradeCard = cards[unit.upgradesEquipped[j]];
        unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
        unitText.push(<br/>);
      }
    }
  }
  return <div key={`${unit.unitHash}_${index}`}>{unitText}<br/></div>;
}

function HtmlListText({ list }) {
  return (
    <div>
      <b>{list.title ? list.title : 'Untitled'}</b>
      <br/>
      {list.units.map((unit, index) => {
        return generateUnitComponent(unit, index);
      })}
    </div>
  );
};

export default HtmlListText;
