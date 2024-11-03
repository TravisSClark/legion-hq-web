import fs from 'fs-extra';
import path from 'path';

// import buildDeckSchema  from "../tts/src/lib/generate-deck-schema";


async function readJson(inJson) {
    const ttsJson = await fs.readJson(inJson);
    return ttsJson;
}



function toKey(name){
    return name.toUpperCase();
}

async function getTtsUnits(){

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


    // Add all unit AND Command Card names (ccs are children of their unit)
    const count = unitsArray.length;
    for (let a = 0; a < count; a++) {
        const faction = unitsArray[a][0];

        unitsArray.forEach(f=>{
            const unitContentPath = path.join(ttsPathBase, f[1]);
            const rawUnitJson = fs.readFileSync(unitContentPath, 'utf-8');
            const unitJson = JSON.parse(rawUnitJson);
            for (const rank in unitJson) {
                const units = unitJson[rank];
                units.forEach(u=>{
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

                    ttsNames.add(name);
                    ttsUnits.add(ttsUnits);

                    if(u.commands){
                        u.commands.forEach(c=>{
                            if(c.name){
                                name = toKey(c.name);
                                ttsNames.add(name);
                                ttsCcs.add(name);
                            }
                        })
                    }
                })
            }
        });
    }

    // Add all upgrades
    const upgradeTypes = Object.entries(ttsJson['upgrades']);
    upgradeTypes.forEach(uType =>{
        uType[1].forEach(u=>{
            let name = toKey(u.name);
            ttsNames.add(name);
            ttsUpgrades.add(name);
        })
    })

    return {ttsNames, ttsUnits, ttsCcs, ttsUpgrades};
}


async function ttsCheckAsync(){

    let data = await fs.readFile('../src/constants/cards.json', 'utf8')
        
    let obj = JSON.parse(data);

    let ids = Object.getOwnPropertyNames(obj);

    let units = [];
    let upgrades = [];
    let ccs = [];
    let battle =[];
    let counterparts = [];
    let flaws = [];

    let cardUrls = [];
    let iconUrls = [];

    let ttsCards = await getTtsUnits();

    let count = 0;
    ttsCards.ttsNames.values().forEach(v=>{
        count++;
    });
    console.log("TTS cards count " + count);

    ids.forEach(id =>{
        
        let c = obj[id];
        // cardUrls.push(`/${c.cardType}Cards/${c.imageName}`);
        // iconUrls.push(`/${c.cardType}Icons/${c.imageName}`);

        if(c.id != id)
            console.log("id mismatch!" + id);

        if( c.cardType == "unit"){
            units.push(c);
            return;
        }
        else if( c.cardType == "upgrade"){
            upgrades.push(c);
        }   

        else if( c.cardType == "command"){
            ccs.push(c);
        }

        else if( c.cardType == "battle"){
            battle.push(c);
        }
        
        else if( c.cardType == "counterpart"){
            //console.log(c.cardName);
            counterparts.push(c);
        }
        
        else if( c.cardType == "flaw"){
            //console.log(c.cardName);
            flaws.push(c);
        }
        
        else{
            console.log(c.cardName);
            console.log(c.cardType);
        }

    });
    
   
    
    console.log(ids.length + " Cards total");
    console.log(units.length + " Units");
    console.log(upgrades.length + " Upgrades");
    console.log(ccs.length + " CCs");
    console.log(battle.length + " Battle");
    console.log(counterparts.length + " Counterparts");
    console.log(flaws.length + " Flaws");


    function getName(c){
        let name = c.cardName;
        if(c.ttsName){
            name = c.ttsName;
        }
        else if(c.title){
            name += " " + c.title;
        }
        return toKey(name);
    }

    function findAndRemoveFromTtsList(name, type){
        if(!ttsCards.ttsNames.delete(name)){
            console.log(type + " TTS not found: " + name);
        }
    }

    function findAndRemoveAllFromTtsList(list, typeName){
        // console.log(list.length + " cards");// + JSON.stringify(list));

        list.forEach(c=>{
            findAndRemoveFromTtsList(getName(c), typeName);
        })
    }

    function findAndRemoveAllStringsFromTtsList(list, typeName){
        // console.log(list.length + " cards");// + JSON.stringify(list));

        list.forEach(c=>{
            findAndRemoveFromTtsList(c, typeName);
        })
    }

    // console.log(units.length + " Units" + JSON.stringify(units));

    findAndRemoveAllFromTtsList(units, "Unit");
    findAndRemoveAllFromTtsList(upgrades, "Upgrades");
    findAndRemoveAllFromTtsList(ccs, "CCs");
    findAndRemoveAllFromTtsList(battle, "Battle");
    findAndRemoveAllFromTtsList(counterparts, "Counterparts");
    findAndRemoveAllFromTtsList(flaws, "Flaws");

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

    findAndRemoveAllStringsFromTtsList(tts_exceptions, "Obsolete/Redundant cards");


    console.log("\n\n");

    console.warn("TTS ENTRIES NOT FOUND IN LHQ: ")
    ttsCards.ttsNames.forEach(n=>{
        console.log(n);
    })




}
    
await ttsCheckAsync();
