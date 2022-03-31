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
      Goals.createGoal(request.body.Title.trim(), request.body.Type.trim(), request.body.Number.trim(), request.body.TimeLimit.trim(), request.user._json.email);
      response.redirect("/goals/createGoals");
    });

    module.exports = router;
