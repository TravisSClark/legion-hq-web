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

function getCsvCards(){

    const csvPathBase = "./"
    
    
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
    let inCsv = path.join(csvPathBase, 'units.csv');
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
    cleanedArray.push("name, title, isUnique, rank, minicount, faction, affiliation...");
    // Add all unit AND Command Card names (ccs are children of their unit)
    const count = linesArray.length;
    for (let a = 1; a < count; a++) {

      let line = []; //linesArray[a].split(',');

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

      if(a==1){
        // console.log(line.join("\r\n"));
      }

      let matchingCard = unitArray.find(c=>{
        let lhqName = c.cardName + (c.title ? " " + c.title : "");
        let csvName = line[0] + (line[1] ? " " + line[1] : "");
        return lhqName == csvName;
      });
      if(matchingCard){
        // console.log('found', matchingCard.id)
      }else{
        console.log('no match', line[0], line[1]);
      }

      // unitname,	subtitle,	unique,	rank name,	rank sort,	rank,	minicount,	faction,	unittype,	def,	hp,	couragetype,	courage,	speed#,	speed,	hitsurge,	defsurge,	unitkeywords,	
      // weaponname,	weaponkeywords	weapontype	weaponranges	weaponred	weaponwhite	weaponblack	weaponname 1	weaponkeywords 1	weapontype 1	weaponranges 1	weaponred 1	weaponwhite 1	weaponblack 1	weaponname 2	weaponkeywords 2	weapontype 2	weaponranges 2	weaponred 2	weaponwhite 2	weaponblack 2			
      
      let isMerc = ! ["empire", "rebels", "republic", "separatists"].includes(line[7]);
      let faction = line[7];
      let affiliation = "";
      let affiliations = ['rebels', 'empire'];
      if(isMerc){
        faction = "mercenary";
        affiliation = line[7].slice(1);
        // affiliations=TODO needs to make /sv of valid faction adds
      }

      // lhq id, name, subtitle, displayName, ttsName unique(t/f), rank, minicount,       faction, affiliation,  
      let newLine = [
        matchingCard.id, // lhq id
        line[0], // name
        line[1],  // title
        matchingCard.cost,
        matchingCard.displayName, 
        matchingCard.ttsName,
        matchingCard.imageName,
        matchingCard.upgradeBar.join("/ "), 
        line[2] == '-', // isunique
        line[3], // rank
        line[6], // minicount
        faction, 
        affiliation,
        affiliations.join("/ "), // TODO TODO  
        ...line.slice(8, line.length)]

      cleanedArray.push(newLine);
    }

    const indices={
      ID:0,
      NAME:1,
      TITLE:2,
      COST:3,
      DISPLAY_NAME:4,
      TTS_NAME:5,
      IMAGE_FILE:6,
      UPGRADEBAR:7,
      IS_UNIQUE: 8,
      RANK: 9,
      COUNT: 10,
      FACTION: 11,
      AFFL: 12,
      AFFLS:13,
      SUBTYPE: 14,
      DEFENSE:15,
      HP:16,
      COURAGE:18,
      SPEED:19,
      HITSURGE:21,
      DEFSURGE:22,
      KEYWORDS:23,
      WEAPONS:24
    }

    fs.writeFileSync('cleanedCsv.csv', cleanedArray.join('\r\n'));
    let newJson = {units:[]};
    cleanedArray.slice(1).forEach((l,i) =>{
      

      let newObj = {
        id: l[indices.ID],
        cardName: l[indices.NAME],
        title: l[indices.TITLE],
        cost: l[indices.COST],
        cardType:"unit",
        displayName: l[indices.DISPLAY_NAME],
        ttsName: l[indices.TTS_NAME],
        isUnique: l[indices.IS_UNIQUE],
        rank: l[indices.RANK],
        affiliation: l[indices.AFFL],
        affiliations: l[indices.AFFLS].split("/ "), // TODO
        cardSubtype: l[indices.SUBTYPE],
        keywords: l[indices.KEYWORDS].split("/ "), // TODO TODO TODO
        stats:{
          minicount: l[indices.COUNT],
          faction: l[indices.FACTION],
          
          defense: l[indices.DEFENSE] == "E" ? 'r':'w', // TODO maybe this should be 1|2
          hp: l[indices.HP],
          // skip courageType; derive from cardSubtype trooper/vehicle
          courage: l[indices.COURAGE], // call resilience courage too
          speed: l[indices.SPEED],
          // skip speed --- display
          hitsurge: l[indices.HITSURGE], // TODO
          defsurge: l[indices.DEFSURGE], // TODO
        },
        weapons:[],
      }

      for(let i=indices.WEAPONS; l.length > i && l[i]; i+=7){
        newObj.weapons.push(
          {
            name: l[i],
            keywords: l[i+1],
            // ignore weapontype for now
            range: l[i+3],
            // TODO think this over before finishing... feels clunky
            // dice:[...?]
            red: parseInt(l[i+4]), 
            white: parseInt(l[i+5]), 
            black: parseInt(l[i+6]), 
          }
        );
      }

      newJson.units.push(newObj)
      // console.log(l[20]);

    });

    fs.writeFileSync('newJson.json', JSON.stringify(newJson));

}



getCsvCards();





