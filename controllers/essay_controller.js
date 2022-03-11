let express = require('express'),
    router = express.Router();
    const fs = require('fs');
    const Essay = require('../models/essay_model');
    const Goals = require('../models/goals_model');

    router.get('essay/createEssay', function(request, response){
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("essay/createEssay");
    });

    router.post('/essay/createEssay', function(request, response) {
      let essay = JSON.parse(fs.readFileSync('data/essay.json'));
      let goalsList = JSON.parse(fs.readFileSync('data/goals.json'));
      let date = new Date();
      let month = date.getMonth()+1
      let newEssay = {
        "Date": month.toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString(),
        "Title": request.body.Title.trim(),
        "Link": request.body.Title.trim().replaceAll(" ", "-"),
        "Goals": [],
        "Text": request.body.Essay.trim().split(/\r?\n/)
      };
      essay[newEssay["Link"]]=newEssay;
      if (goalsList[newEssay["Goals"]]){
        goalsList[newEssay["Goals"]].Essay.push(newEssay["Link"])
      }
      fs.writeFileSync('data/essay.json', JSON.stringify(essay));
      fs.writeFileSync('data/goals.json', JSON.stringify(goalsList));
      response.redirect("/essay/createEssay");
    });

    router.get('/essay/:essayTitle', function(request, response){
      let essay = JSON.parse(fs.readFileSync('data/essay.json'));
      let essayTitle = request.params.essayTitle;
      if (essay[essayTitle]){
        response.status(200);
        response.setHeader('Content-Type', 'text/html');
        response.render("essay/readEssay", {
          essay: essay[essayTitle]
        });
      } else {
        response.status(404);
        response.setHeader('Content-Type', 'text/html');
        response.render("error", {
          "errorCode":"404"
        });
      }
    });

    module.exports = router;
