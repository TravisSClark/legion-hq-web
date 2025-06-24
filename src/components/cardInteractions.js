import cards from "constants/cards";
import _ from "lodash";

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

function getSpecialSlots(unitCard){

  let specialSlots = [];
  interactions.specialSlotEligibility.forEach(slot=>{
    if(_.isMatch(unitCard, slot.eligibility)|| (slot.keyword && _.find(unitCard.keywords, (k)=>slot.keyword === k || slot.keyword === k.name))){
      specialSlots.push(slot);
    }
  })

  return specialSlots;
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

  // Determines if a unit gets a bonus slot for a given upgrade type, the 'may equip even if you don't have slot' thing for binocs and imp march
  specialSlotEligibility:[
    {
      // Imperial March
      eligibility:{
        "rank" :"corps",
        "faction":"empire"
      }, 
      type:"training",
      upgrades:["Bo"]
    },

    {
      // B1s + Binocs
      eligibility:{
        "cardName" :"B1 Battle Droids",
      }, 
      type:"gear",
      upgrades:["hy"]
    },
    {
      // B1s + Scanner
      eligibility:{
        "cardName" :"B1 Battle Droids",
      }, 
      type:"gear",
      upgrades:["mr"]
    },
    // {
    //   // Unit with Speeder + Strike and Fade
    //   keyword:"Speeder", 
    //   type:"training",
    //   upgrades:["Bk"]
    // },
    // {
    //   // Unit with Transport + Door Gunners
    //   keyword:"Transport", 
    //   type:"crew",
    //   upgrades:["Bv"]
    // },
    {
      // TODO this breaks if we get a non-trooper with PP
      // Emplacement Trooper OR Trooper w prepared position + Dug in
      keyword:"Prepared Position", 
      type:"training",
      eligibility:{cardSubtype:"emplacement trooper"},
      upgrades:["Bq"]
    },
  ],
};

export default interactions;
export {getSpecialSlots}