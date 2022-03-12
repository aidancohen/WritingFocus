const uuid = require('uuid');
const fs = require('fs');

exports.getAllGoals =  function() {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  return allGoals;
}

exports.getGoal =  function(goalsID) {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  return allGoals[goalsID];
}

exports.createGoal = function(title, type, number, timelimit){
  let goals = exports.getAllGoals();
  let newGoal = {
    "Title": title.split(" ").join("-"),
    "Type": type,
    "Number": number,
    "TimeLimit": timelimit,
  };
  goals[newGoal["Title"]]=newGoal;
  fs.writeFileSync('data/goals.json', JSON.stringify(goals));
}
