const fs = require('fs');
const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf8');
//const list = require('../data/FLS_MetadataForParsing.csv');

const list = fs.readFileSync('../data/FLS_LocationsInventory.csv');
const content = decoder.write(list).split('\r\n'); //read and break up csv into rows

//grab headers in nameArr

const nameArr = [];

var item = content[0];
var elements = item.split(';');
for (i=0; i<elements.length; i++){
	if (nameArr.indexOf(elements[i])>-1 && nameArr.indexOf(elements[i]+'(1)')>-1){
		nameArr.push(elements[i]+'(2)');
	} else if (nameArr.indexOf(elements[i])>-1){
		nameArr.push(elements[i]+'(1)');
	} else {
		nameArr.push(elements[i]);
	}
};

content.shift(); // get rid of that

//create json from rows
const rowObjs=content.map(row=>{
	let items= row.split(';');
	let newObj = {};

	for (i=0; i<items.length; i++){
		newObj[nameArr[i]]=items[i];
	}

	return newObj;
})

console.log(rowObjs); // great json to work with....


//-------------------------------BASIC QUESTIONS FOR THIS DATABASE/PHOTOSET (in relation to the book)------------------------------------------------

/*
1. What are the unique sites (name, TGN, artist, style as baseline, with total number of photos per site)...sort by most to least

2. For each unique site grab all unique view types, artists, dates, style tags (etc per category) in order to explore what we have - where we can push the photo tags

3. What id numbers are missing in the overall order (what hasn't been sorted in the ArtStore system)?

4. What is the best way to sort by chapter/focus in order to facilitate text/image integration?? (conceptual question, but answer new week for integration with RA mterials)

*/