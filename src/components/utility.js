import battleForcesDict from "constants/battleForcesDict";
import cards from "constants/cards";

const makeModifiedCard = (unitCardId, upgradesEquipped, faction, battleForce) =>{

  let forceAffinity = getForceAffinity(faction, battleForce);

  const unitCardCopy = JSON.parse(JSON.stringify(cards[unitCardId]));

  // TODO not great, still better than alternatives I can think of rn
  // should be assigned at unit construction
  unitCardCopy.forceAffinity = forceAffinity;

  // TODO worse; quick+dirty way to get imp remnant working; should probably have an 'effectiveRank' field
  if (battleForce) {
    if (
      battleForcesDict[battleForce]?.rules?.buildsAsCorps?.includes(unitCardId)
    ) {
      unitCardCopy.rank = "corps";
    }
  }

  // TODO maybe this should be something done 'regularly' and displayed by upgrades, e.g. when Situational Awareness gives a unit Outmaneuver
  // problem is, there's no real distinction, afaik, between keyword tags where keys get permanantly added vs contextually added or just referred to
  upgradesEquipped.forEach((id) => {
    if (id == null) return;
    let upgradeCard = cards[id];
    upgradeCard.keywords.forEach((k) => {
      if (k !== null) {
        if (k.isPermanent) {
          unitCardCopy.keywords.push(k);
        }
      }
    });
    // TODO this will break if you use a nested changeCard, get more intelligent reassignment for that, should it come to pass
    if(upgradeCard.changeCard){
      Object.assign(unitCardCopy, upgradeCard.changeCard)
    }
  });

  // TODO bad...
  for (let i = 0; i < unitCardCopy.keywords.length; i++) {
    if (unitCardCopy.keywords[i].name) {
      unitCardCopy.keywords[i] = unitCardCopy.keywords[i].name;
    }
  }

  return unitCardCopy;
}

const getForceAffinity = (faction, battleForce)=>{

  let forceAffinity = "dark side";
  if (faction === "rebels" || faction === "republic")
    forceAffinity = "light side";
  else if (faction === "mercenary")
    forceAffinity = battleForcesDict[battleForce].forceAffinity;

  return forceAffinity;
}


export{
  makeModifiedCard,
  getForceAffinity
}