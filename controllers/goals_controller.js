let express = require('express'),
    router = express.Router();
    const fs = require('fs');
    let Goals = require('../models/goals_model');

    router.get('/goals/createGoals', function(request, response) {
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("goals/createGoals");
    });

    router.post('/goals/createGoals', function(request, response) {
      Goals.createGoal(request.body.Title.trim(), request.body.Type.trim(), request.body.Number.trim(), request.body.TimeLimit.trim());
      response.redirect("/goals/createGoals");
    });

    router.get('/goals/createGoals', function (request, response){
      let goalsList = Goals.getAllGoals()
      let newGoal = {
        "Title": request.body.Title.trim(),
        "Type": request.body.Type.trim(),
        "Number": request.body.Number.trim(),
        "TimeLimit": request.body.TimeLimit.trim()
      }
      goalsList[newGoal['Title']]=newGoal;
      fs.writeFileSync('data/goals.json', JSON.stringify(goalsList));
      response.redirect("/goals/createGoals")
    });

    module.exports = router;
