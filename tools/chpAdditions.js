 var agents_w07 = require('../data/compare/agents_w07.js');
 var agents = require('../data/compare/07agentsA_ulan.js');
const fs = require('fs');

const filterMatch = (array, word)=>{
	var res = array.filter(item=>{
		return item.includes(word);
	});
	return res.length;
}

function filterUnique (value, index, self){
    return self.indexOf(value) === index;
}

console.log(agents_w07.length);

 agents.forEach(agent=>{
		var match = false;

	agent.name.forEach(name=>{
		agents_w07.forEach(agent2=>{
			var arr = agent2.name.map(names=>names.toLowerCase());
			if (arr.includes(name.toLowerCase())|| filterMatch(arr, name.toLowerCase())){
			//agent.ulan = agent2.ulan;
			(!agent2.id)? agent2.id = agent.id: null;
			agent2.name = agent2.name.concat(agent.name).filter( filterUnique );;
			match = true;
		}
	})

	})
	if (!match){
		agents_w07.push(agent)
	}
	console.log(match, (!match)? agent.name : null);
})

agents_w07.sort((a,b)=>{
	if (a.name[0] > b.name[0]) {
			    return 1;
			  }
			  if (a.name[0] < b.name[0]) {
			    return -1;
			  }
			  return 0;
		  });


console.log(agents_w07);

// var nonMatch = agents.filter(agent=>agent.ulan===undefined);
// var match = agents.filter(agent=>agent.ulan!==undefined);

// console.log(agents.length, nonMatch.length, match.length);

fs.writeFileSync('../data/compare/agents_07ulan.js', 'var agents_07ulan='+JSON.stringify(agents_w07)+';\r module.exports=agents_07ulan');
// fs.writeFileSync('../data/compare/07agentsB.js', 'var agents='+JSON.stringify(agents)+';\r module.exports=agents');
// fs.writeFileSync('../data/compare/07agentsB_non.js', 'var agents='+JSON.stringify(nonMatch)+';\r module.exports=agents');


//------------------------simple recombine--------------------------------------------------

// var agents = require('../data/compare/07agentsB.js');
// var agentsB = require('../data/compare/07agentsB_nonUlan.js');

// agents.forEach(agent=>{
// 	if (!agent.ulan){
// 		agentsB.forEach(ag=>{
// 			if (agent.id === ag.id){
// 				agent.ulan = ag.ulan;
// 				//console.log(agent);
// 			}
// 		})

// 	}
// })

// fs.writeFileSync('../data/compare/07agentsA_ulan.js', 'var agents='+JSON.stringify(agents)+';\r module.exports=agents');


//------------------------add or include in master list--------------------------------------------------
