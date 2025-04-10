/**
 * Take PCGamerPirate's PFP file, remove some columns/types we don't care about, and map the 
 * LHQ id and other info we want to each card
 * 
 * There's a little bit of backwashing here re getting our ids and other info from our JSON, only to overwrite it via teh convert_csv_to_json script
 */
import fs from 'fs-extra';
import path from 'path';


// accounts for groups in " " ignoring commas
function parseCsvLineToArray(csvLine){
  let line = [];

  let lineByQuotes = csvLine.split('"');

  lineByQuotes.forEach((l,i)=>{
    // if we're not inside a "", just make each comma an array elem
    if(i%2 == 0){
      let idx=0;
      if(i>0){
        idx =1;
      }
      line = line.concat(l.split(',').slice(idx));
      line.pop();
    }else{
      // else, we're inside ""; ignore commas and just pass the element back (...and add the quotes back);
      line.push('"' + l + '"'); //l.replaceAll(',',"/"));
    }
  });

  return line;
}

function mergeUnits(unitArray){
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
  cleanedArray.push("%%UNITS");
  cleanedArray.push("##lhqid, cost, name, title, displayName, ttsName, imageName, upgrades,  isUnique, rank, minicount, faction, affiliation, unit type, def, wounds, courage, speed, hitsurge, defsurge, keywords");
  for(let i=1; i<=3; i++){
    cleanedArray[0] += `, weapon${i}, keywords, type, range, r, w, b`;
  }

  // Add all unit AND Command Card names (ccs are children of their unit)
  for (let a = 1; a < linesArray.length; a++) {

    let line = parseCsvLineToArray(linesArray[a]); 

    let matchingCard = unitArray.find(c=>{
      let lhqName = c.cardName + (c.title ? " " + c.title : "");
      let csvName = line[0] + (line[1] ? " " + line[1] : "");
      return lhqName == csvName;
    });
    if(!matchingCard){
      console.error('no match', line[0], line[1], a);
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

  fs.writeFileSync('cleanedCsv.csv', cleanedArray.join('\r\n'), {flag:"a"});
}




function mergeUpgrades(upgradeArray){

  let inCsv = path.join("./", 'upgrades.csv');
  let data;

  try {
    data = fs.readFileSync(inCsv, 'utf8');

  }catch{
    console.error('failed read');
    return;
  }

  let linesArray = data.split("\r\n");
  let cleanedArray = [];
  cleanedArray.push("%%UPGRADES");

  cleanedArray.push("##lhqid, cost, name, title, displayName, ttsName, imageName, isUnique, type, restrictions, action, text, exhaust, expend, unit_keywords, wounds, isweapon, weap_name, weap_keywords, weap_type, weap_range_min, weap_range_max, r, w, b");

  // Add all unit AND Command Card names (ccs are children of their unit)
  for (let a = 1; a < linesArray.length; a++) {

    let line = parseCsvLineToArray(linesArray[a]);    

    let matchingCard = upgradeArray.find(c=>{
      let lhqName = c.cardName + (c.title ? ", " + c.title : "");
      let csvName = line[1];
      return lhqName.toLowerCase() == csvName.toLowerCase();
    });
    if(!matchingCard){
      if(line[0] == ""){
        console.log('done finding upgrades at line', a);
        break;
      }
      console.log('no match', line, a);
      continue;
    }

    //"##lhqid, cost, name, title, displayName, ttsName, imageName, isUnique, type, restrictions, action, text, exhaust, expend, unit_keywords, wounds, isweapon, weap_name, weap_keywords, weap_type, weap_range_min, weap_range_max, r, w, b");

    // Grab data from PC's spreadsheet lines, convert it into the format we want
    // lhq id, name, subtitle, displayName, ttsName unique(t/f), rank, minicount,       faction, affiliation,  
    let newLine = [
      // get the stuff we need/define
      matchingCard.id, // lhq id
      matchingCard.cost,

      ...line
    ]
    
    cleanedArray.push(newLine);
  }

  fs.writeFileSync('cleanedCsv.csv', cleanedArray.join('\r\n'), {flag:"a"});

}

function mergeOurJsonToPfp(){

  let cardsByType = {
    unit:[],
    upgrade:[],
    command:[],
    counterpart:[],
    flaw:[], // rip
    battle:[]
  }

  {
    let cardData = fs.readFileSync('../src/constants/cards.json', 'utf8')
      
    let fullObj = JSON.parse(cardData);

    Object.getOwnPropertyNames(fullObj).forEach(n =>{
      cardsByType[fullObj[n].cardType].push(fullObj[n]);
    });
  }

  fs.writeFileSync('cleanedCsv.csv', "");


  mergeUnits(cardsByType.unit);
  // not ready to rock yet
  // mergeUpgrades(cardsByType.upgrade);
    

}

function splitJson(){

  let cardData = fs.readFileSync('./newJson.json', 'utf8')
    
  let fullObj = JSON.parse(cardData);

  let cardsByType = {
    unit:[],
    upgrade:[],
    command:[],
    counterpart:[],
    flaw:[], // rip
    battle:[]
  }

  Object.getOwnPropertyNames(fullObj).forEach( n => {
    cardsByType[fullObj[n].cardType].push(fullObj[n]);
  });

  fs.writeFileSync('battleCards.json', JSON.stringify(cardsByType.battle));
  fs.writeFileSync('commandCards.json', JSON.stringify(cardsByType.command));
  fs.writeFileSync('counterpartCards.json', JSON.stringify(cardsByType.counterpart));
  fs.writeFileSync('flawCards.json', JSON.stringify(cardsByType.flaw));
  fs.writeFileSync('unitCards.json', JSON.stringify(cardsByType.unit));
  fs.writeFileSync('upgradeCards.json', JSON.stringify(cardsByType.battle));
}

mergeOurJsonToPfp();
splitJson();





