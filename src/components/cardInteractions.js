import _ from "lodash";

function getSpecialSlots(unitCard){

  let specialSlots = [];
  interactions.specialSlotEligibility.forEach(slot=>{

    let hasSlot = false;
    if(slot.eligibility && _.isMatch(unitCard, slot.eligibility) || 
      (slot.keyword && _.find(unitCard.keywords, (k)=>slot.keyword === k || slot.keyword === k.name))){
      hasSlot = true;
    }

    if(hasSlot){
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
  // *Maybe* these should be tied to the upgrade card data, but I think it's better to use this array instead of rifling the upgrade deck
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
    {
      // Unit with Speeder + Strike and Fade
      keyword:"Speeder", 
      type:"training",
      upgrades:["Bk"]
    },
    {
      // Unit with Transport + Door Gunners
      keyword:"Transport", 
      type:"crew",
      upgrades:["Bv"]
    },
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