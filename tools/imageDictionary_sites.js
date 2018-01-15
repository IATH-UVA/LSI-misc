const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");
const sitesChecked = require('../data/compare/sitesChecked_updated.js');

const sitesG = require('../data/compare/images_sitesGoogleClean.js');

var gNoTgn = sitesG.map(item=>{ delete item.tng; item.tgn = null; return item});
fs.writeFileSync('../data/compare/sitesGoogleCleanTgn.js', 'var sitesG='+JSON.stringify(gNoTgn)+';\r module.exports=sitesG');

const decoder = new StringDecoder('utf8');
const location = '../dataChp/00_Sites-tab.csv'; /// use tab version for clean read

const list = fs.readFileSync(location);
const content = decoder.write(list).split('\n'); //read and break up csv into rows

//condense and grab values

const table = [];


var item = content.shift();
var elements = item.split('\t');

content.forEach(row=>{
	var rowObj={}
	var itemsArr =row.split('\t');
	
	itemsArr.forEach((item,i)=>{
		rowObj[elements[i]]=item;
	})
	table.push(rowObj);
	
});

console.log(table);

const stringArray = JSON.stringify(table);
fs.writeFileSync('../dataChp/00_SitesUTF8.js', 'var sitesUTF8='+stringArray+';\r module.exports=sitesUTF8');


var names =[];
var duplicates = [];

var simple = table.map(item=>{
	return {
		name: item.site,
		tgn: item.tgn_id,
		type: item.tgn_type,
		chp: item.chapter,
		chpid: item.id
	}
}).filter(item=>{
	if (!names.includes(item.name)){
		names.push(item.name);
		return true
	} else {
		duplicates.push(item);
		return false
	}
	
})

console.log(table.length, simple.length);

const stringArr = JSON.stringify(simple);
fs.writeFileSync('../dataChp/00_SitesUTF8Min.js', 'var sitesUTF8Min='+stringArr+';\r module.exports=sitesUTF8Min');
const string = JSON.stringify(duplicates);
fs.writeFileSync('../dataChp/00_SitesUTF8Dup.js', 'var sitesUTF8Dup='+string+';\r module.exports=sitesUTF8Dup');


var old = [];

var overlap = simple.map(item=>{
	sitesChecked.forEach(entry=>{
		if (entry.results.length>0 && item.name !== undefined && (item.name === entry.imgName || item.name === entry.results[0].term)){
			item.old = (entry.results[0].tgn)? entry.results[entry.results.length-1].tgn : entry.results[0].g;
			old.push(item);
			console.log(item);
		}
	})
	return item;
})

var newItems = overlap.filter(item=>{
	return item.old=== undefined;
}).sort((a,b)=>{
	if (a.name > b.name) {
			    return 1;
			  }
			  if (a.name < b.name) {
			    return -1;
			  }
			  return 0;
		  });

var newToMap = newItems.filter(item=>item.tgn==='' || item.tgn===' ' );

console.log(simple.length, old.length, newItems.length, newToMap.length);

const stringArrMin = JSON.stringify(newItems);
fs.writeFileSync('../dataChp/00_SitesUTF8Min_.js', 'var sitesUTF8Min_='+stringArrMin+';\r module.exports=sitesUTF8Min_');

const stringArrMap = JSON.stringify(newToMap);
fs.writeFileSync('../dataChp/00_SitesUTF8Min_Map.js', 'var sitesUTF8Min_Map='+stringArrMap+';\r module.exports=sitesUTF8Min_Map');

const stringArrOld = JSON.stringify(old);
fs.writeFileSync('../dataChp/00_SitesUTF8Min_Old.js', 'var sitesUTF8Min_Old='+stringArrOld+';\r module.exports=sitesUTF8Min_Old');

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

 

//create json from rows
const rowObjs=content.map(row=>{
	let items= row.split('\t');
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
*/
console.log(elements);


//-------------------------------BASIC QUESTIONS FOR THIS DATABASE/PHOTOSET (in relation to the book)------------------------------------------------

/*
1. What are the unique sites (name, TGN, artist, style as baseline, with total number of photos per site)...sort by most to least

2. For each unique site grab all unique view types, artists, dates, style tags (etc per category) in order to explore what we have - where we can push the photo tags

3. What id numbers are missing in the overall order (what hasn't been sorted in the ArtStore system)?

4. What is the best way to sort by chapter/focus in order to facilitate text/image integration?? (conceptual question, but answer new week for integration with RA mterials)

*/

//-------------------------------BASIC QUESTIONS AS CODE------------------------------
/*
var artists=[];
var ulan =[];
var agentId={};

rowObjs.forEach(entry=>{
	artists=artists.concat(entry['creator.Display']);
	ulan = ulan.concat(entry['creator.NameSource']);

	for (var i=0; i<entry['creator.Display'].length; i++){
		agentId[entry['creator.Display'][i]] = entry['creator.NameSource'][i];
	}

})

var unqArtist = [];

artists.forEach((creator, i)=>{
	if (unqArtist.indexOf(creator) === -1){
		unqArtist.push(creator);
	}
})

unqArtist.sort();
var artistAnno=[];

unqArtist.forEach(item=>{
	let source = agentId[item];
	artistAnno.push(item+';'+source);
})

console.log(unqArtist.length); //384 to 358 after cleaning
console.log(artists.length, ulan.length, Object.keys(agentId).length);
console.log(agentId);

// const contents = unqArtist.sort().join(';\n');
// fs.writeFileSync('../data/agents.csv', contents);
	const contents = artistAnno.join(';\n');
	fs.writeFileSync('../data/agentSourceUTF8.csv', contents);
*/
//

/*
//1. simple count of unique core sites

var count=[];
var countlen=0;
const edit=[];

rowObjs.forEach(entry=>{
  // if (entry['Title'][0] && (entry['Title'][0].includes(',') || entry['Title'][0].includes(')') || entry['Title'][0].includes(':'))){
  //   if (edit.indexOf(entry['Title'][0])=== -1) { edit.push(entry['Title'][0])}
  // }

	if (count[entry['Title'][0]]){
		count[entry['Title'][0]].imgCount ++;
		count[entry['Title'][0]].images.push({id: entry['image.ID'][0], subsite: entry['Title.object'][0], viewType: entry['Title.imageView'][0] })

		var artist = entry['creator.Display']
		console.log(artist);
		if (!count[entry['Title'][0]].creators.includes(...artist)){
			count[entry['Title'][0]].creators = count[entry['Title'][0]].creators.concat(artist);
		};

		var roles = entry['creator.Role']
		if (!count[entry['Title'][0]].creatorRoles.includes(...roles)){
			count[entry['Title'][0]].creatorRoles = count[entry['Title'][0]].creatorRoles.concat(roles);
		};

		var subject = entry['keywords']
		if (subject !== undefined && !count[entry['Title'][0]].keywords.includes(...subject)){
			count[entry['Title'][0]].keywords = count[entry['Title'][0]].keywords.concat(subject);
		};


	} else {
		count[entry['Title'][0]]={}; // create

		count[entry['Title'][0]].siteName=entry['Title'][0];
		 count[entry['Title'][0]].imgCount=1; //collect and update these elements
		 count[entry['Title'][0]].images =[{id: entry['image.ID'][0], subsite: entry['Title.object'][0], viewType: entry['Title.imageView'][0] }]

		 // count[entry['Title'][0]].subsites = [ entry['Title.object'][0]] ;
		 // count[entry['Title'][0]].viewTypes = [ entry['Title.imageView'][0] ] ;
		 // count[entry['Title'][0]].imageIds =  [ entry['image.ID'][0] ] ;
		 console.log(entry['creator.Display']);
		count[entry['Title'][0]].creators = entry['creator.Display']; // this will be an array
		count[entry['Title'][0]].creatorRoles = entry['creator.Role']; // this will be an array
		count[entry['Title'][0]].tng=entry['Location.ARTSTOR'][0]; // no need to update, grab one
		count[entry['Title'][0]].dates={
			early: entry['Date.earliest'][0],
			late: entry['Date.latest'][0],
			display: entry['Date.display'][0],
		};
		count[entry['Title'][0]].aat_style = entry['Date.stylePeriod']; // this will be an array
		count[entry['Title'][0]].keywords = entry['keyword'];
		count[entry['Title'][0]].location = {
			type: entry['Location.type'][0],
			country: entry['Location.country'][0],
			state: entry['Location.state-province'][0],
			city: entry['Location.city-county'][0],
		}
		// count[entry['Title'][0]].editor = [entry['Processor'][0]]

		countlen++;
	}

})

//console.log('count', count, 'total number of sites: ', countlen); // so those are much less organized

//loop through and run getty query to grab lat/long generally, add to object for the moment

//testing basic remote quests


// axios({
//   method:'get',
//   url:'http://vocab.getty.edu/tgn/1000080-geometry.json',
// })
//   .then(function(response) {
//   console.log('latitude: ', response.data['http://vocab.getty.edu/tgn/1000080-geometry']['http://schema.org/latitude'][0].value);
//   console.log('longitude: ', response.data['http://vocab.getty.edu/tgn/1000080-geometry']['http://schema.org/longitude'][0].value);
// });



var nolocation=0;
var getty=[];
var sited=[];
var nonsited=[];

for (site in count){
	siteObj = count[site];

	if (siteObj.tng && !(isNaN(+siteObj.tng)) && siteObj.tng !== undefined){
		var num = +siteObj.tng;
		//console.log(num);

		getty.push(axios({ //reset this to be a promise structure - after all are returned, then save out working files for quick visualization iteration. . .
		  method:'get',
		  url:'http://vocab.getty.edu/tgn/'+num+'-place.json',
		}));

		sited.push(siteObj);

	} else {
		count[site].tgn_latitude=null;
		count[site].tgn_longitude = null;
		nolocation ++;

		nonsited.push(count[site]);

	}

};

var siteTNG=[];

	Promise.all(getty).then(function(responses) {

			responses.forEach((response, i)=>{

				  var key = Object.keys(response.data)[0];
				  var id = key.replace('http://vocab.getty.edu/tgn/', '').replace('-place', '');

				  var context = sited.filter(site=>{
				  	return (+site.tng === +id && !site.tgn_latitude);
				  })

				  var con = context.map(site=>{

				  	site.tgn_latitude=response.data[key]['http://www.w3.org/2003/01/geo/wgs84_pos#lat'][0].value;
				  	site.tgn_longitude=response.data[key]['http://www.w3.org/2003/01/geo/wgs84_pos#long'][0].value;

				  	return site;

				  });

				  siteTNG=siteTNG.concat(context);

			})

			return siteTNG;

		}).then(siteTNG=>{

			const fullArray = siteTNG.concat(nonsited);
			const sortArray = fullArray.sort(function(a, b) {
			  return b.imgCount - a.imgCount;
			})
			const stringArray = JSON.stringify(sortArray);
			//console.log(stringArray);
			//only turn on for updates//-----------------------------------------------
			fs.writeFileSync('../data/sitesCondensedUTF8.js', 'var sitesUTF8='+stringArray+';\r module.exports=sitesUTF8');





		})

	.catch(err=>{
			console.log(err.message);
		});


//can I hit my box images without any issue? (look up their api tonight)---------- no and that sucks

//what about a simple 100+ image query to flickr? (easy sample, 100 closest pictures)
//leaflet - pick a site, display BBR json data, grab flickr and other photos -

*/
