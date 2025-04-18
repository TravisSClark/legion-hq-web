import fs from 'fs-extra';
import path from 'path';

async function readJson(inJson) {
  const ttsJson = await fs.readJson(inJson);
  return ttsJson;
}

function toKey(name) {
  return name.toUpperCase();
}

async function getTtsCards() {

  const ttsPathBase = "../tts/contrib/cards"

  // Get the top-level json listing factions and etc
  let inJson = path.join(ttsPathBase, 'official.json');
  const ttsJson = await readJson(inJson); //fs.readJson(inJson);

  // Get the list of individual top-level files
  const unitsArray = Object.entries(ttsJson['units']);

  const ttsNames = new Set();
  const ttsUnits = new Set();
  const ttsUpgrades = new Set();
  const ttsCcs = new Set();

  unitsArray.forEach(f => {
    const faction = f[0]

    const unitContentPath = path.join(ttsPathBase, f[1]);
    const rawUnitJson = fs.readFileSync(unitContentPath, 'utf-8');
    const unitJson = JSON.parse(rawUnitJson);
    for (const rank in unitJson) {
      const units = unitJson[rank];
      units.forEach(u => {
        if (u.content != null) {
          const rawUnitEmbedContent = fs.readFileSync(
            "../tts/" + u.content,
            'utf-8',
          );
          u = JSON.parse(rawUnitEmbedContent);
        }
        u = { ...u, rank, faction };
        let { name } = u;
        if (u.title) {
          name = `${name} ${u.title}`;
        }
        name = toKey(name);

        if (u.content === null && ttsUnits.has(name)) {
          console.warn("Duplicate name in TTS! " + name);
        }
        ttsNames.add(name);
        ttsUnits.add(name);

        if (u.commands) {
          u.commands.forEach(c => {
            if (c.name) {
              name = toKey(c.name);
              ttsNames.add(name);
              ttsCcs.add(name);
            }
          })
        }
      })
    }
  });

  // Add all upgrades
  const upgradeTypes = Object.entries(ttsJson['upgrades']);
  upgradeTypes.forEach(uType => {
    uType[1].forEach(u => {
      let name = toKey(u.name);
      if (ttsUpgrades.has(name)) {
        console.warn("Duplicate name in TTS! " + name);
      }
      ttsNames.add(name);
      ttsUpgrades.add(name);
    })
  })

  const commandCards = Object.entries(ttsJson['commands']);
  commandCards.forEach(ccCategory => {
    ccCategory[1].forEach(u => {
      let name = toKey(u.name);
      if (ttsCcs.has(name)) {
        console.warn("Duplicate name in TTS! " + ttsNames.size);
      }
      ttsNames.add(name);
      ttsCcs.add(name);
    })
  })

  for (const battleType in ttsJson["battlefield"]) {
    for (const bfType in ttsJson["battlefield"][battleType]) {
      // console.log(bfType);
      ttsJson["battlefield"][battleType][bfType].forEach(c => {
        ttsNames.add(toKey(c.name));
      })
    }
  }




  return { ttsNames, ttsUnits, ttsCcs, ttsUpgrades };
}


async function ttsCheckAsync() {

  let data = await fs.readFile('../src/constants/cards.json', 'utf8')

  let obj = JSON.parse(data);

  let ids = Object.getOwnPropertyNames(obj);

  let units = [];
  let upgrades = [];
  let ccs = [];
  let battle = [];
  let counterparts = [];
  let flaws = [];


  let { ttsNames, ttsUnits, ttsCcs, ttsUpgrades } = await getTtsCards();

  ids.forEach(id => {

    let c = obj[id];

    if (c.id != id)
      console.log("id mismatch!" + id);

    if (c.cardType == "unit") {
      units.push(c);
      return;
    }
    else if (c.cardType == "upgrade") {
      upgrades.push(c);
    }

    else if (c.cardType == "command") {
      ccs.push(c);
    }

    else if (c.cardType == "battle") {
      battle.push(c);
    }

    else if (c.cardType == "counterpart") {
      //console.log(c.cardName);
      counterparts.push(c);
    }

    else if (c.cardType == "flaw") {
      //console.log(c.cardName);
      flaws.push(c);
    }

    else {
      console.log(c.cardName);
      console.log(c.cardType);
    }

  });

  function getName(c) {
    let name = c.cardName;

    if (c.title) {
      name += " " + c.title;
    }
    if (c.ttsName) {
      // console.log("Mapping \"" + name + "\" to \"" + c.ttsName + "\"");
      name = c.ttsName;
    }
    return toKey(name);
  }

  let ttsOg = new Set();
  ttsNames.values().forEach(v => ttsOg.add(v));



  // Generally, these are cards removed from the game
  // TODO - evaluate these w TTS
  let tts_exceptions = [
    // TODO pull request made to TTS to fix typo
    // "A BEAUTIFUL FRIENDSDHIP",
    // TODO - figure out which wookiees are which, rename as needed
    // "WOOKIEE WARRIORS",
    "COMMANDING PRESENCE",
    "INTEGRATED COMMS ANTENNA",
    "LONG-RANGE COMLINK",
    // TTS seems to just import 3po as one card?
    // they do match re stats, so I guess that's fine
    // also gets re-named to our cardName+subtitle via a lua map, so maybe should just 
    // uncomment this line for now
    // "C-3PO",
    "NOT A STORY THE JEDI WOULD TELL",
    "FORCE LIFT",
    // Leave this as a warning for now - we're about to get hit by it again once marskmen are out ;)
    // "DC-15 CLONE TROOPER",
    "RECKLESS DRIVER",
    // TODO - pull request made to TTS to change this to '\"Nanny\" Programming', which is what both we and TTA use
    // "NANNY PROGRAMMING",
    // Ignore here - in this case, we export as 'offensive stance' so we're good
    "DEFENSIVE STANCE"
  ];

  let lhq_exceptions = [
    // Cards obsoleted by 2.6, removed in TTS, but that we support
    "PHASE I CLONE TROOPER",
    "PHASE II CLONE TROOPER",
    "Z-6 PHASE II CLONE TROOPER",
    "OFFENSIVE STANCE",

    // Pending TTS code changes / pull requests - these should go away on their own...
    // "\"NANNY\" PROGRAMMING",
    // "A BEAUTIFUL FRIENDSHIP",

    // 3p0 cards are OK - they're remapped from these full names to "C-3P0" in the .lua script itself (not the JS we parse for this check)
    "C-3PO HUMAN-CYBORG RELATIONS",
    "C-3PO MADE TO SUFFER",

    // Storm tide stuff
    "STORM TIDE COMMANDER",
    "ARMORED ASSAULT",
    "BROTHERS IN ARMS",
    "DOORS AND CORNERS",
    "KEEP THEM DOWN",
    "MAN THE GUNS",
    "SOMEBODY HAS TO BE A HERO",
    "STEALTH TEAM",
    "SURGICAL STRIKE",
    "TANK SHOCK",

    // Idk what these are - stormtide? store kit scenario?
    // did not find a way to get them to show w 2min of playing around
    "FORCES CONVERGE (ACT 1)",
    "SECURE THE INTEL (ACT 1)",
  ];

  function findAndRemoveFromTtsList(name, type) {
    if (!ttsNames.delete(name)) {
      // Check for multi-faction dupes like AT-RT and AA5
      if (!ttsOg.has(name)) {
        // console.log("LHQ " + type + " not found in TTS: " + name);

        if (!lhq_exceptions.includes(name))
          console.log("\"" + name + "\", // " + type);
      }

    }
  }

  function findAndRemoveAllFromTtsList(list, typeName) {
    // console.log(list.length + " cards");// + JSON.stringify(list));

    list.forEach(c => {
      findAndRemoveFromTtsList(getName(c), typeName);
    })
  }

  function findAndRemoveAllStringsFromTtsList(list, typeName) {
    // console.log(list.length + " cards");// + JSON.stringify(list));

    list.forEach(c => {
      findAndRemoveFromTtsList(c, typeName);
    })
  }

  console.warn("LHQ entries NOT found in TTS lists: ")

  findAndRemoveAllFromTtsList(units, "Unit");
  findAndRemoveAllFromTtsList(upgrades, "Upgrade");
  findAndRemoveAllFromTtsList(ccs, "CC");
  findAndRemoveAllFromTtsList(battle, "Battle");
  findAndRemoveAllFromTtsList(counterparts, "Counterpart");
  findAndRemoveAllFromTtsList(flaws, "Flaw");

  findAndRemoveAllStringsFromTtsList(tts_exceptions, "Obsolete/Redundant cards");


  console.log("\n\n");

  console.warn("TTS ENTRIES NOT FOUND IN LHQ: ")
  ttsNames.forEach(n => {
    console.log(n);
  })

  console.log("\n");


  console.log("LHQ Counts: ")
  console.log(ids.length + " Cards total");
  console.log(units.length + " Units");
  console.log(upgrades.length + " Upgrades");
  console.log(ccs.length + " CCs");
  console.log(battle.length + " Battle");
  console.log(counterparts.length + " Counterparts");
  console.log(flaws.length + " Flaws");

  console.log("\n");

  console.log("TTS counts: ");
  console.log("(sanity check - we'll never match 100% w different cards getting added and removed...)");
  console.log(ttsOg.size + " Cards Total");
  console.log(ttsUnits.size + " Units");
  console.log(ttsCcs.size + " CCs");
  console.log(ttsUpgrades.size + " Upgrades");



}

await ttsCheckAsync();
