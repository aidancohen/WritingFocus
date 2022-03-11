const uuid = require('uuid');
const fs = require('fs');

exports.getAllEssays =  function() {
  let allEssays = JSON.parse(fs.readFileSync(__dirname+'/../data/essay.json'));
  return allEssays;
}

exports.getSortedEssays =  function() {
  let allEssays = JSON.parse(fs.readFileSync(__dirname+'/../data/essay.json'));
  let results=[];

  for(essay in allEssays){
    results.push(allEssays[essay])
  }
  results.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

  return results;
}

exports.getEssay =  function(essayID) {
  let allEssays = JSON.parse(fs.readFileSync(__dirname+'/../data/essay.json'));
  return allEssay[essayID];
}
