import cards from 'constants/cards';
import legionModes from 'constants/legionModes';
import generateLink from 'pages/List/ListExtras/generateLink';

function getNumActivations(list) {
  return list.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);
}

function generateMissionCards(missionArray, label, html){
  let lineBreak = html ? '<br>' : '\n';
  if (missionArray.length > 0) {
    let objectives = `${label}:${lineBreak}`;
    missionArray.forEach((id) => {
      objectives += ` - ${cards[id].cardName}${lineBreak}`;
    });
    return objectives;
  }
  return '';
}

function generateTournamentText(list, html) {
  let lineBreak = html ? '<br>' : '\n';
  let header = `${list.title ? list.title : 'Untitled'}${lineBreak}`;
  header += `${list.pointTotal}/${legionModes[list.mode].maxPoints}`;
  const numActivations = getNumActivations(list);
  header += ` (${numActivations} activation${numActivations === 1 ? '' : 's'})${lineBreak}`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    if (unit.count === 1) {
      if (unit.unitId === 'pz') { // Kraken
        units += `${unitCard.cardName} - Kraken (${unit.totalUnitCost})${lineBreak}`;
      } else if (unit.unitId === 'qa') { // Kalani
        units += `${unitCard.cardName} - Kalani (${unit.totalUnitCost})${lineBreak}`;
      } else {
        units += `${unitCard.cardName} (${unit.totalUnitCost})${lineBreak}`;
      }
      for (let j = 0; j < unit.upgradesEquipped.length; j++) {
        if (unit.upgradesEquipped[j]) {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
            const loadoutCard = cards[unit.loadoutUpgrades[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
            units += `/${loadoutCard.cardName} (${loadoutCard.cost})${lineBreak}`;
          } else {
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})${lineBreak}`;
          }
        }
      }
      if (unit.counterpart) {
        const { counterpart } = unit;
        const counterpartCard = cards[counterpart.counterpartId];
        units += `${counterpartCard.cardName} (${unit.counterpart.totalUnitCost})${lineBreak}`;
        for (let j = 0; j < counterpart.upgradesEquipped.length; j++) {
          if (counterpart.upgradesEquipped[j]) {
            const upgradeCard = cards[counterpart.upgradesEquipped[j]];
            if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades[j]) {
              const loadoutCard = cards[counterpart.loadoutUpgrades[j]];
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
              units += `/${loadoutCard.cardName} (${loadoutCard.cost})${lineBreak}`;
            } else {
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})${lineBreak}`;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < unit.count; i++) {
        units += `${unitCard.cardName} (${unit.totalUnitCost / unit.count})${lineBreak}`;
        for (let j = 0; j < unit.upgradesEquipped.length; j++) {
          if (unit.upgradesEquipped[j]) {
            const upgradeCard = cards[unit.upgradesEquipped[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})${lineBreak}`;
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
    commands += `${pips}${commandCard.cardName}${lineBreak}`;
  });
  if (commands !== '') {
    commands = `${lineBreak}Commands:${lineBreak}${commands}`;
    commands += `••••Standing Orders${lineBreak}`;
  }
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies = `${lineBreak}Contingencies:${lineBreak}`;
    list.contingencies.forEach(commandId => {
      let pips = '••••';
      const commandCard = cards[commandId];
      if (commandCard.cardSubtype === '1') pips = '•';
      else if (commandCard.cardSubtype === '2') pips = '••';
      else if (commandCard.cardSubtype === '3') pips = '•••';
      contingencies += `${pips}${commandCard.cardName}${lineBreak}`;
    });
  }

  let battleDeck = '';
  battleDeck += generateMissionCards(list.primaryCards, "Objectives", false);
  battleDeck += generateMissionCards(list.secondaryCards, "Secondaries", false);
  battleDeck += generateMissionCards(list.advantageCards, "Advantages", false);

  if(battleDeck.length > 0){
    battleDeck = `${lineBreak}Battle Deck${lineBreak}` + battleDeck;
  }
  
  return header + units + commands + contingencies + battleDeck;
}

// TODO: I really want to combine this logic with the one above somehow
function generateStandardText(list) {
  let header = list.title ? list.title : 'Untitled';
  let points = `\n${list.pointTotal}/${legionModes[list.mode].maxPoints}`;
  const numActivations = getNumActivations(list);
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

  const getTtsName = (card)=>{
    if(card.ttsName){
      return card.ttsName;
    }else if(card.title){
      return card.cardName + " " + card.title;
    }else{
      return card.cardName;
    }
  }

  const writeCardsToJsonArray = (cardList, jsonArray) =>{
    if(!cardList)
      return;

    for (let i = 0; i < cardList.length; i++){
      const card = cards[cardList[i]];
      if(!card)
        continue;
      jsonArray.push(getTtsName(card));
    }
  }

  ttsJSON.listname = list.title;
  ttsJSON.points = list.pointTotal;
  ttsJSON.numActivations = getNumActivations(list);

  if (list.faction === 'rebels') ttsJSON.armyFaction = 'rebel';
  else if (list.faction === 'empire') ttsJSON.armyFaction = 'empire';
  else if (list.faction === 'republic') ttsJSON.armyFaction = 'republic';
  else if (list.faction === 'separatists') ttsJSON.armyFaction = 'separatist';
  else ttsJSON.armyFaction = '';

  if (list.battleForce) {
    ttsJSON.battleForce = list.battleForce;
  }

  ttsJSON.commandCards = [];
  writeCardsToJsonArray(list.commandCards, ttsJSON.commandCards);

  ttsJSON.commandCards.push('Standing Orders');

  ttsJSON.contingencies = [];
  writeCardsToJsonArray(list.contingencies, ttsJSON.contingencies);

  ttsJSON.units = [];
  for (let i = 0; i < list.units.length; i++) {
    const unitJSON = { name: '', upgrades: [], loadout: [] };
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];

    unitJSON.name = getTtsName(unitCard);
      
    writeCardsToJsonArray(unit.upgradesEquipped, unitJSON.upgrades);
    writeCardsToJsonArray(unit.loadoutUpgrades, unitJSON.loadout);

    if (unit.counterpart) {
      const counterpart = unit.counterpart;
      unitJSON.upgrades.push(getTtsName(cards[counterpart.counterpartId]));
      
      // Write counterpart to the units' arrays. FOR NOW, this doesn't cause any confusion (and is what TTS wants)
      // since only Iden has a counterpart with an upgrade, and said upgrade isn't a type Iden already has
      writeCardsToJsonArray(counterpart.upgradesEquipped, unitJSON.upgrades);
      writeCardsToJsonArray(counterpart.loadoutUpgrades, unitJSON.loadout);
    };
    if (unitCard.flaw) unitJSON.upgrades.push(cards[unitCard.flaw].cardName);
    
    for (let j = 0; j < unit.count; j++) 
      ttsJSON.units.push(unitJSON);
  }

  // TTS still uses the old names for battle cards
  ttsJSON.battlefieldDeck = { conditions: [], deployment: [], objective: [] };
  // ttsJSON.battlefieldDeck = { objective: [], secondary: [], advantage: [] };
  
  if (list.mode === "500-point mode") {
    ttsJSON.battlefieldDeck.scenario =  "skirmish";
  } else if (list.mode.includes("storm tide")) {
    ttsJSON.battlefieldDeck.scenario = "community"
  } else {
    ttsJSON.battlefieldDeck.scenario =  "standard";
  }

  // map the 'new' obj cards to the card type names TTS wants
  writeCardsToJsonArray(list.primaryCards, ttsJSON.battlefieldDeck.deployment);
  writeCardsToJsonArray(list.secondaryCards, ttsJSON.battlefieldDeck.objective);
  writeCardsToJsonArray(list.advantageCards, ttsJSON.battlefieldDeck.conditions);
  // TODO maybe someday we update this to the 'actual' new names, need a TTS update for that
  // appendMissionTTSJSON(list.primaryCards, ttsJSON.battlefieldDeck.objective);
  // appendMissionTTSJSON(list.secondaryCards, ttsJSON.battlefieldDeck.secondary);
  // appendMissionTTSJSON(list.advantageCards, ttsJSON.battlefieldDeck.advantage);

  ttsJSON.listlink = generateLink(list);

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
  generateMinimalText
};