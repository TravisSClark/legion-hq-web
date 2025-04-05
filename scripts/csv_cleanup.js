/**
 * Take PCGamerPirate's PFP file, remove some columns/types we don't care about, and map the 
 * LHQ id to each card
 */
import { match } from 'assert';
import fs from 'fs-extra';
import path from 'path';

async function readJson(inJson) {
    const ttsJson = await fs.readJson(inJson);
    return ttsJson;
}

function toKey(name){
    return name.toUpperCase();
}

function trimArray(array){
  for(let i =0; i<array.length; i++){
    array[i] = array[i].trim();
  }
}

function getCsvCards(){

    let unitArray = [];

    {
      let cardData = fs.readFileSync('../src/constants/cards.json', 'utf8')
        
      let fullObj = JSON.parse(cardData);

      Object.getOwnPropertyNames(fullObj).forEach(n =>{
        if(fullObj[n].cardType == 'unit'){
          unitArray.push(fullObj[n]);
        }
      });
    }

    // Get the top-level json listing factions and etc
    let inCsv = path.join("./", 'units.csv');
    let data;

    try {
      data = fs.readFileSync(inCsv, 'utf8');

    }catch{
      console.error('failed read');
      return;
    }

    // Get the list of individual top-level files
  
    let linesArray = data.split("\r\n");
    let cleanedArray = [];
    cleanedArray.push("lhqid, cost, name, title, displayName, ttsName, imageName, upgrades,  isUnique, rank, minicount, faction, affiliation, unit type, def, wounds, courage, speed, hitsurge, defsurge, keywords");
    for(let i=1; i<=3; i++){
      cleanedArray[0] += `, weapon${i}, keywords, type, range, r, w, b`;
    }


    // Add all unit AND Command Card names (ccs are children of their unit)
    const count = linesArray.length;
    for (let a = 1; a < count; a++) {

      let line = [];

      let lineByQuotes = linesArray[a].split('"');

      lineByQuotes.forEach((l,i)=>{
        if(i%2 == 0){
          let idx=0;
          if(i>0){
            idx =1;
          }
          line = line.concat(l.split(',').slice(idx));
          line.pop();
        }else{
          // TODO fix this for mercs
          line.push(l.replaceAll(',',"/"));
        }
      })

      let matchingCard = unitArray.find(c=>{
        let lhqName = c.cardName + (c.title ? " " + c.title : "");
        let csvName = line[0] + (line[1] ? " " + line[1] : "");
        return lhqName == csvName;
      });
      if(!matchingCard){
        console.log('no match', line[0], line[1]);
        continue;
      }

      // unitname,	subtitle,	unique,	rank name,	rank sort,	rank,	minicount,	faction,	unittype,	def,	hp,	couragetype,	courage,	speed#,	speed,	hitsurge,	defsurge,	unitkeywords,	
      // weaponname,	weaponkeywords	weapontype	weaponranges	weaponred	weaponwhite	weaponblack	weaponname 1	weaponkeywords 1	weapontype 1	weaponranges 1	weaponred 1	weaponwhite 1	weaponblack 1	weaponname 2	weaponkeywords 2	weapontype 2	weaponranges 2	weaponred 2	weaponwhite 2	weaponblack 2			
      
      let isMerc = ! ["empire", "rebels", "republic", "separatists"].includes(line[7]);
      let faction = line[7];
      let affiliation = "";
      if(isMerc){
        faction = "mercenary";
        affiliation = line[7].slice(1);
        // affiliations=TODO needs to make /sv of valid faction adds
      }


      // Grab data from PC's spreadsheet lines, convert it into the format we want
      // lhq id, name, subtitle, displayName, ttsName unique(t/f), rank, minicount,       faction, affiliation,  
      let newLine = [
        // get the stuff we need/define
        matchingCard.id, // lhq id
        matchingCard.cost,

        line[0], // name
        line[1],  // title

        matchingCard.displayName,
        matchingCard.ttsName,
        matchingCard.imageName,
        matchingCard.upgradeBar.join("/ "), 

        // now append the stuff from the printable format, preserving order best we can and changing symbols to ones that are more intuitive to read
        // (pfp reserves chars uniquely for things like the surge icon)
        line[2] == '-', // isunique
        line[3], // rank
        // 4 rank sort (idk what that means, lol)
        // 5 rank (num code)
        line[6], // mini count
        faction, // 7 faction 
        affiliation, // 7+ (minimal list has this combined w faction)
        line[8], // unit type
        line[9] == "E" ? "r":"w", // defense, red or white (E->r, D->w)
        line[10], // hp 
        // 11 courageType (derive this from unit type)
        line[12], // courage
        line[13], // speed#
        // 14 "speed", visualized as dashes, e.g. '---'
        line[15].length == 3 ? line[15].slice(2):"", // hitsurge - simplify to (h)it or (c)rit from o:c
        line[16].length >= 3 ? "b":"", // defsurge - simplify to (b)lock
        line[17], // unitkeywords
      ]
      
      // grab the 0-3 weapon profiles
      newLine = newLine.concat(line.slice(18));
      cleanedArray.push(newLine);
    }

    // Indices for the new/converted spreadsheet line
    const indices={
      ID:0,
      COST:1,

      NAME:2, 
      TITLE: 3,

      DISPLAY_NAME:4,
      TTS_NAME: 5,
      IMAGE_FILE: 6, 
      UPGRADEBAR: 7,

      IS_UNIQUE: 8,
      RANK: 9,
      MINI_COUNT: 10,
      FACTION: 11,
      AFFILIATION: 12,
      UNIT_TYPE: 13,
      DEFENSE:14,
      HP:15,
      COURAGE:16,
      SPEED:17,
      HITSURGE:18,
      DEFSURGE:19,
      KEYWORDS:20,
      WEAPON1:21,
      WEAPON2: 28,
      WEAPON3: 35,
    }

    fs.writeFileSync('cleanedCsv.csv', cleanedArray.join('\r\n'));

    {
      let cardString = fs.readFileSync('../src/constants/cards.json', 'utf8')
        
      let cardData = JSON.parse(cardString);
    
      cleanedArray.slice(1).forEach((l,i) =>{
        
        // Start with mandatory/simple fields
        let newObj = {
          id: l[indices.ID],
          cardName: l[indices.NAME],
          title: l[indices.TITLE],
          displayName:l[indices.DISPLAY_NAME],
          ttsName: l[indices.TTS_NAME],

          cardType:"unit",
          cardSubtype: l[indices.UNIT_TYPE],
          rank: l[indices.RANK],
          faction:l[indices.FACTION],
          affiliation: l[indices.AFFILIATION],
          isUnique: l[indices.IS_UNIQUE],
          cost: l[indices.COST],
          keywords: l[indices.KEYWORDS].split("/ "), // TODO TODO TODO
          upgradeBar: l[indices.UPGRADEBAR].split("/"),

          // 'Stats' that are generally not used for listbuilding
          stats:{
            minicount: l[indices.MINI_COUNT],
            hp: l[indices.HP],
            defense: l[indices.DEFENSE] == "E" ? 'r':'w', // TODO maybe this should be 1|2
            // skip courageType; derive from cardSubtype trooper/vehicle
            courage: l[indices.COURAGE], // call resilience courage too
            speed: l[indices.SPEED],
            // skip speed --- display
            hitsurge: l[indices.HITSURGE], // TODO
            defsurge: l[indices.DEFSURGE], // TODO
          },
          weapons:[],
        }

        for(let i=indices.WEAPON1; l.length > i && l[i]; i+=7){
          newObj.weapons.push(
            {
              name: l[i],
              keywords: l[i+1].split("/"),
              type: l[i+2],
              range: l[i+3],
              // note that we flip indices here from the PFP (listed rwb)
              dice:{
                r: parseInt(l[i+4]), 
                b: parseInt(l[i+6]), 
                w: parseInt(l[i+5]), 
              }
            }
          );
          trimArray(newObj.weapons[newObj.weapons.length -1].keywords);
        }

        let cleanedObj = {};
        let ogCardHistory = cardData[l[indices.ID]].history;
        console.log(JSON.stringify(ogCardHistory));

        if(ogCardHistory)
          console.log('found' + JSON.stringify(ogCardHistory));
          cleanedObj.history = JSON.parse(JSON.stringify(
            ogCardHistory
          ));

        Object.getOwnPropertyNames(newObj).forEach(k=>{
          if(newObj[k]){
            cleanedObj[k] = newObj[k];
          }
        })

        trimArray(cleanedObj.upgradeBar);
        trimArray(cleanedObj.keywords);


        cardData[cleanedObj.id] = cleanedObj; // Object.assign(cardData[cleanedObj.id], cleanedObj);
        // console.log(l[20]);
      });
      fs.writeFileSync('newJson.json', JSON.stringify(cardData, null, 2));
  }
}

getCsvCards();





