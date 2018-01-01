var sites = require('../data/sitesGoogleCleanNG.js');
var sitesG = require('../data/sitesGoogleClean.js');
const fs = require('fs');

console.log(sites.length, sitesG.length);

var combined = sites.map((entry, i)=>{
	entry.location_google = sitesG[i].location_google;
	entry.g_id = sitesG[i].g_id;

	return entry;
})

const cleaner = JSON.stringify(combined);
fs.writeFileSync('../data/images_sitesGoogleClean.js', 'var sites='+cleaner+';\r module.exports=sites');
