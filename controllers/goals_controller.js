let express = require('express'),
    router = express.Router();
    const fs = require('fs');
    let Goals = require('../models/goals_model');

    router.get('/essay/createEssay', function(request, response) {
      let goals = JSON.parse(fs.readFileSync('data/goals.json'));
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("essay/createEssay", {
        Goals: goals
      });
    });

    router.get('/goals/createGoals', function(request, response) {
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("goals/createGoals");
    });

    router.post('/goals/createGoals', function (request, response){
      let goalsList = JSON.parse(fs.readFileSync('data/goals.json'));
      let newGoals = {
        "WordCount": request.body.Count.trim(),
        "TimeLimit": request.body.Time.trim(),
        "Essay": []
      }
      goalsList[newGoals['Goals']]=newGoals;
      fs.writeFileSync('data/goals.json', JSON.stringify(goalsList));
      response.redirect("/goals/createGoals")
    });

    app.get('/goals/viewGoals', function(request, response){
      let reviews = JSON.parse(fs.readFileSync("data/goals.json"));
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("goals/viewGoals", {
        goals: goals
      })
    });

    module.exports = router;
