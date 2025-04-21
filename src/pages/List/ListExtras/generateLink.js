import urls from 'constants/urls';
import battleForcesDict from 'constants/battleForcesDict';
import legionModes from 'constants/legionModes';

function generateLink(list) {
  const urlStrings = [];
  
  const points = legionModes[list.mode].maxPoints;

  list.units.forEach(unit => {
    let urlString = `${unit.count}${unit.unitId}`;
    unit.upgradesEquipped.forEach((upgradeId, i) => {
      urlString += upgradeId ? upgradeId : '0';
    });
    if (unit.counterpart) {
      const { counterpart } = unit;
      urlString += `+1${counterpart.counterpartId}`;
      counterpart.upgradesEquipped.forEach((upgradeId, i) => {
        urlString += upgradeId ? upgradeId : '0';
      });
    }
    urlStrings.push(urlString);
  });
  list.commandCards.forEach(commandId => urlStrings.push(commandId));

  if (list.contingencies)
    list.contingencies.forEach(commandId => urlStrings.push(commandId));

  [list.primaryCards, list.secondaryCards, list.advantageCards].forEach(bArray=>{
    bArray.forEach(id=>{
      if(id) urlStrings.push(id);
    });
  });

  if (list.battleForce) {
    let bf = battleForcesDict[list.battleForce];

    return `${urls.listPath}/${list.faction}/${points}:${bf.linkId}:${urlStrings.join(',')}`;
  }
  return `${urls.listPath}/${list.faction}/${points}:${urlStrings.join(',')}`;
}

export default generateLink;
