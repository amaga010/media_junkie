var db = require("../models");
/*
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
*/

function gatherData() {
  var ageScore = $("#question1").parseint(val())
  var moodScore = $("#question2").val()
  var aloneScore = $("#question3").val()
  var genreScore = $("#question4").val()
  var directorScore = $("#question5").val()
  var elementScore = $("#question6").val()
  var discoverScore = $("#question7").val()

  if (aloneScore == "Alone") {
    return true
  };
  if (discoverScore == "Word of mouth" ) {
    return true
  };
}

var newUserScore = 0
var agesFromSurvey; //from sql data

// for age
if ((ageScore - 5) <= agesFromSurvey && (ageScore + 5) >= agesFromSurvey){
  newUserScore + 1
}

// for mood

