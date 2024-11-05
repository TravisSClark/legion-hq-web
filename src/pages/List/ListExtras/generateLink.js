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
    if (unit.loadoutUpgrades && unit.loadoutUpgrades.length > 0) {
      urlString += '_';
      unit.loadoutUpgrades.forEach((upgradeId, i) => {
        urlString += unit.loadoutUpgrades[i] ? `${unit.loadoutUpgrades[i]}` : '0';
      });
    }
    if (unit.counterpart) {
      const { counterpart } = unit;
      urlString += `+1${counterpart.counterpartId}`;
      counterpart.upgradesEquipped.forEach((upgradeId, i) => {
        urlString += upgradeId ? upgradeId : '0';
      });
      if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades.length > 0) {
        urlString += '_';
        counterpart.loadoutUpgrades.forEach((upgradeId, i) => {
          urlString += counterpart.loadoutUpgrades[i] ? counterpart.loadoutUpgrades[i] : '0';
        });
      }
    }
    urlStrings.push(urlString);
  });
  list.commandCards.forEach(commandId => urlStrings.push(commandId));

  if (list.commandCards.length < 6) {
    for (let i = 0; i < 6 - list.commandCards.length; i++) {
      urlStrings.push('');
    }
  }
  if (list.contingencies)
    list.contingencies.forEach(commandId => urlStrings.push(commandId));

  if(list.isUsingOldPoints){
    list.objectiveCards.forEach(i => urlStrings.push(i));
    list.deploymentCards.forEach(i => urlStrings.push(i));
    list.conditionCards.forEach(i => urlStrings.push(i));
  }else{
    list.primaryCards.forEach(i => urlStrings.push(i));
    list.secondaryCards.forEach(i => urlStrings.push(i));
    list.advantageCards.forEach(i => urlStrings.push(i));
  }
  if (list.battleForce) {
    let bf = battleForcesDict[list.battleForce];

    return `${urls.listPath}/${list.faction}/${points}:${bf.linkId}:${urlStrings.join(',')}`;
  }
  return `${urls.listPath}/${list.faction}/${points}:${urlStrings.join(',')}`;
}

export default generateLink;
