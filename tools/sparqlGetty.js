var fetch = require('isomorphic-fetch');
var SparqlHttp = require('sparql-http-client');

var fs = require('fs');
const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf8');
const location = '../data/compare/images_siteListupdated.csv'; /// use tab version for clean read

const agents = require('../data/compare/07agentsB_non.js');

var content = agents.slice(0);

/*
const list = fs.readFileSync(location);
const content = decoder.write(list).split(',\r'); //read and break up csv into rows
//console.log(content);


var sitesChecked = require('../data/compare/sitesChecked_updated.js');
var sites= require('../data/compare/images_sitesGoogleClean.js');

//change into forEach and automated the {g:true} additions by overwriting

var check = sitesChecked.map((entry, i)=>{
	if (entry.results.length === 0){
		sites.forEach(site=>{
			if (site.name === entry.imgName && site["location_google"][0]!==null){
				entry.results = [{"g":true}]
			}
		})
	}
	return entry
                             });
var check3 = check.filter(entry=>entry.results.length === 0)
var check2 = sites.filter(entry=>entry["location_google"][0]===null)


		  const stringArray = JSON.stringify(check);
			//only turn on for updates//-----------------------------------------------
			fs.writeFileSync('../data/compare/sitesChecked2.js', 'var sitesChecked='+stringArray+';\r module.exports=sitesChecked');
*/


//console.log(sitesChecked.length, check3.length, sites.length, check2.length);


/* example format for persons or place label searching

select ?Subject where {
  ?Subject a skos:Concept; rdfs:label "Leonardo da Vinci";
     gvp:prefLabelGVP [xl:literalForm ?Term]}
*/

// general pattern read in and split csv, loop through array to create a new array of objects

//entry = { imgName: 'original', results: [{term:'ulan name', link: 'subject link', ulan: 'subject id'}, {etc:''} ] } // for each element in list

SparqlHttp.fetch = fetch;

// which endpoint to query
var endpoint = new SparqlHttp({endpointUrl: 'http://vocab.getty.edu/sparql'})

var namesChecked = [];

content.forEach(person=>{
	//if (person.ulan==="" && person.chp){
		var name = person.name[0];
	// the SPARQL query itself
		var query = `select * where { ?Subject a skos:Concept; rdfs:label "${name}"; gvp:prefLabelGVP [xl:literalForm ?Term]}`

		// run query with promises
		endpoint.selectQuery(query).then(function (res) {

		  return res.text()

		// result body of the query
		}).then(function (body) {
		  // parse the body for pretty print
		  var result = JSON.parse(body)

		  // output the complete result object
		  //console.log(person, JSON.stringify(result, null, ' '))
		  //console.log(person, result);

		  //formatting result.results.bindings....Subject.value (link), result.results.bindings...Term.value (name)
		  if (result.results.bindings.length>0){

		  	var found = result.results.bindings.map(entry=>{
		  		return entry['Subject'].value.replace('http://vocab.getty.edu/ulan/','')
		  	})

		  } else {
		  	var found = []
		  }


		  person.ulan = found.join(', ');
		  console.log(person, found);
		  /*
		  namesChecked.sort((a,b)=>{
		  	if (a.imgName > b.imgName) {
			    return 1;
			  }
			  if (a.imgName < b.imgName) {
			    return -1;
			  }
			  return 0;
		  });*/

		  console.log(content.length);
			//only turn on for updates//-----------------------------------------------
			fs.writeFileSync('../data/compare/07agentsB_nonUlan.js', 'var agents='+JSON.stringify(content)+';\r module.exports=agents');

		// necessary catch the error
		}).catch(function (err) {

		  //console.error(err)

		})

	//}

})




