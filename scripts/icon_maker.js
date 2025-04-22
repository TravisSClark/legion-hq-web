import Jimp from "jimp";
import fs from 'fs';

const inputFolder = '';
const outputFolder = "";

// const portrait = [300,420];
// const landscape = [1040,720];

// const originalCardSize = [420, 300]

const legionHqIcon = [150,100]
fs.readdir(inputFolder, (err, files) => {
  files.forEach(file => {
	// Read the PNG file and convert it to editable format
	Jimp.read(inputFolder+file).then(image => {

		// Convert image to JPG and store it to 
		// 'magic' numbers taken from me guessing and checking
		// let xOffsetRatio = (144 / 420);
		// let yOffsetRatio = (45 / 300);
		
		// // unit cards (large side for more definition)
		// let x = - (3 * image.bitmap.width / 4);
		// let y = image.bitmap.height / 5;
		// let w = 2 * image.bitmap.width / 3;
		// let h = 2 * image.bitmap.height / 3;

		// command cards (do a second pass with / 5 or 4 instead of 3 for h for the more dense cards)
		let x = 0;
		let y = image.bitmap.height / 7;
		let w = image.bitmap.width;
		let h = image.bitmap.height / 3;

		// If your original images are already ~420w*300h, this is 'fuck-off overcomplicated', lol...
		// Otherwise, it *should* scale my window relative to yours if your images are 840x600 or w/e
		image.crop(x, y, w, h);
			
		//...just use this if your images are 420*300 then tweak if you don't want a headache
		// image.crop(image.bitmap.width - 150, 47, ...legionHqIcon);
		
		//...though, you may still need to size down+up a bit if you have same issues I did with images being not *quite* 150w on new cards (and some sloppy rhs crops)
		//...just use this if your images are 420*300 then tweak if you don't want a headache
		// image.crop(image.bitmap.width - 150, 47, 0.95*legionHqIcon[0], 0.95*legionHqIcon[1]);
		
		//image.crop(0,0, image.bitmap.width-54, image.bitmap.height);

		// Rescale
		image.resize(...legionHqIcon);
		image.write(outputFolder + file);
	}).catch(err => {
		console.log(err);
		return;
	});
  });
});