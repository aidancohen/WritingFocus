const uuid = require('uuid');
const fs = require('fs');

exports.getAllGoals =  function() {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  return allGoals;
}

exports.getArrayGoals =  function() {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  let results=[];

  for(goal in allGoals){
    results.push(allGoals[goal])
  }
  return results;
}

exports.getGoal =  function(goalsID) {
  let allGoals = JSON.parse(fs.readFileSync(__dirname+'/../data/goals.json'));
  return allGoals[goalsID];
}

exports.createGoal = function(title, type, number, timelimit, userEmail){
  let goals = exports.getAllGoals();
  let newGoal = {
    "Author": userEmail,
    "Title": title,
    "Type": type,
    "Number": number,
    "TimeLimit": timelimit,
  };
  goals[title.split(" ").join("-")]=newGoal;
  fs.writeFileSync('data/goals.json', JSON.stringify(goals));
}
