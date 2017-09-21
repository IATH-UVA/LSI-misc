const keyGoogle = 'AIzaSyBnyLxFjPMPe7IgujfYk-yaWcUCr9R-V7s'; //need a new api key for processsing
const keyFlickr = '74838237bffa820e9242c061634ec0dd';
const secrectFlickr = 'cb723072f6870d58';


const fs = require('fs');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");

const sitesG = require('../data/sitesGoogle.js');

const condensed = sitesG.map(site=>{
	return {
	name: site.siteName,
	imageCount: site.imgCount,
	views: site.viewTypes,
	location: [site.g_latitude, site.g_longitude],
	location_getty: [site.tgn_latitude, site.tgn_longitude]
	}

})

console.log(condensed);


// axios({
//         method: 'get',
//         url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Belvedere,Vienna,Austria&key=' + keyGoogle,
//         name: 'Belvedere',
//     })
//     .then(function(response) {
//         console.log(decodeURI(response.request.path));
//     });
