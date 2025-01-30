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
    lk: {
      // JT-12 Jetpack + Captain Rex
      isConditionMet: (list, unit) => unit.unitId === 'fy',
      pointDelta: -5
    },
    lu: {
      // Jyn's Blaster + Jyn Erso
      isConditionMet: (list, unit) => list.units.map(u=>u.unitId).includes('ae'),
      pointDelta: -5
    },
    li: {
      // Situational Awareness + support unit
      isConditionMet: (list, unit) => cards[unit.unitId].rank === 'support',
      pointDelta: 4
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
