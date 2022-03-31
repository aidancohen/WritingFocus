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
  let allEssays = exports.getAllEssays();
  if(allessays[essayID]){
    return allEssay[essayID];
  }
  return {};
}

exports.createEssay = function(title, text, userEmail){
  let essays = exports.getAllEssays();
  let date = new Date();
  let month = date.getMonth()+1
  let newEssay = {
    "Date": month.toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString(),
    "Author": userEmail,
    "Title": title,
    "Link": title.split(" ").join("-"),
    "Text": text.split(/\r?\n/)
  };
  essays[newEssay["Link"]]=newEssay;
  fs.writeFileSync('data/essay.json', JSON.stringify(essays));
}

exports.updateEssay = function(oldTitle, newTitle, text, userEmail){
  exports.deleteEssay(oldTitle);
  exports.createEssay(newTitle, text, userEmail);
}

exports.deleteEssay = function(title){
  let essays = exports.getAllEssays();
  delete essays[title];
  fs.writeFileSync('data/essay.json', JSON.stringify(essays));
}
