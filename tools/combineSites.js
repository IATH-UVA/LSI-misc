const fs = require('fs');
const { StringDecoder } = require('string_decoder');

/*
const old = require ('../dataChp/sitesUTF8Min_Old');
const sitesChecked = require('../data/compare/sitesChecked_updated.js');
const imageSites = 
*/

const agents = require ('../data/compare/agentCombined_Updated.js');

console.log(agents.length);
/*
const namesChecked = require('../data/compare/namesChecked_updated.js');

const reformat = namesChecked.map(item=>{
	var name = [item.imgName.trim()];
	if (item.results[0]){
		name.push(item.results[0].term);
		var ulan = item.results[0].ulan;
	} else {
		var ulan = [];
	}
	return { name, ulan };
})
*/

/*
const agents2 = agents.map(item=>{
	if (item.name[0]){
		

	var name = item.name[0].split(', ');
	if (name.length>1 && name[1]!== 'Architect'){
		item.name.unshift(name[1]+' '+name[0]);
	} else {
		item.name[0] = name.join(', ');
	}
}
	return item;
})


var combined = agents2.sort((a,b)=>{
	if (a.name[0] > b.name[0]) {
			    return 1;
			  }
			  if (a.name[0] < b.name[0]) {
			    return -1;
			  }
			  return 0;
		  });;



console.log(combined);

const stringArrOld = JSON.stringify(combined);
fs.writeFileSync('../data/compare/agentCombined2.js', 'var agents='+stringArrOld+';\r module.exports=agents');
*/