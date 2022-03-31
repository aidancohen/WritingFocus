let express = require('express'),
    router = express.Router();
    const fs = require('fs');
    const Essay = require('../models/essay_model');
    const Goals = require('../models/goals_model');
    const User = require('../models/users_model');

    router.get('/', function(request, response){
      response.redirect('/auth/google');
    });

    router.get('/essay/createEssay', function(request, response){
      let goals = Goals.getArrayGoals();
      let personalGoals = [];
      for (let i = 0; i<goals.length; i++){
        if (goals[i].Author == request.user._json.email){
          personalGoals.push(goals[i]);
        }
      }
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("essay/createEssay", {
        goals: personalGoals
      });
    });

    router.get('/essay/displayEssays', function(request, response){
      let essays = Essay.getSortedEssays();
      let personalEssays = [];
      for (let i = 0; i<essays.length; i++){
        if (essays[i].Author == request.user._json.email){
          personalEssays.push(essays[i]);
        }
      }
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render("essay/displayEssays", {
        essays: personalEssays
      })
    }
    )

    router.post('/essay/createEssay', function(request, response) {
      Essay.createEssay(request.body.Title.trim(), request.body.Text.trim(), request.user._json.email);
      response.redirect("/essay/createEssay");
    });

    router.get('/essay/:essayTitle', function(request, response){
      let essays = Essay.getAllEssays();
      let essayTitle = request.params.essayTitle;
      let goals = Goals.getAllGoals();
      let goalTitle = request.params.goalTitle;
      if (essays[essayTitle]){
        response.status(200);
        response.setHeader('Content-Type', 'text/html');
        response.render("essay/readEssay", {
          essay: essays[essayTitle]
        //  goal: goals[goalsTitle]
        });
      } else {
        response.status(404);
        response.setHeader('Content-Type', 'text/html');
        response.render("error", {
          "errorCode":"404"
        });
      }
    });

    router.get('/essay/editEssay/:essayTitle', function(request, response){
      let essays = Essay.getAllEssays();
      let essayTitle = request.params.essayTitle;
      if (essays[essayTitle]){
        response.status(200);
        response.setHeader('Content-Type', 'text/html');
        response.render("essay/editEssay", {
          essay: essays[essayTitle]
        })
      } else {
        response.status(404);
        response.setHeader('Content-Type', 'text/html');
        response.render("error", {
          "errorCode":"404"
        });
      }
    });

    router.put('/essay/:essayTitle', function(request, response){
      let essays = Essay.getAllEssays();
      let essayTitle = request.params.essayTitle;
      console.log("yes");
      if (essays[essayTitle]){

        Essay.updateEssay(essayTitle, request.body.Title.trim(), request.body.Text.trim(), request.user._json.email);
        response.redirect('/essay/displayEssays');
      }
    });

    router.delete('/essay/:essayTitle', function(request, response){
      let essays = Essay.getAllEssays();
      let essayTitle = request.params.essayTitle;
      console.log(essayTitle);
      if (essays[essayTitle]){

        Essay.deleteEssay(essayTitle);
        response.redirect('/essay/displayEssays');
      } else {
        response.status(404);
        response.setHeader('Content-Type', 'text/html');
        response.render("error", {
          "errorCode":"404"
        });
      }
    });




    module.exports = router;
