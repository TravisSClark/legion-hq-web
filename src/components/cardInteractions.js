import cards from 'constants/cards';

function checkUpgradeName(upgrade, values) {
  if (Array.isArray(values)) {
    let isConditionMet = false;
    values.forEach(value => {
      if (upgrade.cardName.includes(value)) isConditionMet = true;
    });
    return isConditionMet;
  } else {
    return upgrade.cardName.includes(values);
  }
}

function checkUpgradeType(upgrade, value) {
  return upgrade.cardSubtype === value;
}

// TODO see about either moving these or getting the pointDeltas to show in builder
const interactions = {
  upgradePoints: {
    lu: {
      // Jyn's Blaster + Jyn Erso
      isConditionMet: (list, unit) => list.units.map(u=>u.unitId).includes('ae'),
      pointDelta: -5
    }
  },
  eligibility: {
    gx: {
      // B1 Battle droids + Electrobinoculars
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, 'gear'),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ['Electrobinoculars', 'Portable Scanner'])
    }
  }
};

export default interactions
