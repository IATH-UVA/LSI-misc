const fs = require('fs');
const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf8');
const location = '../data/photos/FLS_LocationsInventory.csv';

const list = fs.readFileSync(location);
const content = decoder.write(list).split('\n'); //read and break up csv into rows

//condense and grab values

const nameArr = [];
const keys = [];

var item = content.shift();
var elements = item.split(';');


for (var i=0; i<elements.length; i++){

	if (nameArr.indexOf(elements[i])>-1 && nameArr.indexOf(elements[i]+'(1)')>-1){
		nameArr.push(elements[i]+'(2)');
	} else if (nameArr.indexOf(elements[i])>-1){
		nameArr.push(elements[i]+'(1)');
	} else {
		nameArr.push(elements[i]);
		keys.push(elements[i]);
	}

};

//console.log(keys);

/* [ 'Processor',
  'image.ID',
  'sheet name',
  'sheet and slide number',
  'Title',
  'Title.object',
  'Title.workType',
  'Title.imageView',
  'Location.type',
  'Location.country',
  'Location.state-province',
  'Location.city-county',
  'Location.repository',
  'Location.ARTSTOR',
  'creator.Name',
  'creator.Nationality',
  'creator.Dates',
  'creator.Role',
  'creator.NameSource',
  'creator.Display',
  'Date.earliest',
  'Date.latest',
  'Date.display',
  'Date.stylePeriod',
  'Date.stylePeriod.source',
  '#culturalContext',
  '#culturalContext.source',
  'keyword',
  'Subject.source',
  'Source.photographer',
  'source.Contributor',
  'Source.institutionalContributor',
  'Source.date',
  'Source.Displaydate',
  'dateScanned',
  'dateProcessed',
  'Rights' ]

  */

//create json from rows
const rowObjs=content.map(row=>{
	let items= row.split(';');
	let newObj = {};

	for (var i=0; i<56; i++){
		let final = (nameArr[i]).length;

		if (nameArr[i][final-1]===')' && items[i]!==''){ //condense down so everything is an array
			newObj[nameArr[i].slice(0,-3)]=newObj[nameArr[i].slice(0,-3)].concat(items[i]);
		} else if (items[i]!==''){

			newObj[nameArr[i]]=[items[i]];
		} else if (items[i]===''){
			newObj[nameArr[i]]=[];
		}
	}

	return newObj;
})

// great json to work with....


//-------------------------------BASIC QUESTIONS FOR THIS DATABASE/PHOTOSET (in relation to the book)------------------------------------------------

/*
1. What are the unique sites (name, TGN, artist, style as baseline, with total number of photos per site)...sort by most to least

2. For each unique site grab all unique view types, artists, dates, style tags (etc per category) in order to explore what we have - where we can push the photo tags

3. What id numbers are missing in the overall order (what hasn't been sorted in the ArtStore system)?

4. What is the best way to sort by chapter/focus in order to facilitate text/image integration?? (conceptual question, but answer new week for integration with RA mterials)

*/

//-------------------------------BASIC QUESTIONS AS CODE------------------------------


//1. simple count of unique sites

const count={};
const edit=[];

rowObjs.forEach(entry=>{
  if (entry['Title'][0] && (entry['Title'][0].includes(',') || entry['Title'][0].includes(')') || entry['Title'][0].includes(':'))){
    if (edit.indexOf(entry['Title'][0])=== -1) { edit.push(entry['Title'][0])}
  }


	if (count[entry['Title'][0]]){
		count[entry['Title'][0]]++;
	} else {
		count[entry['Title'][0]]=1;
	}

})

console.log('to edit', edit, edit.length); // so those are much less organized
