import cards from "constants/cards";

function checkUpgradeName(upgrade, values) {
  if (Array.isArray(values)) {
    let isConditionMet = false;
    values.forEach((value) => {
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
      isConditionMet: (list, unit) =>
        list.units.map((u) => u.unitId).includes("ae"),
      pointDelta: -5,
    },
  },
  eligibility: {
    gx: {
      // B1 Battle droids + Electrobinoculars
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "gear"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Electrobinoculars", "Portable Scanner"]),
    },
    az: {
      // Snows + Imperial March
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Imperial March"]),
    },
    ay: {
      // Storms + Imperial March
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Imperial March"]),
    },
    ap: {
      // Airspeeder + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    aq: {
      // Landspeeder + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    bf: {
      // Speeder Bike + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    ic: {
      // BARC + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    mc: {
      // STAP + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    qh: {
      // Flutter + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    sq: {
      // Swoop + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    xf: {
      // Attack Craft + Strike and Fade
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Strike and Fade"]),
    },
    bh: {
      // GAV + Door Gunners
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "crew"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Door Gunners"]),
    },
    on: {
      // LAATe + Door Gunners
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "crew"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Door Gunners"]),
    },
    oo: {
      // LAATr + Door Gunners
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "crew"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Door Gunners"]),
    },
    qt: {
      // Snail + Door Gunners
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "crew"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Door Gunners"]),
    },
    an: {
      // FD + Dug In
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Dug In"]),
    },
    be: {
      // EWeb + Dug In
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Dug In"]),
    },
    ft: {
      // Mortar + Dug In & Imperial March
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) =>
        checkUpgradeName(upgrade, ["Dug In", "Imperial March"]),
    },
    if: {
      // Mark II + Dug In
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, "training"),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ["Dug In"]),
    },
  },
};

export default interactions;
