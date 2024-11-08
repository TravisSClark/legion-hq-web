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


export {
  generateTTSJSONText,
  generateTournamentText,
  generateStandardText,
  generateMinimalText,
  generateHTMLText,
}