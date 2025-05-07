/**
 * Basically, a rat's nest of code snippets used to manipulate and extract data from cards.json
 * Most of this is defunct from grabnar's "Legion Listbuilder" offshoot, and was used to pull down cards and etc
 *
 * TODO TODO split this file up and then remove/rename it
 * + TTS check script
 * + internal cards_json_validator
 * X Script for pulling in a particular .csv with updated unit/weapon keywords to update cards.json with correct data + weapon profiles
 *
 *
 * (ie, tts_check was already derived from this, probably want another "do our cards make sense re IDs, schemas, keywords, and etc?" script
 *  to  run at build time, plus an occasional "rewrite cards.json with consistent field order and ditch obsolete fields" script)
 */

const fs = require("node:fs");

const args = process.argv.slice(2);

//let data = await fs.readFile('../src/constants/cards.json', 'utf8')

fs.readFile("./cards.js", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let obj = JSON.parse(data);

  let ids = Object.getOwnPropertyNames(obj);

  let units = {};
  let upgrades = [];
  let ccs = {};
  let battle = [];
  let counterparts = [];
  let unitNames = [];

  let cardUrls = [];
  let iconUrls = [];

  ids.forEach((id) => {
    let c = obj[id];
    cardUrls.push(`/${c.cardType}Cards/${c.imageName}`);
    iconUrls.push(`/${c.cardType}Icons/${c.imageName}`);

    if (c.cardType == "unit") {
      if (c.id != id) console.log("id mismatch!" + id);
      units[id] = c;

      return;

      let u = {};

      let unitName = c.cardName.toLowerCase().replaceAll(" ", "_");

      u.name = c.cardName;
      u.subtitle = c.title;
      u.rank = c.rank;
      if (u.rank == "special") u.rank = "special_forces";
      u.type = c.cardSubtype;

      u.courage = c.courage;
      u.defense = c.defense;
      // TODO surges
      if (c.surges) {
        if (c.surges.includes("crit")) {
          u.aSurge = 2;
        } else if (c.surges.includes("hit")) {
          u.aSurge = 1;
        } else {
          u.aSurge = 0;
        }

        if (c.surges.includes("block")) {
          u.dSurge = 1;
        } else {
          u.dSurge = 0;
        }
      }

      u.speed = c.speed;
      u.wounds = c.wounds;
      // TODO
      if (c.isUnique) {
        u.uniqueCount = 1;
      }
      u.points = c.cost;

      u.faction = c.faction;
      switch (c.faction) {
        case "fringe":
          u.faction = "mercenary";
          break;
        case "rebels":
          u.faction = "rebel";
          break;
        case "separatists":
          u.faction = "separatist";
          break;
      }

      u.image = "";
      u.keywords = c.keywords;
      u.upgrades = c.upgradeBar;

      //console.log(u.name);
      if (units.hasOwnProperty(unitName)) {
        if (u.subtitle)
          unitName += "_" + u.subtitle.toLowerCase().replaceAll(" ", "_");
        else {
          unitName += "_" + u.faction.toLowerCase();
        }
      }
      u.id = unitName;
      units[unitName] = u;
      unitNames.push(unitName);
    } else if (c.cardType == "upgrade") {
      let u = {};

      let cardName = c.cardName.toLowerCase().replaceAll(" ", "_");

      u.name = c.cardName;
      u.id = cardName;
      u.subtitle = c.title;
      u.rank = c.rank;
      u.type = c.cardSubtype;
      if (u.type == "heavy weapon") {
        u.type = "heavy";
      }

      // TODO
      if (c.isUnique) {
        u.uniqueCount = 1;
      }
      u.points = c.cost;

      u.faction = c.faction;
      switch (c.faction) {
        case "fringe":
          u.faction = "mercenary";
          break;
        case "rebels":
          u.faction = "rebel";
          break;
        case "separatists":
          u.faction = "separatist";
          break;
      }

      u.image = "";
      if (c.keywords.length > 0) {
        u.keywords = c.keywords;
      }

      //console.log(u.name);

      upgrades.push(u);
    } else if (c.cardType == "command") {
      let u = {};

      let cardName = c.cardName.toLowerCase().replaceAll(" ", "_");

      u.name = c.cardName;
      u.user = c.commander;
      u.pips = parseInt(c.cardSubtype);

      // TODO
      if (c.isUnique) {
        u.uniqueCount = 1;
      }

      u.faction = c.faction;
      switch (c.faction) {
        case "fringe":
          u.faction = "mercenary";
          break;
        case "rebels":
          u.faction = "rebel";
          break;
        case "separatists":
          u.faction = "separatist";
          break;
      }

      u.image = "";
      if (c.keywords.length > 0) {
        u.keywords = c.keywords;
      }

      //console.log(u.name);
      if (ccs.hasOwnProperty(cardName)) {
        if (u.subtitle)
          cardName += "_" + u.subtitle.toLowerCase().replaceAll(" ", "_");
        else {
          cardName += "_" + u.faction.toLowerCase();
        }
      }
      ccs[cardName] = u;
    } else if (c.cardType == "battle") {
      battle.push(c);
    } else if (c.cardType == "counterpart") {
      //console.log(c.cardName);
      counterparts.push(c);
    } else {
      console.log(c.cardName);
      console.log(c.cardType);
    }
  });

  fs.writeFile(
    "./units.js",
    "export default " + JSON.stringify(units, undefined, 4),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    }
  );

  let csv =
    "unique, unitname, subtitle, rank, minicount, faction, unittype, def, hp, courageType, courage, speed, hitsurge, defsurge, unitkeywords, unitupgrades\n\n";
  Object.getOwnPropertyNames(units).forEach((id) => {
    let u = units[id];
    if (u.isOld) return;

    let minicount = 4;

    if (u.rank == "commander" || u.rank == "operative" || u.rank == "heavy") {
      minicount = 1;
    }
    let hitsurge = "";
    let defsurge = "";
    if (u.surges) {
      if (u.surges.includes("crit")) {
        hitsurge = "o:c";
      } else if (u.surges.includes("hit")) {
        hitsurge = "o:h";
      }
      if (u.surges.includes("block")) {
        defsurge = "d:s";
      }
    }

    let unique = u.isUnique ? "-" : "";

    let courageType = u.cardSubtype.includes("vehicle") ? "V" : "m";

    let values = [
      unique,
      u.cardName,
      u.title,
      u.rank,
      minicount,
      u.faction,
      u.cardSubtype,
      u.defense == "red" ? "E" : "D",
      u.wounds,
      courageType,
      courageType == "m" ? u.courage : u.resilience,
      u.speed,
      hitsurge,
      defsurge,
      u.keywords?.join("/ "),
      u.upgradeBar?.join("/ "),
    ];
    csv += values.join(",") + "\n";
  });

  fs.writeFile("./units.csv", csv, (err) => {
    if (err) {
      //fs.writeFile('./upgrades.js', "export default " +JSON.stringify(upgrades, undefined, 4), err => {
      console.error(err); //  if (err) {
    } else {
      //	console.error(err);
      // file written successfully//  } else {
    } //	// file written successfully
  }); //  }
  //});

  fs.writeFile(
    "./ccs.js",
    "export default " + JSON.stringify(ccs, undefined, 4),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    }
  );

  fs.writeFile(
    "./ImageMap.js",
    "export default " + unitNames.join(': require(""),\n\t'),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    }
  );

  console.log(ids.length + " Cards total");
  console.log(Object.getOwnPropertyNames(units).length + " Units");
  console.log(Object.getOwnPropertyNames(upgrades).length + " Upgrades");
  console.log(Object.getOwnPropertyNames(ccs).length + " CCs");
  console.log(battle.length + " Battle");
  console.log(counterparts.length + " Counterparts");

  fs.writeFile("cardlist.txt", JSON.stringify(cardUrls), (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

  fs.writeFile("iconlist.txt", JSON.stringify(iconUrls), (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
});
