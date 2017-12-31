const fs = require('fs');
const { StringDecoder } = require('string_decoder');
const http = require('http');
const axios = require('axios');
const Promise = require("bluebird");

var sites = require(`../data/sitesCondensed.js`);
var sitesUTF8 = require(`../data/sitesCondensedUTF8.js`);

var initial =sites.map(e=>e.siteName);
var final = sitesUTF8.map(e=>e.siteName);
var remains = [];
var spelling = [];
sitesUTF8.forEach((e, i)=>{
	if (initial.indexOf(e.siteName) === -1){
		remains.push(e.siteName);
	}
});

sites.forEach((e, i)=>{
	if (final.indexOf(e.siteName) === -1){
		spelling.push(e.siteName);
	}
});


fs.writeFileSync('../data/spelling.txt', spelling.join('\r'));
fs.writeFileSync('../data/edits.txt', remains.join('\r'));

console.log(remains);
