import _ from 'lodash';
import cards, {cardsIdsByType as cardIdsByType} from 'constants/cards';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import interactions from 'constants/cardInteractions';
import listTemplate from 'constants/listTemplate';
import battleForcesDict from 'constants/battleForcesDict';

function countPoints(list) {
  list.pointTotal = 0;
  list.units.forEach((unit, unitIndex) => {
    const unitCard = cards[unit.unitId];
    if (list.isUsingOldPoints) {
      unit.totalUnitCost = unitCard.prevCost ? unitCard.prevCost : unitCard.cost;
    } else unit.totalUnitCost = unitCard.cost;
    
    unit.upgradeInteractions = {};
    unit.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (list.isUsingOldPoints) {
          unit.totalUnitCost += upgradeCard.prevCost ? upgradeCard.prevCost : upgradeCard.cost;
        } else unit.totalUnitCost += upgradeCard.cost;
        if (upgradeId in interactions.upgradePoints) {
          const interaction = interactions.upgradePoints[upgradeId];
          if (interaction.isConditionMet(list, unit)) {
            unit.totalUnitCost += interaction.pointDelta;
            unit.upgradeInteractions[upgradeId] = interaction.pointDelta;
          }
        }
      }
    });
    if(unit.counterpart){
      const counterpartCard = cards[unit.counterpart.counterpartId];
      if (list.isUsingOldPoints) {
        unit.counterpart.totalUnitCost = counterpartCard.prevCost ? counterpartCard.prevCost : counterpartCard.cost;
      } else unit.counterpart.totalUnitCost = counterpartCard.cost;

      unit.counterpart.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId) {
          const upgradeCard = cards[upgradeId];
          if (list.isUsingOldPoints) {
            unit.counterpart.totalUnitCost += upgradeCard.prevCost ? upgradeCard.prevCost : upgradeCard.cost;
          } else unit.counterpart.totalUnitCost += upgradeCard.cost;
        }
      });
      // list.pointTotal += unit.counterpart.totalUnitCost;
      list.uniques.push(unit.counterpart.counterpartId);

      unit.totalUnitCost += unit.counterpart.totalUnitCost;
    }

    unit.totalUnitCost *= unit.count;
    list.pointTotal += unit.totalUnitCost;
  });

  return list;
}

function toggleUsingOldPoints(list) {
  if (!list.isUsingOldPoints) list.isUsingOldPoints = true;
  else list.isUsingOldPoints = false;
  return countPoints(list);
}

function rehashList(list) {
  const unitObjectStrings = [];
  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];
    let unitObjectString = unitCard.id;
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        unitObjectString += upgradeId;
      }
    }
    unitObjectStrings.push(unitObjectString);
  }
  list.unitObjectStrings = unitObjectStrings;
  return list;
}

/**
 * Lots of various reduction and housekeeping things. 
 * E.g. remove Contingencies deck if you no longer have
 * @param {} list 
 * @returns 
 */
 // TODO need to specialize this; should at least be a on-upgrade and on-unit fire, not this whole big thing
function consolidate(list) {
  let hasContingencyKeyword = false;
  list.hasFieldCommander = false;
  list.commanders = [];
  list.uniques = [];
  list.unitCounts = { ...listTemplate.unitCounts };
  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    if (!unit.loadoutUpgrades) unit.loadoutUpgrades = [];
    const unitCard = cards[unit.unitId];
    unit.hasUniques = false;
    if (unitCard.isUnique) {
      list.uniques.push(unitCard.id);
      unit.hasUniques = true;
    }
    if (unitCard.keywords.includes('Contingencies')) hasContingencyKeyword = true;
    if (unitCard.rank === 'commander' || unitCard.rank === 'operative' || unitCard.isUnique) {
      list.commanders.push(unitCard.cardName);
    }
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.isUnique) {
          list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
        }
        if (upgradeCard.keywords.includes('Field Commander')) {
          list.hasFieldCommander = true;
        }
      }
    }
    for (let j = 0; j < unit.loadoutUpgrades.length; j++) {
      const upgradeId = unit.loadoutUpgrades[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.isUnique) {
          list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
        }
      }
    }

    list.unitCounts[unitCard.rank] += unit.count;
    
    // if (unitCard.associate){
    //   if(list.units.find(u => u.unitId === unitCard.associate) !== undefined){
    //     list.unitCounts[unitCard.rank]--;
    //   }
    // }
    if (unit.unitId === 'rc' && unit.upgradesEquipped.includes('rq')) { // Maul + Darksaber interaction
      list.unitCounts['commander']++;
      list.unitCounts['operative']--;
    }
    if(battleForcesDict[list.battleForce]?.rules?.buildsAsCorps?.includes(unit.unitId)){
      list.unitCounts[unitCard.rank] -= unit.count;
      list.unitCounts['corps'] += unit.count;
    } 
  }
  for (let i = list.commandCards.length - 1; i > -1 ; i--) {
    const { commander } = cards[list.commandCards[i]];
    if (commander && !list.commanders.includes(commander)) {
      list = removeCommand(list, i);
    }
  }
  if (list.contingencies) {
    for (let i = list.contingencies.length - 1; i > -1; i--) {
      const { commander } = cards[list.contingencies[i]];
      if (commander && !list.commanders.includes(commander)) {
        list = removeContingency(list, i);
      }
    }
  }
  if (!list.battleForce) list.battleForce = '';
  if (!hasContingencyKeyword) list.contingencies = [];
  list.commandCards = sortCommandIds(list.commandCards);
  return countPoints(list);
}

function getNumActivations(list) {
  return list.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);
}

function printMissionCards(missionArray, label){
  
  if (missionArray.length > 0) {
    let objectives = label + ':\n';
    missionArray.forEach((id, i) => {
        const card = cards[id];
        objectives += ` - ${card.cardName}\n`;
    });
    return objectives;
  }
  return '';
}
function generateTournamentText(
  list, showPoints = true, showCommands = false, showBattles = false
) {
  let header = `${list.title ? list.title : 'Untitled'}\n`;
  header += `${list.pointTotal}/${legionModes[list.mode].maxPoints}\n`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    if (unit.count === 1) {
      if (unit.unitId === 'pz') { // Kraken
        units += `${unitCard.cardName} - Kraken (${unit.totalUnitCost})\n`;
      } else if (unit.unitId === 'qa') { // Kalani
        units += `${unitCard.cardName} - Kalani (${unit.totalUnitCost})\n`;
      } else {
        units += `${unitCard.cardName} (${unit.totalUnitCost})\n`;
      }
      for (let j = 0; j < unit.upgradesEquipped.length; j++) {
        if (unit.upgradesEquipped[j]) {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
            const loadoutCard = cards[unit.loadoutUpgrades[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
            units += `/${loadoutCard.cardName} (${loadoutCard.cost})\n`;
          } else {
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})\n`;
          }
        }
      }
      if (unit.counterpart) {
        const { counterpart } = unit;
        const counterpartCard = cards[counterpart.counterpartId];
        units += `${counterpartCard.cardName} (${unit.counterpart.totalUnitCost})\n`;
        for (let j = 0; j < counterpart.upgradesEquipped.length; j++) {
          if (counterpart.upgradesEquipped[j]) {
            const upgradeCard = cards[counterpart.upgradesEquipped[j]];
            if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades[j]) {
              const loadoutCard = cards[counterpart.loadoutUpgrades[j]];
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
              units += `/${loadoutCard.cardName} (${loadoutCard.cost})\n`;
            } else {
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})\n`;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < unit.count; i++) {
        units += `${unitCard.cardName} (${unit.totalUnitCost / unit.count})\n`;
        for (let j = 0; j < unit.upgradesEquipped.length; j++) {
          if (unit.upgradesEquipped[j]) {
            const upgradeCard = cards[unit.upgradesEquipped[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})\n`;
          }
        }
      }
    }
  });
  let commands = '';
  list.commandCards.forEach(commandId => {
    let pips = '••••';
    const commandCard = cards[commandId];
    if (commandCard.cardSubtype === '1') pips = '•';
    else if (commandCard.cardSubtype === '2') pips = '••';
    else if (commandCard.cardSubtype === '3') pips = '•••';
    commands += `${pips}${commandCard.cardName}\n`;
  });
  if (commands !== '') {
    commands = `\nCommands:\n${commands}`;
    commands += '••••Standing Orders\n';
  }
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies = '\nContingencies:\n';
    list.contingencies.forEach(commandId => {
      let pips = '••••';
      const commandCard = cards[commandId];
      if (commandCard.cardSubtype === '1') pips = '•';
      else if (commandCard.cardSubtype === '2') pips = '••';
      else if (commandCard.cardSubtype === '3') pips = '•••';
      contingencies += `${pips}${commandCard.cardName}\n`;
    });
  }

  let battleDeck = '';

  if(list.isUsingOldPoints){
    battleDeck += printMissionCards(list.objectiveCards, "Objectives");
    battleDeck += printMissionCards(list.deploymentCards, "Deployments");
    battleDeck += printMissionCards(list.conditionCards, "Conditions");
  }
  else{
    battleDeck += printMissionCards(list.primaryCards, "Objectives");
    battleDeck += printMissionCards(list.secondaryCards, "Secondaries");
    battleDeck += printMissionCards(list.advantageCards, "Advantages");
  }

  if(battleDeck.length > 0){
    battleDeck = `\nBattle Deck\n` + battleDeck;
  }
  
  return header + units + commands + contingencies + battleDeck;
}

function generateMissionCardHTML(cardList, label){
  if (cardList.length > 0) {
    let objectives = label + ':<br>';
    cardList.forEach((id, i) => {
      objectives += ` - ${cards[id].cardName}<br>`;
      return objectives;
    });
  }else{
    return '';
  }
  
}

function generateHTMLText(
  list, showPoints = true, showCommands = false, showBattles = false
) {
  let header = `${list.title ? list.title : 'Untitled'}<br>`;
  header += `${list.pointTotal}/${legionModes[list.mode].maxPoints}<br>`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    if (unit.count === 1) {
      if (unit.unitId === 'pz') { // Kraken
        units += `${unitCard.cardName} - Kraken (${unit.totalUnitCost})<br>`;
      } else if (unit.unitId === 'pz') { // Kalani
        units += `${unitCard.cardName} - Kalani (${unit.totalUnitCost})<br>`;
      } else {
        units += `${unitCard.cardName} (${unit.totalUnitCost})<br>`;
      }
      for (let j = 0; j < unit.upgradesEquipped.length; j++) {
        if (unit.upgradesEquipped[j]) {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
            const loadoutCard = cards[unit.loadoutUpgrades[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
            units += `/${loadoutCard.cardName} (${loadoutCard.cost})<br>`;
          } else {
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})<br>`;
          }
        }
      }
      if (unit.counterpart) {
        const { counterpart } = unit;
        const counterpartCard = cards[counterpart.counterpartId];
        units += `${counterpartCard.cardName} (${unit.counterpart.totalUnitCost})\n`;
        for (let j = 0; j < counterpart.upgradesEquipped.length; j++) {
          if (counterpart.upgradesEquipped[j]) {
            const upgradeCard = cards[counterpart.upgradesEquipped[j]];
            if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades[j]) {
              const loadoutCard = cards[counterpart.loadoutUpgrades[j]];
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
              units += `/${loadoutCard.cardName} (${loadoutCard.cost})<br>`;
            } else {
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})<br>`;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < unit.count; i++) {
        units += `${unitCard.cardName} (${unit.totalUnitCost / unit.count})<br>`;
        for (let j = 0; j < unit.upgradesEquipped.length; j++) {
          if (unit.upgradesEquipped[j]) {
            const upgradeCard = cards[unit.upgradesEquipped[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})<br>`;
          }
        }
      }
    }
  });
  let commands = '';
  list.commandCards.forEach(commandId => {
    let pips = '••••';
    const commandCard = cards[commandId];
    if (commandCard.cardSubtype === '1') pips = '•';
    else if (commandCard.cardSubtype === '2') pips = '••';
    else if (commandCard.cardSubtype === '3') pips = '•••';
    commands += `${pips}${commandCard.cardName}<br>`;
  });
  if (commands !== '') {
    commands = `<br>Commands:<br>${commands}`;
    commands += '••••Standing Orders<br>';
  }
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies = '<br>Contingencies:<br>';
    list.contingencies.forEach(commandId => {
      let pips = '••••';
      const commandCard = cards[commandId];
      if (commandCard.cardSubtype === '1') pips = '•';
      else if (commandCard.cardSubtype === '2') pips = '••';
      else if (commandCard.cardSubtype === '3') pips = '•••';
      contingencies += `${pips}${commandCard.cardName}<br>`;
    });
  }

  let battleDeck = '';
  if(list.isUsingOldPoints){
    battleDeck += generateMissionCardHTML(list.objectiveCards, "Objectives");
    battleDeck += generateMissionCardHTML(list.deploymentCards, "Deployments");
    battleDeck += generateMissionCardHTML(list.conditionsCards, "Conditions");
  }else{
    battleDeck += generateMissionCardHTML(list.primaryCards, "Primaries");
    battleDeck += generateMissionCardHTML(list.secondaryCards, "Secondaries");
    battleDeck += generateMissionCardHTML(list.advantageCards, "Advantages");

  }
  
  if(battleDeck.length > 0){
    battleDeck =  `<br>Battle Deck<br>` + battleDeck;
  }
  return '<html><p>' + header + units + commands + contingencies + battleDeck + '</p></html>';
}


// • × •

function generateStandardText(list) {
  let header = list.title ? list.title : 'Untitled';
  let points = `\n${list.pointTotal}/${legionModes[list.mode].maxPoints}`;
  const numActivations = getNumActivations(list)
  points += ` (${numActivations} activation${numActivations === 1 ? '' : 's'})\n`;
  let commander = '';
  let counterpart = '';
  let operative = '';
  let corps = '';
  let special = '';
  let support = '';
  let heavy = '';
  const unitLine = (unit) => {
    const id = unit.unitId ? unit.unitId : unit.counterpartId;
    const unitCard = cards[id];
    let line = ' - ';
    if (unit.count > 1) line += `${unit.count}× `;
    line += unitCard.displayName ? unitCard.displayName : unitCard.cardName;
    if (unitCard.cost !== unit.totalUnitCost) {
      line += ` (${unitCard.cost}): `;
      unit.upgradesEquipped.forEach((upgradeId, i) => {
        if (!upgradeId) return;
        const upgradeCard = cards[upgradeId];
        if (unit.loadoutUpgrades && unit.loadoutUpgrades[i]) {
          const loadoutCard = cards[unit.loadoutUpgrades[i]];
          line += upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName;
          line += ` (${upgradeCard.cost})/`;
          line += loadoutCard.displayName ? loadoutCard.displayName : loadoutCard.cardName;
          line += ` (${loadoutCard.cost}), `;
        } else {
          line += upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName;
          line += ` (${upgradeCard.cost}), `;
        }
      });
      line = line.substring(0, line.length - 2)
      line += ` = ${unit.totalUnitCost}`;
    } else line += ` = ${unitCard.cost}`;
    return line + '\n';
  }
  list.units.forEach((unit, i) => {
    const unitCard = cards[unit.unitId];
    if (unit.counterpart) counterpart += unitLine(unit.counterpart);
    if (unitCard.rank === 'commander') commander += unitLine(unit);
    if (unitCard.rank === 'operative') operative += unitLine(unit);
    if (unitCard.rank === 'corps') corps += unitLine(unit);
    if (unitCard.rank === 'special') special += unitLine(unit);
    if (unitCard.rank === 'support') support += unitLine(unit);
    if (unitCard.rank === 'heavy') heavy += unitLine(unit);
  });
  let units = '';
  if (commander) units += `Commanders:\n${commander}`;
  if (counterpart && list.faction === 'empire') units += `Counterparts:\n${counterpart}`;
  if (operative) units += `Operative:\n${operative}`;
  if (counterpart && list.faction !== 'empire') units += `Counterparts:\n${counterpart}`;
  if (corps) units += `Corps:\n${corps}`;
  if (special) units += `Special Forces:\n${special}`;
  if (support) units += `Support:\n${support}`;
  if (heavy) units += `Heavy:\n${heavy}`;

  let commands = '\nCommands: ';
  list.commandCards.forEach(id => {
    const commandCard = cards[id];
    if (commandCard.cardSubtype === '1') commands += '• ';
    else if (commandCard.cardSubtype === '2') commands += '•• ';
    else if (commandCard.cardSubtype === '3') commands += '••• ';
    else commands += '•••• ';
    commands += `${commandCard.cardName}, `;
  });
  if (commands !== '') commands += '•••• Standing Orders';
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies += '\nContingencies: ';
    list.contingencies.forEach(id => {
      const commandCard = cards[id];
      if (commandCard.cardSubtype === '1') contingencies += '• ';
      else if (commandCard.cardSubtype === '2') contingencies += '•• ';
      else if (commandCard.cardSubtype === '3') contingencies += '••• ';
      else contingencies += '•••• ';
      contingencies += `${commandCard.cardName}, `;
    });
  }
  return header + points + units + commands + contingencies;
}

function generateTTSJSONText(list) {
  const ttsJSON = { author: 'Legion HQ' };
function appendMissionTTSJSON(cardList, ttsArray){

  for (let i = 0; i < cardList.length; i++) {
    if (idToName[cardList[i]]) {
      ttsArray.push(idToName[cardList[i]]);
    } else {
      const battlefieldCard = cards[cardList[i]];
      ttsArray.push(battlefieldCard.cardName);
    }
  }

}
  const idToName = {
    "nc": "Offensive Stance",
    "dz": "A-180 Config",
    "ea": "A-300 Config",
    "kh": "A-280-CFE Config",
    "gn": "E-11D Config",
    "np": "J-19 Bo-rifle",
    "Ci": "Clear Conditions",
    "Cl": "War Weary",
    "Dj": "Battle Lines",
    "ff": "Ax-108 \"Ground Buzzer\"",
    "fg": "Mo/Dk Power Harpoon",
    "bh": "TX-225 GAVw Occupier Combat Assault Tank",
    "on": "LAAT/le Patrol Transport",
    "oo": "LAAT/le Patrol Transport",
    "ig": "CM-0/93 Trooper",
    "kd": "Z-6 Phase II Trooper",
    "kt": "\"Bunker Buster\" Shells",
    "le": "EMP \"Droid Poppers\"",
    "lw": "Iden's ID10 Seeker Droid",
    "sr": "Stormtroopers Heavy Response Unit",
    "uj": "The Darksaber (Gideon)",
    "rq": "The Darksaber (Maul)",
    "xw": "Echo (The Bad Batch)"
  };

  ttsJSON.listname = list.title;

  ttsJSON.points = list.pointTotal;

  if (list.faction === 'rebels') ttsJSON.armyFaction = 'rebel';
  else if (list.faction === 'empire') ttsJSON.armyFaction = 'empire';
  else if (list.faction === 'republic') ttsJSON.armyFaction = 'republic';
  else if (list.faction === 'separatists') ttsJSON.armyFaction = 'separatist';
  else ttsJSON.armyFaction = '';

  if (list.battleForce) {
    ttsJSON.battleForce = list.battleForce;
  }

  ttsJSON.commandCards = [];
  for (let i = 0; i < list.commandCards.length; i++) {
    const commandCard = cards[list.commandCards[i]];
    ttsJSON.commandCards.push(commandCard.cardName);
  }
  ttsJSON.commandCards.push('Standing Orders');

  ttsJSON.contingencies = [];
  if (list.contingencies) {
    for (let i = 0; i < list.contingencies.length; i++){
      const commandCard = cards[list.contingencies[i]];
      ttsJSON.contingencies.push(commandCard.cardName);
    }
  }

  ttsJSON.units = [];
  for (let i = 0; i < list.units.length; i++) {
    const unitJSON = { name: '', upgrades: [], loadout: [] };
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];

    if (idToName[unit.unitId]) unitJSON.name = idToName[unit.unitId];
    else if (unitCard.title) unitJSON.name = `${unitCard.cardName} ${unitCard.title}`;
    else unitJSON.name = unitCard.cardName;

    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      if (unit.upgradesEquipped[j]) {
        if (idToName[unit.upgradesEquipped[j]]) {
          unitJSON.upgrades.push(idToName[unit.upgradesEquipped[j]]);
        } else {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          unitJSON.upgrades.push(upgradeCard.cardName);
        }
      }
    }
    if (unit.loadoutUpgrades) {
      for (let j = 0; j < unit.loadoutUpgrades.length; j++) {
        if (unit.loadoutUpgrades[j]) {
          if (idToName[unit.loadoutUpgrades[j]]) {
            unitJSON.loadout.push(idToName[unit.loadoutUpgrades[j]]);
          } else {
            const upgradeCard = cards[unit.loadoutUpgrades[j]];
            unitJSON.loadout.push(upgradeCard.cardName);
          }
        }
      }
    }
    if (unit.counterpart) {
      const counterpart = unit.counterpart;
      const counterpartCard = cards[counterpart.counterpartId];
      unitJSON.upgrades.push(`${counterpartCard.cardName}${counterpartCard.title ? ` ${counterpartCard.title}}` : ''}`);
      for (let j = 0; j < counterpart.upgradesEquipped.length; j++) {
        if (counterpart.upgradesEquipped[j]) {
          if (idToName[counterpart.upgradesEquipped[j]]) {
            unitJSON.upgrades.push(idToName[counterpart.upgradesEquipped[j]]);
          } else {
            const upgradeCard = cards[counterpart.upgradesEquipped[j]];
            unitJSON.upgrades.push(upgradeCard.cardName);
          }
        }
      }
      if (counterpart.loadoutUpgrades) {
        for (let j = 0; j < counterpart.loadoutUpgrades.length; j++) {
          if (counterpart.loadoutUpgrades[j]) {
            if (idToName[counterpart.loadoutUpgrades[j]]) {
              unitJSON.loadout.push(idToName[counterpart.loadoutUpgrades[j]]);
            } else {
              const upgradeCard = cards[counterpart.loadoutUpgrades[j]];
              unitJSON.loadout.push(upgradeCard.cardName);
            }
          }
        }
      }
    };
    if (unitCard.flaw) unitJSON.upgrades.push(cards[unitCard.flaw].cardName);
    if (unit.count > 1) {
      for (let j = 0; j < unit.count; j++) ttsJSON.units.push(unitJSON);
    } else {
      ttsJSON.units.push(unitJSON);
    }
  }

  // TODO - TTS still uses the old names for battle cards
  // if(list.isUsingOldPoints){
    ttsJSON.battlefieldDeck = { conditions: [], deployment: [], objective: [] };
  // } else{
  //     // TODO - check new TTS standard
  //   ttsJSON.battlefieldDeck = { objective: [], secondary: [], advantage: [] };
  // }
  if (list.mode === "500-point mode") {
    ttsJSON.battlefieldDeck.scenario =  "skirmish";
  } else if (list.mode.includes("storm tide")) {
    ttsJSON.battlefieldDeck.scenario = "community"
  } else {
    ttsJSON.battlefieldDeck.scenario =  "standard";
  }

  if(list.isUsingOldPoints){
    appendMissionTTSJSON(list.primaryCards, ttsJSON.battlefieldDeck.objective);
    appendMissionTTSJSON(list.secondaryCards, ttsJSON.battlefieldDeck.deployment);
    appendMissionTTSJSON(list.advantageCards, ttsJSON.battlefieldDeck.conditions);
  } else{
    // TODO - map the 'new' obj cards to the card type names TTS wants
    appendMissionTTSJSON(list.primaryCards, ttsJSON.battlefieldDeck.deployment);
    appendMissionTTSJSON(list.secondaryCards, ttsJSON.battlefieldDeck.objective);
    appendMissionTTSJSON(list.advantageCards, ttsJSON.battlefieldDeck.conditions);

    // appendMissionTTSJSON(list.primaryCards, ttsJSON.battlefieldDeck.objective);
    // appendMissionTTSJSON(list.secondaryCards, ttsJSON.battlefieldDeck.secondary);
    // appendMissionTTSJSON(list.advantageCards, ttsJSON.battlefieldDeck.advantage);
  }

  return JSON.stringify(ttsJSON, null, 4);
}

function generateMinimalText(list) {
  let header = `${list.pointTotal}/${legionModes[list.mode].maxPoints}`;
  const numActivations = getNumActivations(list)
  header += ` (${numActivations} activation${numActivations === 1 ? '' : 's'})\n`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    let line = '';
    if (unit.count > 1) line += `${unit.count}× `;
    line += `${unitCard.cardName} `;

    // TODO this should be a flag to append the unit subtitle to the card display
    if (unit.unitId === 'pz') {
      line += '- Kraken ';
    } else if (unit.unitId === 'qa') {
      line += '- Kalani';
    }

    let upgrades = '';
    let loadout = '';
    unit.upgradesEquipped.forEach((id, i) => {
      if (id) {
        const upgradeCard = cards[id];
        upgrades += `${upgradeCard.cardName}, `;
        if (unit.loadoutUpgrades && unit.loadoutUpgrades.length > 0) {
           if (unit.loadoutUpgrades[i]) {
             const loadoutCard = cards[unit.loadoutUpgrades[i]];
             loadout += `${loadoutCard.cardName}, `;
           } else loadout += 'none, ';
        }
      }
    });
    if (upgrades !== '') {
      upgrades = upgrades.substring(0, upgrades.length - 2)
      line += `(${upgrades})`;
    }
    if (loadout !== '') {
      loadout = loadout.substring(0, loadout.length - 2);
      line += `\n - Loadout: (${loadout})`;
    }
    let counterpart = '';
    if (unit.counterpart) {
      let cUpgrades = '';
      let cLoadout = '';
      const counterpartCard = cards[unit.counterpart.counterpartId];
      counterpart += `\n${counterpartCard.cardName}`;
      unit.counterpart.upgradesEquipped.forEach((id, i) => {
        if (id) {
          const upgradeCard = cards[id];
          cUpgrades += `${upgradeCard.cardName}, `;
          if (unit.counterpart.loadoutUpgrades) {
            if (unit.counterpart.loadoutUpgrades[i]) {
              const loadoutCard = cards[unit.counterpart.loadoutUpgrades[i]];
              cLoadout += `${loadoutCard.cardName}, `;
            } else cLoadout += 'none, ';
          }
        }
      });
      if (cUpgrades !== '') {
        cUpgrades = cUpgrades.substring(0, cUpgrades.length - 2);
        counterpart += ` (${cUpgrades})`;
      }
      if (cLoadout !== '') {
        cLoadout = cLoadout.substring(0, cLoadout.length - 2);
        counterpart += `\n - Loadout: (${cLoadout})`;
      }
    }
    line += counterpart;
    units += line + '\n';
  });
  let commands = list.commandCards.length > 0 ? 'Commands: ' : '';
  list.commandCards.forEach((id, i) => {
    const commandCard = cards[id];
    if (commandCard.cardSubtype === '1') commands += '• ';
    else if (commandCard.cardSubtype === '2') commands += '•• ';
    else if (commandCard.cardSubtype === '3') commands += '••• ';
    else commands += '•••• ';
    commands += `${commandCard.cardName}, `;
  });
  if (commands !== '') commands += '•••• Standing Orders';
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies += '\nContingencies: ';
    list.contingencies.forEach((id, i) => {
      const commandCard = cards[id];
      if (commandCard.cardSubtype === '1') contingencies += '• ';
      else if (commandCard.cardSubtype === '2') contingencies += '•• ';
      else if (commandCard.cardSubtype === '3') contingencies += '••• ';
      else contingencies += '•••• ';
      contingencies += `${commandCard.cardName}, `;
    });
  }
  return header + units + commands + contingencies;
}

function deleteItem(items, i) {
  return items.slice(0, i).concat(items.slice(i + 1, items.length))
}

function changeListTitle(list, title) {
  return { ...list, title: title.substring(0, 30) };
}

// function toggleListMode(list) {
//   const modes = Object.keys(legionModes);
//   let modeIndex = modes.indexOf(list.mode);
//   modeIndex += 1;
//   modeIndex %= modes.length;
//   list.mode = modes[modeIndex];
//   return list;
// }

function setListMode(list, mode) {
  if (legionModes[mode]) {
    list.mode = mode;
  }
  return list;
}

function findUnitHash(list, unitHash) {
  return list.unitObjectStrings.indexOf(unitHash);
}

function getUnitHash(unit) {
  return `${unit.unitId}${unit.upgradesEquipped.join('')}`;
}

function equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  counterpart.loadoutUpgrades[upgradeIndex] = upgradeId;
  return consolidate(list);
}

function unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  if (counterpart.loadoutUpgrades[upgradeIndex]) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  unit.loadoutUpgrades[upgradeIndex] = upgradeId;
  return consolidate(list);
}

function unequipLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  if (unit.loadoutUpgrades[upgradeIndex]) {
    unit.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function equipUpgradeToAll(list, unitIndex, upgradeIndex, upgradeId) {
  // applying upgrade to multiple units
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  const newUnitHash = getUnitHash(newUnit);
  newUnit.unitObjectString = newUnitHash;
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [...upgradeCard.additionalUpgradeSlots];
    newUnit.upgradesEquipped.push(null);
  }
  if (list.unitObjectStrings.includes(newUnitHash)) {
    list.units[list.unitObjectStrings.indexOf(newUnitHash)].count += unit.count;
    list.units = deleteItem(list.units, unitIndex);
  } else {
    list.units[unitIndex] = newUnit;
    list.unitObjectStrings[unitIndex] = newUnitHash;
  }
  return consolidate(list);
}

function equipUpgradeToOne(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.count = 1;
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  newUnit.unitObjectString = getUnitHash(newUnit);
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [...upgradeCard.additionalUpgradeSlots];
    newUnit.upgradesEquipped.push(null);
  }
  const newUnitHashIndex = findUnitHash(list, newUnit.unitObjectString);
  if (newUnitHashIndex > -1) {
    list = incrementUnit(list, newUnitHashIndex);
  } else {
    list.units.splice(unitIndex + 1, 0, newUnit);
    list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
  }
  list = decrementUnit(list, unitIndex);

  return consolidate(list);
}

function equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[upgradeId];
  counterpart.upgradesEquipped[upgradeIndex] = upgradeId;
  counterpart.totalUnitCost += upgradeCard.cost;
  return consolidate(list);
}

function unequipCounterpartUpgrade(list, unitIndex, upgradeIndex) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[counterpart.upgradesEquipped[upgradeIndex]];
  counterpart.upgradesEquipped[upgradeIndex] = null;
  counterpart.totalUnitCost -= upgradeCard.cost;
  if (counterpart.loadoutUpgrades.length > 0) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function addCounterpart(list, unitIndex, counterpartId) {
  const counterpartCard = cards[counterpartId];
  const unit = list.units[unitIndex];
  const unitCard = cards[unit.unitId];
  unit.counterpart = {
    count: 1,
    counterpartId: counterpartCard.id,
    totalUnitCost: counterpartCard.cost,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };

  if(counterpartCard.upgradeBar){
    for (let i = 0; i < counterpartCard.upgradeBar.length; i++) {
      unit.counterpart.upgradesEquipped.push(null);
      if (unitCard.keywords.includes('Loadout')) {
        unit.counterpart.loadoutUpgrades.push(null);
      }
    }
  }
  return consolidate(list);
}

function removeCounterpart(list, unitIndex) {
  const counterpart = list.units[unitIndex].counterpart;
  list.uniques = deleteItem(list.uniques, list.uniques.indexOf(counterpart.counterpartId));
  delete list.units[unitIndex].counterpart;
  return consolidate(list);
}

function addUnit(list, unitId, stackSize = 1) {
  const unitCard = cards[unitId];
  let unitIndex = findUnitHash(list, unitId);

  // TODO TODO - this  will break stuff again if a list can have 2 units with Contingencies
  // Should set list.contingencies=[] by default and let consolidate handle the show/no-show/emptying of it
  if (unitCard.keywords.includes('Contingencies')) {
    if (!list.contingencies) list.contingencies = [];
  }
  if (unitIndex > -1) {
    list.units[unitIndex].count += stackSize;
    list.units[unitIndex].totalUnitCost += unitCard.cost * stackSize;
  } else {
    const newUnitObject = {
      unitId,
      count: unitCard.isUnique ? 1 : stackSize,
      hasUniques: unitCard.isUnique,
      totalUnitCost: unitCard.cost * stackSize,
      unitObjectString: unitId,
      upgradesEquipped: [],
      loadoutUpgrades: [],
      additionalUpgradeSlots: []
    };
    for (let i = 0; i < unitCard.upgradeBar.length; i++) {
      newUnitObject.upgradesEquipped.push(null);
      if (unitCard.keywords.includes('Loadout')) {
        newUnitObject.loadoutUpgrades.push(null);
      }
    }
    list.units.push(newUnitObject);
    list.unitObjectStrings.push(unitId);
    unitIndex = list.units.length - 1;

    if (unitCard.equip) {
      for (let i = 0; i < unitCard.equip.length; i++) {
        let upgradeType = cards[unitCard.equip[i]].cardSubtype;
        let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);
        if (list.units[list.units.length - 1].upgradesEquipped[upgradeIndex]) {
          while (list.units[list.units.length - 1].upgradesEquipped[upgradeIndex] && upgradeIndex < unitCard.upgradeBar.length - 1) {
            upgradeIndex += 1;
          }
        }
        equipUpgradeToAll(list, unitIndex, upgradeIndex, unitCard.equip[i]);
      }
    }

    // find any upgrades with 0 cost that are the only eligible in slot
    // narrow down upgrade types we check to ones that CAN be a no-cost one-of, e.g. there's always more than 1 grenade type eligible
    let freeSoloUpgradeTypes = ["armament"];
    
    freeSoloUpgradeTypes.forEach(upgradeType => {
      let upgradeIndex = unitCard.upgradeBar.indexOf(upgradeType);

      if(upgradeIndex > -1){
        let eligibleUpgrades = getEquippableUpgrades(list, upgradeType, unitId, [], []);
        if(eligibleUpgrades.validIds.length === 1){
          let freeSoloId = eligibleUpgrades.validIds[0];
          if(cards[freeSoloId].cost === 0){
            // If this card was already added via equip above, it'll break things if added again
            // (currently a futureproof w no known case)
            if(!(unitCard.equip?.find(u => u === freeSoloId))){
              equipUpgradeToAll(list, unitIndex, upgradeIndex, freeSoloId);
            }
          }
        }
      }

    });

    if (unitCard.command) {
      unitCard.command.forEach((commandId) => addCommand(list, commandId));
    }
  }

  validateUpgrades(list, unitIndex);
  return consolidate(list);
}

function incrementUnit(list, index) {
  list.units[index].count += 1;
  return consolidate(list);
}

function decrementUnit(list, index) {
  const unitObject = list.units[index];
  if (unitObject.count === 1) {
    list.unitObjectStrings = deleteItem(list.unitObjectStrings, index);
    list.units = deleteItem(list.units, index);
  } else {
    list.units[index].count -= 1;
  }
  return consolidate(list);
}

function restoreUnit(list, index) {
  let unit = list.units[index];
  let perUnitCost = unit.totalUnitCost / unit.count;

  const killedFiltered = list.killedUnits.filter(function(item){
    return item === unit.unitId + unit.count;
  })

  if(killedFiltered.length !== 0 && killedFiltered.length <= unit.totalUnitCost){
    killedFiltered.pop();
    const remainingUnits = list.killedUnits.filter(function(item){
      return item !== unit.unitId + perUnitCost;
    });

    list.killedUnits = killedFiltered.concat(remainingUnits);
    list.killPoints -= perUnitCost;
  }

  return list;
}

function killUnit(list, index) {
  let unit = list.units[index];
  let perUnitCost = unit.totalUnitCost / unit.count;

  const killedFiltered = list.killedUnits.filter(function(item){
    return item === unit.unitId + perUnitCost;
  })

  if(killedFiltered.length < unit.count) {
    list.killedUnits.push(unit.unitId + unit.count);
    list.killPoints += perUnitCost;
  }

  return list;
}

function getEligibleUnitsToAdd(list, rank, userSettings) {
  const validUnitIds = [];
  const cardsById = cardIdsByType.unit; // Object.keys(cards);
  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];

    if (card.rank !== rank) continue;


    if(!userSettings.showStormTide && (id === "AA" || id === "AK")){
      continue;
    }
    // TODO - idk stormtide, but it seems odd that the 0pt one is the one shown in the mode, and the 60pt one is the one outside it
    else if (userSettings.showStormTide && (list.mode.includes('storm tide') && id === 'AA')) {
      continue;
    } else if (userSettings.showStormTide && (!list.mode.includes('storm tide') && id === 'AK')) {
      continue;
    }

    if(!list.battleForce)
    {
      if (!list.faction.includes(card.faction) && !card.affiliations) continue;
      if (!list.faction.includes(card.faction) && card.affiliations && !card.affiliations.includes(list.faction)) continue;
    } else {
      if (!battleForcesDict[list.battleForce][rank].includes(id)) continue;
    }
    if (list.uniques.includes(id)) continue;
    if (list.commanders.includes(card.cardName)) continue;
    if (card.specialIssue && card.specialIssue !== list.battleForce)continue;

    if (card.detachment) {
      for (let i = 0; i < list.units.length; i++) {
        const unit = list.units[i];
        if (unit.unitId === card.detachment) {
          validUnitIds.push(id);
          break;
        }
      }
    } else {
      validUnitIds.push(id);
    }
  }
  return sortIds(validUnitIds);
}


/**
 * Added so we can check against upgradeBar
 * @param {*} requirement 
 * @param {*} unitCard 
 * @returns 
 */
function checkRequirement(unitCard, requirement){
  // TODO - more perfect-fitting here; get this all more generalized, KISS for now
  let reqFields = Object.getOwnPropertyNames(requirement);
  if(reqFields.length === 1){
    if(Array.isArray(requirement[reqFields[0]])){
      return _.difference(requirement[reqFields[0]], unitCard[reqFields[0]]) === 0
    }
  }
  return _.isMatch(unitCard, requirement);
}

/** TODO grabnar - this could use some TLC; 
 * most functions here only work for 1 or 2 elements; would be cool to extend this a bit for futureproofing
 */
function isRequirementsMet(requirements, unitCard) {
  if (requirements instanceof Array) {
    const operator = requirements[0];
    if (operator instanceof Object) {
      if(operator)
        // requirements: [{cardName: 'Whatever'}]
        return checkRequirement(unitCard, operator);
    } else if (operator === 'NOT') {
        return !_.isMatch(unitCard, requirements[1]);
    } else if (operator === 'AND' || operator === 'OR') {
      let leftOperand = requirements[1];
      let rightOperand = requirements[2];
      if (leftOperand instanceof Array) {
        leftOperand = isRequirementsMet(leftOperand, unitCard);
      } else if (leftOperand instanceof Object) {
        leftOperand = _.isMatch(unitCard, leftOperand);
      }
      if (rightOperand instanceof Array) {
        rightOperand = isRequirementsMet(rightOperand, unitCard);
      } else if (rightOperand instanceof Object) {
        rightOperand = _.isMatch(unitCard, rightOperand);
      }
      if (operator === 'OR') {
        // requirements: ['OR', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
        return leftOperand || rightOperand
      } else { // operator === 'AND'
        // requirements: ['AND', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
        return leftOperand && rightOperand;
      }
    } else {
      // Empty array of requirements
      return true;
    }
  } else {
    // requirements: {cardName: 'Whatever'}
    return _.isMatch(unitCard, requirements);
  }
}

function getEquippableLoadoutUpgrades(
  list, upgradeType, id, upgradeIndex, upgradesEquipped, additionalUpgradeSlots
) {
  const upgrades = getEquippableUpgrades(
    list, upgradeType, id, upgradesEquipped, additionalUpgradeSlots
  );
  const validIds = upgrades.validIds;
  const invalidIds = upgrades.invalidIds;
  const validLoadoutUpgradeIds = [];
  const invalidLoadoutUpgradeIds = [...invalidIds];
  const parentUpgradeCard = cards[upgradesEquipped[upgradeIndex]];
  for (let i = 0; i < validIds.length; i++) {
    const upgradeId = validIds[i]
    const upgradeCard = cards[upgradeId];
    if (
      upgradeCard.cost <= parentUpgradeCard.cost &&
      upgradeId !== parentUpgradeCard.id
    ) {
      validLoadoutUpgradeIds.push(upgradeCard.id);
    } else {
      invalidLoadoutUpgradeIds.push(upgradeCard.id);
    }
  }
  return {
    validIds: validLoadoutUpgradeIds,
    invalidIds: invalidLoadoutUpgradeIds
  };
}

function addContingency(list, commandId) {
  list.contingencies.push(commandId);
  return list;
}

function addCommand(list, commandId) {
  list.commandCards.push(commandId);
  list.commandCards = sortCommandIds(list.commandCards);
  return list;
}

function addBattle(list, type, id) {
  if (type === 'objective') {
    list.objectiveCards.push(id);
  } else if (type === 'deployment') {
    list.deploymentCards.push(id);
  } else if (type === 'condition') {
    list.conditionCards.push(id);
  }

  else if (type === 'primary') {
    list.primaryCards.push(id);
  } else if (type === 'secondary') {
    list.secondaryCards.push(id);
  } else if (type === 'advantage') {
    list.advantageCards.push(id);
  }
  return list;
}

function removeBattle(list, type, index) {
  if (type === 'objective') {
    list.objectiveCards = deleteItem(list.objectiveCards, index);
  } else if (type === 'deployment') {
    list.deploymentCards = deleteItem(list.deploymentCards, index);
  } else if (type === 'condition') {
    list.conditionCards = deleteItem(list.conditionCards, index);
  }else if (type === 'primary') {
    list.primaryCards = deleteItem(list.primaryCards, index);
  } else if (type === 'secondary') {
    list.secondaryCards = deleteItem(list.secondaryCards, index);
  } else if (type === 'advantage') {
    list.advantageCards = deleteItem(list.advantageCards, index);
  } else return;
  return list;
}

function removeContingency(list, contingencyIndex) {
  list.contingencies = deleteItem(list.contingencies, contingencyIndex);
  return list;
}

function removeCommand(list, commandIndex) {
  list.commandCards = deleteItem(list.commandCards, commandIndex);
  return list;
}

function sortCommandIds(cardIds) {
  return cardIds.sort((firstId, secondId) => {
    const firstType = Number.parseInt(cards[firstId].cardSubtype);
    const secondType = Number.parseInt(cards[secondId].cardSubtype);
    if (firstType > secondType) return 1;
    else if (firstType < secondType) return -1;
    return 0;
  });
}

function getEligibleBattlesToAdd(list, type) {
  const validIds = [];
  const invalidIds = [];
  const scenarioMissionIds = ['Df', 'Oe'];
  // const cardsById = cardIdsByType.battle; //Object.keys(cards);

  let currentCards;
  if (type === 'objective') currentCards = list.objectiveCards;
  else if (type === 'deployment') currentCards = list.deploymentCards;
  else if (type === 'condition') currentCards = list.conditionCards;
  else if (type === 'primary') currentCards = list.primaryCards;
  else if (type === 'secondary') currentCards = list.secondaryCards;
  else if (type === 'advantage') currentCards = list.advantageCards;
  else return;
  cardIdsByType['battle'].forEach(id => {
    const card = cards[id];
    // if (card.cardType !== 'battle') return;
    if (card.cardSubtype !== type) return;
    if (currentCards.includes(id)) return;
    if (scenarioMissionIds.includes(id)) return;
    if (currentCards.length > 3) invalidIds.push(id);
    if (list.mode === '500-point mode') {
      if (card.keywords.includes('Skirmish')) validIds.push(id);
      else invalidIds.push(id);
    } else {
      if (card.keywords.includes('Skirmish')) invalidIds.push(id);
      else validIds.push(id);
    }
  });
  return { validIds, invalidIds };
}

function getEligibleContingenciesToAdd(list) {
if (!list.contingencies) list.contingencies = [];
const validCommandIds = [];
const invalidCommandIds = [];
// const cardsById = cardIdsByType.command; // Object.keys(cards);

let numContingencies = 0;
list.units.forEach((unit) => {
  const unitCard = cards[unit.unitId];
  if (unitCard.contingencies && unitCard.contingencies > 0)
    numContingencies += unitCard.contingencies
});
cardIdsByType['command'].forEach(id => {
  const card = cards[id];
  // if (card.cardType !== 'command') return;
  if (list.commandCards.includes(id)) return;
  if (list.contingencies.includes(id)) return;
  if (!list.faction.includes(card.faction)) return;
  if (id === 'aa') return;
  if (id === 'jl' || id === 'ka' || id ==='kb') return;
  if (
    list.contingencies.length >= numContingencies ||
    (card.commander && !list.commanders.includes(card.commander))
  ) {
    invalidCommandIds.push(id);
    return;
  }
  validCommandIds.push(id);
});
return {
  validIds: sortCommandIds(validCommandIds),
  invalidIds: sortCommandIds(invalidCommandIds)
};
}

function getEligibleCommandsToAdd(list) {
  const stormTideCommands = {
    '500-point mode': ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AH', 'AI', 'AJ'],
    'standard mode': ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AH', 'AI', 'AJ'],
    'grand army mode': ['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AH', 'AI', 'AJ'],
    'storm tide: infantry': ['AC', 'AE', 'AG'],
    'storm tide: armored': ['AB', 'AF', 'AJ'],
    'storm tide: special forces': ['AD', 'AH', 'AI']
  };

  const validCommandIds = [];
  const invalidCommandIds = [];
  // const cardsById = cardIdsByType.command; // Object.keys(cards);

  const pipCounts = { '1': 0, '2': 0, '3': 0 };
  list.commandCards.forEach(id => {
    const commandCard = cards[id];
    pipCounts[commandCard.cardSubtype] += 1;
  });
  cardIdsByType['command'].forEach(id => {
    const card = cards[id];
    // if (card.cardType !== 'command') return;
    if (list.commandCards.includes(id)) return;
    if (list.contingencies && list.contingencies.includes(id)) return;

    if (
      stormTideCommands[list.mode] &&
      stormTideCommands[list.mode].length === 3 &&
      stormTideCommands[list.mode].includes(id)
    ) {
      validCommandIds.push(id);
      return;
    } else if (
      stormTideCommands[list.mode] &&
      stormTideCommands[list.mode].length === 3 &&
      stormTideCommands['standard mode'].includes(id)
    ) {
      invalidCommandIds.push(id);
      return;
    }

    if (!list.faction.includes(card.faction)) return;
    if (id === 'aa') return; // Standing Orders
    if (id === 'jl' || id === 'ka' || id === 'kb') return; // Duplicates
    if ((id === 'tv' || id === 'ud') && !list.uniques.includes('tn')) return; // grogu's command card

    if (card.battleForce && card.battleForce !== list.battleForce) {
      return;
    }
    if (
      pipCounts[card.cardSubtype] > 1 ||
      (card.commander && !list.commanders.includes(card.commander))
    ) {
      invalidCommandIds.push(id);
      return;
    }
    validCommandIds.push(id);
  });
  return {
    validIds: sortCommandIds(validCommandIds),
    invalidIds: sortCommandIds(invalidCommandIds)
  };
}

function getEquippableUpgrades(
  list, upgradeType, unitId, upgradesEquipped, additionalUpgradeSlots
) {
  const impRemnantUpgrades = ['ej', 'ek', 'fv', 'iy', 'fu', 'gm', 'gl', 'em', 'en', 'ja'];
  const validUpgradeIds = [];
  const invalidUpgradeIds = [];
  // const cardsById = cardIdsByType.upgrade; // Object.keys(cards);

  if (!unitId) return { validUpgradeIds: [], invalidUpgradeIds: [] };
  const unitCard = cards[unitId];
  for (let i = 0; i < cardIdsByType['upgrade'].length; i++) {
    const id = cardIdsByType['upgrade'][i];
    const card = cards[id];
    if (id === 'nc') continue; // duplicate card

    // if (card.cardType !== 'upgrade') continue;
    if (card.cardSubtype !== upgradeType) continue;
    if (card.faction && card.faction !== '' && list.faction !== card.faction) continue;
    if (list.uniques.includes(id)) continue;
    if (upgradesEquipped.includes(id)) continue;
    if (card.isUnique && list.battleForce && !battleForcesDict[list.battleForce].allowedUniqueUpgrades.includes(id)) continue;
    if (id === 'nc') continue; // duplicate card

    // dynamically add the force affinity
    const { faction } = unitCard;

    // TODO - not a big fan of modifying unitCard data - leads to unexpected stickiness esp with old points

    unitCard['light side'] = unitCard['dark side'] = false;
    if (faction === 'rebels' || faction === 'republic') unitCard['light side'] = true;
    else if (faction === 'separatists' || faction === 'empire' || faction === 'mercenary') unitCard['dark side'] = true;

    if (unitCard.keywords.includes('Tempted') && list.isUsingOldPoints) {
      unitCard['light side'] = true;
      unitCard['dark side'] = true;
    }

    if (
      unitCard.id in interactions.eligibility &&
      interactions.eligibility[unitCard.id].conditionFunction(card)
    ) {
      const interaction = interactions.eligibility[unitCard.id];
      if (interaction.resultFunction(card)) {
        validUpgradeIds.push(id);
      }
    } else if (list.battleForce === 'Imperial Remnant' && card.cardSubtype === 'heavy weapon') {

      if (unitCard.cardSubtype !== 'droid trooper' && unitCard.cardSubtype.includes('trooper')) {
        if (impRemnantUpgrades.includes(id)) validUpgradeIds.push(id);
        else if (isRequirementsMet(card.requirements, unitCard)) validUpgradeIds.push(id)
        else invalidUpgradeIds.push(id);
      } else if (isRequirementsMet(card.requirements, unitCard)) validUpgradeIds.push(id);
      else invalidUpgradeIds.push(id);
    } else if (isRequirementsMet(card.requirements, unitCard)) {
      validUpgradeIds.push(id);
    } else {
      invalidUpgradeIds.push(id);
    }
  }
  return {
    validIds: sortIds(validUpgradeIds),
    invalidIds: sortIds(invalidUpgradeIds)
  };
}

function sortIds(ids) {
  const sortedIds = ids.sort((a, b) => {
    const cardA = cards[a];
    const cardB = cards[b];
    const nameA = cardA.displayName ? cardA.displayName : cardA.cardName;
    const nameB = cardB.displayName ? cardB.displayName : cardB.cardName;
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });
  return sortedIds;
}

/**
 * Check validation ONLY for things pertaining to this unit's currently equipped upgrades. 
 * Generally, should *probably* not do things that have a further reach than upgrade bar itself (I think)
 * e.g. adding Field Commander or Maul's Darksaber for list validation
 * @param {} list 
 * @param {*} unitIndex 
 * @param {*} upgradeIndex 
 * @param {*} upgradeId 
 */
function validateUpgrades(list, unitIndex){
  const unit = list.units[unitIndex];
  const card = cards[unit.unitId];

  unit.validationIssues = [];
  
  // Validation for each of the 'must equip' keywords (that I know of)

  if(card.flexResponse){
    let heavyCount = 0;
    unit.upgradesEquipped.forEach((id)=>{
      if(id == null)
        return;
      const equipCard = cards[id];
      if(equipCard.cardSubtype === 'heavy weapon'){
        heavyCount++;
      }
    });
    if(heavyCount < card.flexResponse){
      let cardName = card.displayName ? card.displayName : card.cardName;
      unit.validationIssues.push( { level:2, text: cardName + " needs " + card.flexResponse + " Heavy Weapon upgrades (Flexible Response)" });
    }
  }

  // Equip
  if (card.equip){
    card.equip.forEach((equipReq)=>{
      const equipCard = cards[equipReq];
      if(!unit.upgradesEquipped.includes(equipReq)){
        let cardName = card.displayName ? card.displayName : card.cardName;
        unit.validationIssues.push( { level:2, text: cardName + " is missing " + equipCard.cardName + " (Equip)"});
      }
    });
  }

  if(card.keywords.includes("Heavy Weapon Team")){
    let hasHeavy = false;
    unit.upgradesEquipped.forEach((id)=>{
      if(id == null)
        return;
      const equipCard = cards[id];
      if(equipCard.cardSubtype === 'heavy weapon'){
        hasHeavy = true;
      }
    });
    if(!hasHeavy){
      let cardName = card.displayName ? card.displayName : card.cardName;
      unit.validationIssues.push( { level:2, text: cardName + " is missing a Heavy Weapon upgrade (Heavy Weapon Team)" });
    }
  }

  if(card.keywords.includes("Programmed")){
    let hasProto = false;
    unit.upgradesEquipped.forEach((id)=>{
      if(id == null)
        return;
      const equipCard = cards[id];
      if(equipCard.cardSubtype === 'protocol'){
        hasProto = true;
      }
    });
    if(!hasProto){
      unit.validationIssues.push( { level:2, text: card.cardName + " is missing a Programming upgrade (Programmed)" });
    }
  }

}

function equipUpgrade(list, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll = false) {
  if (action === 'UNIT_UPGRADE') {
    if (isApplyToAll) {
      list = equipUpgradeToAll(list, unitIndex, upgradeIndex, upgradeId);
    } else {
      list = equipUpgradeToOne(list, unitIndex, upgradeIndex, upgradeId);
    }
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'LOADOUT_UPGRADE') {
    list = equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  }

  validateUpgrades(list, unitIndex);

  return list;
}

function unequipUpgrade(list, action, unitIndex, upgradeIndex) {
  
  // const upgradeId = list.units[unitIndex].upgradesEquipped[upgradeIndex];

  if (action === 'UNIT_UPGRADE') {
    function unequip(list, unitIndex, upgradeIndex) {
      const unit = list.units[unitIndex];
      const upgradeId = unit.upgradesEquipped[upgradeIndex];
      const upgradeCard = cards[upgradeId];
      const newUnit = JSON.parse(JSON.stringify(unit));
      newUnit.count = 1;
      newUnit.upgradesEquipped[upgradeIndex] = null;
      if (newUnit.loadoutUpgrades && newUnit.loadoutUpgrades[upgradeIndex]) {
        newUnit.loadoutUpgrades[upgradeIndex] = null;
      }
      newUnit.unitObjectString = getUnitHash(newUnit);
      if ('additionalUpgradeSlots' in upgradeCard) {
        newUnit.additionalUpgradeSlots = [];
        newUnit.upgradesEquipped.pop();
      }
      const newUnitHashIndex = findUnitHash(list, newUnit.unitObjectString);
      if (newUnitHashIndex > -1) {
        list = incrementUnit(list, newUnitHashIndex);
      } else {
        list.units.splice(unitIndex + 1, 0, newUnit);
        list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
      }
      list = decrementUnit(list, unitIndex);
      return consolidate(list);
    }
    list = unequip(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = unequipCounterpartUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'LOADOUT_UPGRADE') {
    list = unequipLoadoutUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex);
  }

  validateUpgrades(list, unitIndex);


  return list;
}

function processUnitSegment(segment) {
  const unitSegment = segment.slice(0, 3);
  let loadoutSegment; let upgradeSegment = segment.slice(3);
  if (upgradeSegment.includes('_')) {
    loadoutSegment = upgradeSegment.split('_')[1];
    upgradeSegment = upgradeSegment.split('_')[0]
  }
  const unitCount = Number.parseInt(unitSegment.charAt(0));
  const unitId = unitSegment.charAt(1) + unitSegment.charAt(2);
  const unitCard = cards[unitId];
  const newUnit = {
    unitId,
    count: unitCount,
    hasUniques: unitCard.isUnique,
    totalUnitCost: unitCard.cost * unitCount,
    unitObjectString: unitId,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };
  let upgradeIndex = 0;
  for (let i = 0; i < upgradeSegment.length; i++) {
    if (upgradeSegment.charAt(i) === '0') {
      newUnit.upgradesEquipped[upgradeIndex] = null;
      upgradeIndex++;
    } else {
      const upgradeId = upgradeSegment.charAt(i) + upgradeSegment.charAt(i + 1);
      const upgradeCard = cards[upgradeId];
      newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
      newUnit.unitObjectString += upgradeId;
      if ('additionalUpgradeSlots' in upgradeCard) {
        newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
        newUnit.upgradesEquipped.push(null);
      }
      i++;
      upgradeIndex++;
    }
  }
  let loadoutIndex = 0;
  for (let i = 0; loadoutSegment && i < loadoutSegment.length; i++) {
    if (loadoutSegment.charAt(i) === '0') {
      newUnit.loadoutUpgrades[loadoutIndex] = null;
      loadoutIndex++;
    } else {
      const upgradeId = loadoutSegment.charAt(i) + loadoutSegment.charAt(i + 1);
      newUnit.loadoutUpgrades[loadoutIndex] = upgradeId;
      // const upgradeCard = cards[upgradeId];
      // if ('additionalUpgradeSlots' in upgradeCard) {
      //   newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
      //   newUnit.loadoutUpgrades.push(null);
      // }
      i++;
      loadoutIndex++;
    }
  }
  return newUnit;
}

function segmentToUnitObject(unitIndex, segment) {
  let unit; let counterpart;
  if (segment.includes('+')) {
    unit = processUnitSegment(segment.split('+')[0]);
    counterpart = processUnitSegment(segment.split('+')[1]);
    const {
      unitId,
      hasUniques,
      totalUnitCost,
      unitObjectString,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    } = counterpart;
    unit.counterpart = {
      count: 1,
      counterpartId: unitId,
      hasUniques,
      totalUnitCost,
      unitObjectString,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    };
  } else unit = processUnitSegment(segment);
  return unit;
}

function convertHashToList(faction, url) {
  let list = JSON.parse(JSON.stringify(listTemplate));
  list.faction = faction;
  list.contingencies = [];
  let segments;
  if (url.includes(':')) {
    segments = url.split(':');

    let idx=0;
    let points = parseInt(segments[idx]);

    if(points){
      idx++;
      let mode = Object.getOwnPropertyNames(legionModes).find(n => legionModes[n].maxPoints == points);
      if(mode){
        list.mode = mode;
      }
    }

    let bfCode = Object.getOwnPropertyNames(battleForcesDict).find(k=>battleForcesDict[k].linkId == segments[idx]);
    if(bfCode){
      list.battleForce = bfCode;
    }

    segments = segments[segments.length-1].split(',');
  } else {
    list.battleForce = '';
    segments = url.split(',');
  }
  const unitSegments = [];
  const otherSegments = [];
  try {
    let oldCounterparts = ['lw', 'ji', 'jj'];
    segments.forEach(segment => {
      // TODO - this is *probably* defunct, unless there's a gameuplink archive out there
      let hasOldCounterpart = false;
      oldCounterparts.forEach(id => {
        if (segment === `1${id}`) hasOldCounterpart = true;
      });
      if (hasOldCounterpart) return;
      else if (segment.length > 2) unitSegments.push(segment);
      else otherSegments.push(segment);
    });
  } catch (e) {
    return false;
  }
  try {
    list.units = unitSegments.map((segment, i) => segmentToUnitObject(i, segment));
    list.units.forEach(unit => {
      list.unitObjectStrings.push(unit.unitObjectString);
    });
  } catch (e) {
    return false;
  }
  try {
    let commandCardSlots = 7;
    otherSegments.forEach(cardId => {
      commandCardSlots -=1;
      if (cardId === '') return;
      // if (cardId.includes('*')) {}
      const card = cards[cardId];
      if (card.cardType === 'command') {
        if (commandCardSlots > 0) {
          list.commandCards.push(cardId);
        } else {
          list.contingencies.push(cardId);
        }
      } else if (card.cardSubtype === 'objective') {
        list.objectiveCards.push(cardId);
      } else if (card.cardSubtype === 'deployment') {
        list.deploymentCards.push(cardId);
      } else if (card.cardSubtype === 'condition') {
        list.conditionCards.push(cardId);
      }else if (card.cardSubtype === 'primary') {
        list.primaryCards.push(cardId);
      }else if (card.cardSubtype === 'secondary') {
        list.secondaryCards.push(cardId);
      }else if (card.cardSubtype === 'advantage') {
        list.advantageCards.push(cardId);
      }
    });
  } catch (e) {
    // console.log(e);
    return false;
  }
  if (list.faction === 'mercenary') list.battleForce = 'Shadow Collective';
  if (list.faction === 'separatists' && list.battleForce === 'Echo Base Defenders') {
    list.battleForce = 'Separatist Invasion';
  }
  return consolidate(list);
}

function mergeLists(primaryList, secondaryList) {
  let unitsToAdd = [];
  for (let i = 0; i < secondaryList.units.length; i++) {
    const unit = secondaryList.units[i];
    if (unit.hasUniques) {
      if (primaryList.uniques.includes(unit.unitId)) continue;
      let isValid = true;
      unit.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId && primaryList.uniques.includes(upgradeId)) isValid = false;
      });
      if (!isValid) continue;
      unitsToAdd.push(unit);
    } else if (primaryList.unitObjectStrings.includes(unit.unitObjectString)) {
      primaryList.units[i].count += unit.count;
    } else {
      unitsToAdd.push(unit);
    }
  }
  unitsToAdd.forEach(unitToAdd => primaryList.units.push(unitToAdd));
  return consolidate(primaryList);
}

// All (most...) battleForce-specific stuff (should) goes here
function battleForceValidation(currentList, unitCounts){

  const validationIssues = [];
  // TODO is a switch against the code standard? ;)
  // Should destroy this in favor of adding a 'rule' to apply for BzF in the object, e.g.
  // rules:[... {type:'unitLimit', min:0, max:1, types:['ay', 'sr']}]

  if(battleForcesDict[currentList.battleForce]?.rules?.take2NonEwokRebs){
    let rebelsCount = currentList.units.reduce((rebelsCount, unit)=>{
      const card = cards[unit.unitId];
      if (card.faction === "rebels")
        return rebelsCount + unit.count;
      else return rebelsCount;
    }, 0);

    if(rebelsCount < 2){
      validationIssues.push({level:2, text:"List must have at least 2 non-Ewok REBEL units."});
    }
  }

  if( battleForcesDict[currentList.battleForce]?.rules?.unitLimits){
    let unitLimits = battleForcesDict[currentList.battleForce].rules.unitLimits;

    unitLimits.forEach( limit =>{
      let unitCount = limit.ids.reduce((count, id)=>{
        return count + (unitCounts[id] ? unitCounts[id] : 0)}, 0);
      
      if(unitCount < limit.count[0] || unitCount > limit.count[1]){
        let name = limit.ids.map(id=> cards[id].displayName ? cards[id].displayName : cards[id].cardName).join(" OR ");
        if(limit.count[0] === 0)
          validationIssues.push({level:2, text:"Limit " + limit.count[1] + " " + name.toUpperCase()});
        else
          validationIssues.push({level:2, text:"You must have " + limit.count[0] + " - " + limit.count[1] + " " + name.toUpperCase()});
      }
    });
  }  

  if( battleForcesDict[currentList.battleForce]?.rules?.minOneOfEachCorps){
    let corpsCounts = battleForcesDict[currentList.battleForce].corps.map(
      id=>{return{id, count:(unitCounts[id] ? unitCounts[id] : 0)}}
    )

    if(battleForcesDict[currentList.battleForce]?.rules?.buildsAsCorps){
      let moreCorps = battleForcesDict[currentList.battleForce]?.rules?.buildsAsCorps.map(
        id=>{return{id, count:(unitCounts[id] ? unitCounts[id] : 0)}}
      );
      corpsCounts = corpsCounts.concat(moreCorps);
    }

    let hasNone = false;
    let hasMoreThanOne =false;
    corpsCounts.forEach(c=>{
      if(c.count === 0){
        hasNone = true;
      } else if(c.count > 1){
        hasMoreThanOne = true;
      }
    });

    if(hasNone && hasMoreThanOne){
      validationIssues.push({level:2, text:"You must have at least one of each Corps type before adding additional ones"});
    }
  }  
  
  
  return validationIssues;
}

function mercValidation(currentList, rank, mercs){
  const validationIssues = [];

  let hasAoc = false;
  let aocRanks = []; 

  let mercLimits = { commander:1, operative:1, corps:2, special:1, heavy:1, support:1 }

  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId]

    // Check for Allies of Convenience
    if(!hasAoc)
    {
      // check for AoC keyword or Underworlds Connection card
      hasAoc = card.keywords.find(k => k === "Allies of Convenience") || unit.upgradesEquipped.find(c => c !== null && c === 'rf');
    }
  });

  if(!battleForcesDict[currentList.battleForce]?.rules?.countMercs){
    Object.keys(ranks).forEach(t =>{

      if(mercs[t] > mercLimits[t]){
        if(!hasAoc || mercs[t] > mercLimits[t] + 1){
          validationIssues.push({level:2, text:"Too many MERCENARY " + t.toUpperCase() + " units! (maximum " + (hasAoc ? mercLimits[t]+1:mercLimits[t]) + ")"});
        } 
        aocRanks.push(t);
      }
      if(aocRanks.length > 1){
        validationIssues.push({level:2, text:"Allies of Convenience only allows ONE additional merc of any rank (" + aocRanks.join(", ")+ ")"});
      }

    });
  }
  return validationIssues;
}

function rankValidation(currentList, ranks, mercs, rankReqs){
  const validationIssues = [];

  // TODO this is ugly - probably should be a BF flag
  const battleForce = battleForcesDict[currentList.battleForce];
  const countMercs = battleForce?.rules?.countMercs; // currentList.battleForce === "Shadow Collective" || currentList.battleForce == "Bright Tree Village"

  if(rankReqs.commOp && (ranks.commander + ranks.operative) > rankReqs.commOp
    && !(ranks.commander > rankReqs.commander || ranks.operative > rankReqs.operative)){
    validationIssues.push({level:2, text:"Limit of " + rankReqs.commOp + " total COMMMANDERS and OPERATIVES"});
  }

  Object.keys(ranks).forEach(t =>{
    let min =rankReqs[t][0]; 
    let max = rankReqs[t][1];

    // mercs don't count for minimum, unless they do
    const countMin = !countMercs ? (ranks[t] - mercs[t]) : ranks[t];
    if(countMin < min){
      validationIssues.push({level:2, text:"Not enough " + t.toUpperCase() + " units! (minimum " + min + ")"});
    }
    
    if(ranks[t] > max){
      validationIssues.push({level:2, text:"Too many " + t.toUpperCase() + " units! (maximum " + max + ")"});
    }
  });

  // Warn user if it looks like they're trying to use a Field Comm on incompatible army
  // level 1 since the Comm miss itself is a level 2 already

  if(ranks['commander'] < rankReqs['commander'][0] && currentList.hasFieldCommander && battleForce?.rules?.noFieldComm)
  {
    validationIssues.push({level:1, text:"This battleforce can't use the Field Commander keyword"});
  }

  return validationIssues;
}

function applyRankAdjustments(currentList, rankReqs) {
  
  let extraRankCounts = {}
  
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId];
    if (card.entourage) {
      if(!extraRankCounts[card.entourage]){
        extraRankCounts[card.entourage] = 0;
      }
      extraRankCounts[card.entourage] += unit.count;

    } 
    if (card.detachment) {
      // *technically* this is backwards... but still works ;)
      if(!extraRankCounts[card.id]) {
        extraRankCounts[card.id] = 0;
      }
      extraRankCounts[card.id] += unit.count;
    } 
    if (card.associate){
      if(currentList.units.find(u => u.unitId === card.associate) !== undefined){
        extraRankCounts[card.id] = 1;
      }
    }
  });

  // Do this on a separate pass so we don't get whacked by random list order
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId];

    if(extraRankCounts[unit.unitId]){
      let allowance = Math.min(unit.count, extraRankCounts[unit.unitId]);
      rankReqs[card.rank][1] += allowance;
      extraRankCounts[unit.unitId] -= allowance;
    }
  });

  return;
}

function applyFieldCommander(list, rankReqs){
  const bf = battleForcesDict[list.battleForce];
  if(list.hasFieldCommander && !bf?.rules?.noFieldComm)
  {
      rankReqs.commander[0] = 0;
  }
}

function getOriginalRankLimits(currentList){
  const battleForce = currentList.battleForce;
  let dictRankReqs;

  if(battleForce){
    if(battleForcesDict[battleForce][currentList.mode])
      dictRankReqs = battleForcesDict[battleForce][currentList.mode];
    else{
      dictRankReqs = battleForcesDict[battleForce]['standard mode'];
    }
  } else{
    dictRankReqs = legionModes[currentList.mode].unitCounts;
  }

  // copy over so we can play with limits
  let rankReqs = {};
  (Object.keys(dictRankReqs)).forEach(r =>{
    if(dictRankReqs[r].length)
      rankReqs[r] = [dictRankReqs[r][0], dictRankReqs[r][1]]
    else
      rankReqs[r] = dictRankReqs[r];
  });
  
  return rankReqs;
}

function getRankLimits(currentList){

  let rankReqs = getOriginalRankLimits(currentList);
  applyRankAdjustments(currentList, rankReqs);  
  applyFieldCommander(currentList, rankReqs);

  return rankReqs;
}

// TODO most of this was written before understanding the whole 'running total' state we have going
// Would be better to move most of this into the proper unit/upgrade modify steps instead of 
// iterating everything every time something's added
function validateList(currentList){
  let validationIssues = [];

  const battleForce = currentList.battleForce;

  let ranks = {...currentList.unitCounts} //{ commander:0, operative:0, corps:0, special:0, heavy:0, support:0 }
  let mercs = { commander:0, operative:0, corps:0, special:0, heavy:0, support:0 }

  // Determine what our rank requirements are, warn if unknown
  // TODO need more definitive handling for the other modes...
  if(battleForce && !battleForcesDict[battleForce][currentList.mode]){
      validationIssues.push({level:1, text:"Playing a battleforce in a mode with no defined battleforce construction rules (Defaulting to 1000pt)"});
  } 
  
  let rankReqs = getRankLimits(currentList);


  let unitCounts = {};
  // count units, count up them mercs, pull in any unit-specific issues
  currentList.units.forEach((unit)=>{
    const card = cards[unit.unitId];

    if(!unitCounts[unit.unitId]){
      unitCounts[unit.unitId] = 0;
    }
    unitCounts[unit.unitId] += unit.count;

    if(unit.validationIssues?.length > 0){
      validationIssues = validationIssues.concat(unit.validationIssues);
    }

    if(card.faction === 'mercenary'){
      mercs[card.rank] += unit.count;
    }
  });

  // Check detachment or any similar keywords once we know the full list count for units
  Object.getOwnPropertyNames(unitCounts).forEach(id =>{
    const card = cards[id];

    if(card.detachment){
      let parent = cards[card.detachment];
      let parentCount = unitCounts[card.detachment] ? unitCounts[card.detachment] : 0;

      if(unitCounts[id] > parentCount){
        let cardName = (card.displayName ? card.displayName : card.cardName).toUpperCase();
        let parentName = (parent.displayName ? parent.displayName : parent.cardName).toUpperCase();

        if(card.isUnique){
          validationIssues.push({level:2, text:"In order to use " + cardName + ", you must include " + parentName + ". (DETACHMENT)" });
        }
        else{
          validationIssues.push({level:2, text:"Too many " + cardName + "s  ("+ unitCounts[id] + ")." +
            "You need one " + parentName + "(" + parentCount + ") per " + cardName + ". (DETACHMENT)" });
        }
      }
    }
  })

  // TODO - now that we count units by ID, use that for BF validation
  validationIssues.push(...battleForceValidation(currentList, unitCounts));
  validationIssues.push(...rankValidation(currentList, ranks, mercs, rankReqs));
  validationIssues.push(...mercValidation(currentList, ranks, mercs));

  return validationIssues;
}

export {
  toggleUsingOldPoints,
  rehashList,
  convertHashToList,
  changeListTitle,
  // toggleListMode,
  setListMode,
  addUnit,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  addCommand,
  addContingency,
  removeContingency,
  removeCommand,
  equipUpgrade,
  unequipUpgrade,
  equipCounterpartUpgrade,
  unequipCounterpartUpgrade,
  equipLoadoutUpgrade,
  unequipLoadoutUpgrade,
  equipCounterpartLoadoutUpgrade,
  unequipCounterpartLoadoutUpgrade,
  incrementUnit,
  decrementUnit,
  restoreUnit,
  killUnit,
  mergeLists,
  getEligibleBattlesToAdd,
  getEligibleCommandsToAdd,
  getEligibleContingenciesToAdd,
  getEligibleUnitsToAdd,
  getEquippableUpgrades,
  getEquippableLoadoutUpgrades,
  generateTTSJSONText,
  generateTournamentText,
  generateStandardText,
  generateMinimalText,
  generateHTMLText,
  validateList,
  getRankLimits,
  getOriginalRankLimits
};
