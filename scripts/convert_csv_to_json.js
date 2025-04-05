/**
 * Take PCGamerPirate's PFP file, remove some columns/types we don't care about, and map the 
 * LHQ id to each card
 */
import fs from 'fs-extra';
import path from 'path';
import keywords from '../src/constants/keywords.js';

const factions = ["empire", "rebels", "separatists", "republic"];
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

function trimArray(array){

  try{
    for(let i =0; i<array.length; i++){
      array[i] = array[i].replace("->", "");
      array[i] = array[i].replace(">>", "");
      array[i] = array[i].replaceAll("\"", "");

      array[i] = array[i].trim();
    }
  }catch (e){
    console.error(JSON.stringify(array));
    throw e;
  }
}


// TODO TODO - there's some self-referential nonsense going on here re JSON - need a cleaner/sequential import/modify on the JSON
function expandKeywords(obj, array, allTheCardsCsv, allTheCardsJson = null){

  let expandedKeywords = [];

  trimArray(array);

  for(let i =0; i<array.length; i++){

    let k = array[i];
    // be a little lazy and just see if we can find the key in keywords obj
    if(k in keywords){
      expandedKeywords.push({name:k});
      continue;
    }

    let colonIdx = k.indexOf(":"); 

    if(colonIdx > -1){
      let name = k.slice(0, colonIdx);
      name = name.trim();

      let value = k.slice(colonIdx + 1);
      value = value.trim();
      expandedKeywords.push({name, value});
    }
    else{
      let lastSpace = k.lastIndexOf(" ");
      let numVal = parseInt(k.slice(lastSpace));
      let value = numVal ? numVal : k.slice(lastSpace);
      expandedKeywords.push({name:k.slice(0,lastSpace), value});
    }

    let ids;

    let newKeyword = expandedKeywords[expandedKeywords.length -1];

    // TODO we may get Op Anakin, new troops with matching cardnames (e.g. special issues), or something someday; then we'll need to send back full arrays and adjust lhq validator code appropriately

    switch(expandedKeywords[expandedKeywords.length-1].name){
      case "Associate":
        ids = allTheCardsCsv.filter((c)=>c[indices.NAME] == newKeyword.value).map(c=>c[indices.ID]);
        obj.associate = ids[0];
        break;
      case "Detachment":
        // Note that this could bite someday if we get another kw containing "Detachment" as a substr
        ids = allTheCardsCsv.filter((c)=>c[indices.NAME] == newKeyword.value && c[indices.FACTION] == obj.faction && c[indices.KEYWORDS].indexOf("Detachment") == -1 ).map(c=>c[indices.ID]);
        //console.log('detach ', obj.cardName, ids);
        obj.detachment = ids[0];
        break;
      case "Entourage":
        ids = allTheCardsCsv.filter((c)=>c[indices.NAME] == newKeyword.value).map(c=>c[indices.ID]);
        obj.entourage = ids[0];
        break;
      case "Special Issue":
        obj.specialIssue = newKeyword.value;
        break;
      // someday, should *probably* get a new name. Allegiances? idk
      case "Mercenary":
        obj.affiliations = newKeyword.value.split(',').map(v=>v.toLowerCase().trim());
        if(obj.affiliations[0].toLowerCase() == "all")
        {
          obj.affiliations = factions;
        } 
        else{
          while(i+1 < array.length && factions.includes(array[i+1].toLowerCase())){
            obj.affiliations.push(array[i+1].toLowerCase());
            newKeyword.value += (", " +array[i+1]);
            i++;
          }
        } 
        break;
      case "Equip":
        if(!allTheCardsJson){
          console.error("tried calling equip from a weapon...");
          break;
        }
        obj.equip = [];
        let equips = newKeyword.value.split(',').map(v=>v.trim());
        equips.forEach(e=>{
          // friggin' Bad Batch...
          ids = Object.keys(allTheCardsJson).filter((c)=> (e !="Hunter" || allTheCardsJson[c].isUnique ) && allTheCardsJson[c].cardType == "upgrade" && 
            ((allTheCardsJson[c].cardName + (allTheCardsJson[c].title ? allTheCardsJson.title : "")).toLowerCase()  == e.toLowerCase()));
          if(ids.length == 1){  
            obj.equip.push(ids[0]);
          }else{
            console.error("bad equip find: " + e, JSON.stringify(ids));
          }
        })
        
        while(i+1 < array.length && factions.includes(array[i+1].toLowerCase())){
          obj.affiliations.push(array[i+1].toLowerCase());
          newKeyword.value += (", " +array[i+1]);
          i++;
        } 
        break;
    }
  }
  obj.keywords = expandedKeywords;
}

function writeMergedCsvToJson(){


  

  {
    let cardString = fs.readFileSync('../src/constants/cards.json', 'utf8')
    let cardData = JSON.parse(cardString);

    let csvRaw = fs.readFileSync('cleanedCsv.csv', 'utf8')
    let cleanedArray = csvRaw.split('\r\n').slice(1)
      .map(
        l=>{
          let line = [];

          let lineByQuotes = l.split('"');

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
              line.push('"' + l + '"'); //l.replaceAll(',',"/"));
            }
          })
          return line;
        
        });

    console.log('processing ' + cleanedArray.length + " rows");
 
  
    cleanedArray.forEach((l,i) =>{
      
      let id = l[indices.ID];
      // Start with mandatory/simple fields
      let newObj = {
        id,
        cardName: l[indices.NAME],
        title: l[indices.TITLE],
        displayName:l[indices.DISPLAY_NAME],
        ttsName: l[indices.TTS_NAME],
        imageName:l[indices.IMAGE_FILE],

        cardType:"unit",
        cardSubtype: l[indices.UNIT_TYPE],
        rank: l[indices.RANK],
        faction:l[indices.FACTION],
        affiliation: l[indices.AFFILIATION],
        isUnique: l[indices.IS_UNIQUE] == "true",
        cost: parseInt(l[indices.COST]),
        keywords: l[indices.KEYWORDS].split("/"), // TODO TODO TODO
        upgradeBar: l[indices.UPGRADEBAR].split("/"),

        // 'Stats' that are generally not used for listbuilding
        stats:{
          minicount: parseInt(l[indices.MINI_COUNT]),
          hp: parseInt(l[indices.HP]),
          defense: l[indices.DEFENSE] == "E" ? 'r':'w', // TODO maybe this should be 1|2
          // skip courageType; derive from cardSubtype trooper/vehicle
          courage: parseInt(l[indices.COURAGE]), // call resilience courage too
          speed: parseInt(l[indices.SPEED]),
          // skip speed --- display
          hitsurge: l[indices.HITSURGE], // TODO
          defsurge: l[indices.DEFSURGE], // TODO
        },
        weapons:[],
        history:null
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
        expandKeywords(newObj.weapons[newObj.weapons.length -1], newObj.weapons[newObj.weapons.length -1].keywords, cleanedArray);
      }

      if(cardData[id]){
        let ogCardHistory = cardData[id].history;
        if(ogCardHistory){
          newObj.history = JSON.parse(JSON.stringify(
            ogCardHistory
          ));
        }
      }else{
        console.warn('no LHQ card found for:', id);
      }

      let cleanedObj = {};
      Object.getOwnPropertyNames(newObj).forEach(k=>{
        if(newObj[k]){
          cleanedObj[k] = newObj[k];
        }
      })

      trimArray(cleanedObj.upgradeBar);
      expandKeywords(cleanedObj, cleanedObj.keywords, cleanedArray, cardData);

      cardData[cleanedObj.id] = cleanedObj; // Object.assign(cardData[cleanedObj.id], cleanedObj);
    });
    fs.writeFileSync('newJson.json', JSON.stringify(cardData, null, 2));
  }
}

writeMergedCsvToJson();
console.log("Done!");





