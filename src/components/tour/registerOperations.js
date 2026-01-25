// TODO make an informed decision on how to arrange all this ToD stuff

import cards from "constants/cards";
import { areRequirementsMet } from "../eligibleCardListGetter";
import register from "constants/register";

// For now, make a folder to keep it more obviously separate; see if there ought to be more files and etc
// might be better to mimic/delineate like the regular 'components' classes, tbd


function getUnitDossier(list, unitIndex){

  if(unitIndex >= list.units.length){
    return null;
  }

  let unit = list.units[unitIndex];

  if(!unit.dossier){
    unit.dossier = {
      xp: 0,
      level: 0,
      setbacks:[],
      commendations:[]
    };
  }

  return unit.dossier;

}

function addUpdateDossierItem(list, unitIndex, type, dossierItem){
  
  let dossier = getUnitDossier(list, unitIndex);

  let findIndex = dossier[type].findIndex(n=>n.substring(0, dossierItem.name.length) === dossierItem.name);

  // if we already have this item on the dossier
  if(findIndex != -1){
    // No-op if not allowing multiples
    if(!dossierItem.multiple){
      return list;
    }
    // else, increment the count for the item
    else{
      let item = dossier[type][findIndex];
      let lastSpace = item.lastIndexOf(" ");
      let count = parseInt(item.substring(lastSpace+1)) + dossierItem.count;

      dossier[type][findIndex] = dossierItem.name + " " + count;
    }
  } else{ // else it's a new item, add it!

    let name = dossierItem.name;
    if(dossierItem.multiple){
      name += " " + dossierItem.count;
    }

    dossier[type].push(name);
  }

  return list;
}

function removeDossierItem(list, unitIndex, type, itemIndex){
  let dossier = getUnitDossier(list, unitIndex);

  dossier[type].splice(itemIndex, 1);

  return list;
}

function updateDossierXp(list, unitIndex, value){
    let dossier = getUnitDossier(list, unitIndex);
    dossier.xp = value;

    let starts = [0,5,13,25,40,50];

    for(let i=starts.length-1; i>=0; i--){
      if(dossier.xp >= starts[i]){
        dossier.level = i;
        break;
      }
      
    }

    return list;
}


function getEligibleRegisterItems(list, unitIndex, type){

  const validCommendations = [];
  const unit = list.units[unitIndex];

  if(!unit || !unit.unitId)return [];

  const unitCard = cards[unit.unitId];
  const unitCardCopy = JSON.parse(JSON.stringify(unitCard));

  // TODO maybe this should be something done 'regularly' and displayed by upgrades, e.g. when Situational Awareness gives a unit Outmaneuver
  // problem is, there's no real distinction, afaik, between keyword tags where keys get permanantly added vs contextually added or just referred to
  unit.upgradesEquipped.forEach(id=>{
    if(id == null) return;
    let upgradeCard = cards[id];
    upgradeCard.keywords.forEach(k=>{
      if(k!==null){
        if(k.isPermanent){
          unitCardCopy.keywords.push(k);
        }
      }
    })
  })

  var itemList;
  switch(type){
    case "commendations":
      itemList = register.commendations;
      break;
    case "setbacks":
      itemList = register.setbacks;
      break;
    default:
      return [];
      break;
  }

  for (let i = 0; i < itemList.length; i++) {

    const item = itemList[i];
    let dossier = getUnitDossier(list, unitIndex);

    if (dossier[type].find(n=>n === item.name && !item.multiple)) continue;
    // The 'normal' way to check for an upgrade - see if the unit meets the upgrade's requirements
    if (!item.requirements || areRequirementsMet(item.requirements, unitCardCopy)) {
      // console.log('req check ', JSON.stringify(commendation));
      validCommendations.push(item);
    } 
  }
  return validCommendations;
}

function getEligibleCommendations(list, unitIndex){

  return getEligibleRegisterItems(list, unitIndex, "commendations");
}


function getEligibleSetbacks(list, unitIndex){
    return getEligibleRegisterItems(list, unitIndex, "setbacks");
}
export{
  
  getUnitDossier,
  addUpdateDossierItem,
  removeDossierItem,
  getEligibleCommendations,
  getEligibleSetbacks,
  updateDossierXp
}