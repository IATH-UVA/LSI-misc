const keyGoogle = ''; //need a new api key for processsing

const fs = require('fs');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");

const sites = require('../data/sitesCondensed.js');

// so compose google place search (name, country) and google city search (city, country)
// retrieve lat/long for all so generic mapping/errors

/*[ 'siteName',
  'imgCount',
  'subsites',
  'viewTypes',
  'imageIds',
  'creators',
  'tng',
  'dates',
  'aat_style',
  'keywords',
  'loc',
  'tgn_latitude',
  'tgn_longitude' ]*/

var place = [];

// //------------------Testing for the initial site---------------------
// // axios({
// //         method: 'get',
// //         url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Belvedere,Vienna,Austria&key=' + keyGoogle,
// //     })
// //     .then(function(response) {
// //         console.log(JSON.stringify(response.data));
// //     });

// const tempResults = { "results":
// 		[{ "address_components": [
// 						{ "long_name": "27", "short_name": "27", "types": ["street_number"] },
// 						{ "long_name": "Prinz Eugen-Straße", "short_name": "Prinz Eugen-Straße", "types": ["route"] },
// 						{ "long_name": "Landstraße", "short_name": "Landstraße", "types": ["political", "sublocality", "sublocality_level_1"] },
// 						{ "long_name": "Wien", "short_name": "Wien", "types": ["locality", "political"] },
// 						{ "long_name": "Wien", "short_name": "Wien", "types": ["administrative_area_level_1", "political"] },
// 						{ "long_name": "Austria", "short_name": "AT", "types": ["country", "political"] },
// 						{ "long_name": "1030", "short_name": "1030", "types": ["postal_code"] }
// 						],
// 				"formatted_address": "Prinz Eugen-Straße 27, 1030 Wien, Austria",
// 				"geometry": {
// 					"location": { "lat": 48.1915585, "lng": 16.3809547 },
// 					"location_type": "ROOFTOP",
// 					"viewport": { "northeast": { "lat": 48.1929074802915, "lng": 16.3823036802915 }, "southwest": { "lat": 48.1902095197085, "lng": 16.3796057197085 } }
// 				},

// 				"place_id": "ChIJpZ4LAn0HbUcRB3aToFL8ZUo",
// 				"types": ["establishment", "museum", "point_of_interest", "premise"] }],

// 			"status": "OK" };

// const testObj ={};
// 	testObj.g_address = tempResults.results[0].formatted_address;
// 	testObj.g_latitude = tempResults.results[0].geometry.location.lat;
// 	testObj.g_longitude = tempResults.results[0].geometry.location.lng;
// 	testObj.g_id = tempResults.results[0].place_id;
// 	testObj.basic = tempResults.status;

// console.log(testObj);

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}


sites.forEach(site=>{
	//note I've done a find/replace for all non utf-8 characters as 'e'

	var gPlace = site.siteName + ',' + site.loc.city + ',' + site.loc.country;
	var address = 'https://maps.googleapis.com/maps/api/geocode/json?address='+gPlace +'&key='+keyGoogle;
	//console.log(address);

	place.push(axios({
		  		method:'get',
		  		url: address,
			}));

			// .then(function(response) {
			// 			if (response.data.status === 'OK'){
			// 					site.g_address = response.data.results[0].formatted_address;
			// 					site.g_latitude = response.data.results[0].geometry.location.lat;
			// 					site.g_longitude = response.data.results[0].geometry.location.lng;
			// 					site.g_id = response.data.results[0].place_id;

			// 			} else if (response.data.status === 'ZERO_RESULTS'){
			// 				site.gPlace_result = response.data.status;
			// 			};

			// 			return site;
  	// 			//add info here and then return site - which will become a new array... not everythin will geocode nicely.
			// })

})


Promise.all(place)
	.then(function(responses) {
		responses.forEach(response=>{
				console.log(response.data);
		})
	})
	.catch(console.log);
