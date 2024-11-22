import React from 'react';
import _ from 'lodash';
import cards from 'constants/cards';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import interactions from 'components/cardInteractions';
import listTemplate from 'constants/listTemplate';

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
        if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
          const loadoutCard = cards[unit.loadoutUpgrades[j]];
          unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
          unitText.push(`/${loadoutCard.cardName} (${loadoutCard.cost})`);
          unitText.push(<br/>);
        } else {
          unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
          unitText.push(<br/>);
        }
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
