import urls from 'constants/urls';
import battleForcesDict from 'constants/battleForcesDict';

function generateLink(list) {
  const urlStrings = [];
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
  // list.objectiveCards.forEach(objectiveId => urlStrings.push(objectiveId));
  // list.deploymentCards.forEach(deploymentId => urlStrings.push(deploymentId));
  // list.conditionCards.forEach(conditionId => urlStrings.push(conditionId));
  list.primaryCards.forEach(primaryId => urlStrings.push(primaryId));
  list.secondaryCards.forEach(secondaryId => urlStrings.push(secondaryId));
  list.advantageCards.forEach(advantageId => urlStrings.push(advantageId));
  if (list.battleForce) {
    let bf = battleForcesDict[list.battleForce];

    return `${urls.listPath}/${list.faction}/${bf.linkId}:${urlStrings.join(',')}`;
  }
  return `${urls.listPath}/${list.faction}/${urlStrings.join(',')}`;
}

export default generateLink;
