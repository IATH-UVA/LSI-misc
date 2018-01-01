
const fs = require('fs');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");

// const site0 = require('../data/sitesGoogle_0-200.js');
// const site1 = require('../data/sitesGoogle_200-400.js');
// const site2 = require('../data/sitesGoogle_400.js');


// var sites = site0.concat(...site1, ...site2);

var sites = require('../data/sitesCondensedUTF8.js');

var hex = { '°':'&#x00B0;',
  '½':'&#x00BD;',
  'Á':'&#x00C1;',
  'É':'&#x00C9;',
  'Î':'&#x00CE;',
  'Ô':'&#x00D4;',
  '×':'&#x00D7;',
  'à':'&#x00E0;',
  'á':'&#x00E1;',
  'â':'&#x00E2;',
  'ã':'&#x00E3;',
  'ä':'&#x00E4;',
  'å':'&#x00E5;',
  'æ':'&#x00E6;',
  'ç':'&#x00E7;',
  'è':'&#x00E8;',
  'é':'&#x00E9;',
  'ê':'&#x00EA;',
  'ë':'&#x00EB;',
  'ì':'&#x00EC;',
  'í':'&#x00ED;',
  'î':'&#x00EE;',
  'ï':'&#x00EF;',
  'ò':'&#x00F2;',
  'ó':'&#x00F3;',
  'ô':'&#x00F4;',
  'ö':'&#x00F6;',
  'ú':'&#x00FA;',
  'ü':'&#x00FC;',
  'ō':'&#x014D;',
  'ū':'&#x016B;',
  '–':'&#x2013;',
  '—':'&#x2014;',
  '…':'&#x2026;',
  '′':'&#x2032;',
  '″':'&#x2033;' }

//console.log(hex);


const convertName = function(name){
	var nameHex = name.split('').map(char=>{
		if (hex[char]){
			return hex[char];
		} else {
			return char;
		}
	}).join('');

		return nameHex;

}

var cleaned = sites.map(site=>{

	// var creators = site.creators.reduce(function (allNames, name) {
	// 	  if (name in allNames) {
	// 	    allNames[name]++;
	// 	  }
	// 	  else {
	// 	    allNames[name] = 1;
	// 	  }
	// 	  return allNames;
	// 	}, {});

	return {
		name: site.siteName,
		nameVar: (site.siteName)? convertName(site.siteName) : null,
		imageCount: site.imgCount,
		images: site.images,
		creators: site.creators,
		creatorsVar: (site.creators !== undefined)? site.creators.map(item=>(item)?convertName(item):null): null,
		roles: site.creatorRoles,
		location_google: [site.g_latitude, site.g_longitude],
		g_id: site.g_id,
		tng: site.tng,
		dates: site.dates,
		aat_style: site.aat_style,
		keywords: site.keywords.reduce(function (allNames, name) {
		  if (name in allNames) {
		    allNames[name]++;
		  }
		  else {
		    allNames[name] = 1;
		  }
		  return allNames;
		}, {}),

	};



	})


const siteList = [];

cleaned.forEach(site=>{

	if (site.name !== site.nameVar){
		siteList.push(site.name, site.nameVar);
	} else {
		siteList.push(site.name);
	}
})

siteList.sort()

const nameList = [];

cleaned.forEach(site=>{
	if (site.creators.length>0){
		site.creators.forEach(author=>{
			console.log(author);
			if (author !== null){

				var vars = convertName(author);

				if (vars !== author){
					nameList.push(vars, author);
				} else {
					nameList.push(author);
				}
			}
		})
	}
})

nameList.sort();

var nL = nameList.reduce(function (a, b) {
	if (a[a.length-1] !== b ){
		var res = a.concat(b);
  	return res;
	} else {
		return a;
	}
}, [' ']);




var google = 0;
var tng = 0;
var none = 0;


var location = sites.map((site)=>{
		if (site.g_latitude){
			google ++
			return site.siteName +';'+site.imgCount+';'+2;
		} else if (site.tgn_latitude){
			tng ++
			return site.siteName +';'+site.imgCount+';'+1;
		} else {
			none ++
			return site.siteName +';'+site.imgCount+';'+0;
		}
	})



// const content = location.join(';\n');
// fs.writeFileSync('../data/namesNormalized_.csv', content);

const siteVars = siteList.join(',\r');
const nameVars = nL.join(',\r');
fs.writeFileSync('../data/siteList.csv', siteVars);
fs.writeFileSync('../data/nameList.csv', nameVars);


const cleaner = JSON.stringify(cleaned);
fs.writeFileSync('../data/sitesGoogleCleanNG.js', 'var sites='+cleaner+';\r module.exports=sites');

console.log(siteList.length, nameList.length, location.length, google, tng, none);
