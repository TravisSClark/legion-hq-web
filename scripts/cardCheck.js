const fs = require('node:fs');

const cfile = require("./cards.js");
const cards = cfile.cards;  


let ids = Object.getOwnPropertyNames(cards);

let units = {};
let upgrades = [];
let ccs = {};
let battle =[];
let counterparts = [];
let flaws = [];
let unitNames = [];

let newCards = {};

ids.forEach((id,index) =>{
  
  
  
  let c = cards[id];
  if(c.id != id){
	  console.log("ID MISMATCH!! " + id + " " + c.cardName);
  }
  
	if(c.isOld){
	
		let i;
		for(i=index+1; i<ids.length; i++){
			let newCard = cards[ids[i]];
			if(c.cardName == newCard.cardName && (c.title == newCard.title || !c.title && !newCard.title))
			{
				
				//console.log("Has a new card! " + c.cardName);
				c.newCard = newCard.id;
				newCard.oldCard = c.id;
				break;
			}
		}
		if(i==ids.length){
			  console.log("No new card found " + c.cardName + " " + c.id);
		}
		
	}
  
  newCards[id] = c;

});
  

  
  fs.writeFile('./newCards.js', "export default " + JSON.stringify(newCards, undefined, 4), err => {
	  if (err) {
		console.error(err);
	  } else {
		// file written successfully
	  }
	});
	
	
	
	

