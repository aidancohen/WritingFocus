const uuid = require('uuid');
const fs = require('fs');

exports.getAllGoals =  function() {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  return allGoals;
}

exports.getGoals =  function(goalsID) {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  return allGoals[goalsID];
}
