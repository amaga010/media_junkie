//var db = require("../models");
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


// var newUserScore = 0
// // for age
// var agesFromSurvey; //from sql data
// if ((ageScore - 5) <= agesFromSurvey && (ageScore + 5) >= agesFromSurvey){
//   newUserScore + 1
// } 

/*
var newUserScore = {
    ageScore = $("question1").parseInt(val()),
    scaleScore: [
      $("#question2").val(),
      $("#question3").val()
    ],
    booleanScore: [
      $("#question4").val(),
      $("#question5").val(),
      $("#question6").val(),
      $("#question7").val()
    ],
    writtenScore: [
      $("#question8").val(),
      $("#question9").val(),
      $("#question10").val()
    ]
}; */

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "webuser",
  password: "UCR",
  database: "movieJunkie_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// first criteria:
// eliminate users who dont have close enough matches
// create a function that will find users that have the least amount of difference between them in respect to the 2nd(genre) and 3rd(director) questions
// push those users into an array that will move onto the second criteria of elimination

function scaleScore() {
  connection.query("SELECT * FROM surveyData", function(err, data) {
    // genre/discover score with id
    var scaleObject = []
    for (var i = 0; i < data.length; i++) {
      scaleObject[i] = {
        id: data[i].id,
        genreScore: data[i].genre,
        directorScore: data[i].director
      }
    };
    //console.log(scaleObject)
    var sqlData = [];

    for (var i = 0; i < scaleObject.length; i++) {
      var newDataObject = {};
      newDataObject.id = scaleObject[i].id;
      newDataObject.scores = [scaleObject[i].genreScore, scaleObject[i].directorScore];
      sqlData.push(newDataObject)
    }
    // console.log(sqlData)
    var usersIDObject = {}
    for (i = 0; i < scaleObject.length; i++) {
      usersIDObject[scaleObject[i].id] = [scaleObject[i].genreScore, scaleObject[i].directorScore];
    }
    console.log(usersIDObject)
    //executing the first criteria 
    var incomingUserScale = [3, 5]
    var scoresArray = [];
    var bestMatches = [];

    // iterates through users, then iterates through them again to gather their scores 
    for (var i = 0; i < sqlData.length; i++) {
      var scoreDifference = 0;
        for (var j = 0; j < incomingUserScale.length; j++) {
          scoreDifference += (Math.abs(parseInt(sqlData[i].scores[j]) - parseInt(incomingUserScale[j])))
        }
        scoresArray.push( { id:sqlData[i].id, score: scoreDifference } )
    }
    console.log(scoresArray)
    // compare with users and find best matches
    for (var i = 0; i < scoresArray.length; i++){
      if (scoresArray[i].score <=  3 ){
        bestMatches.push({id: scoresArray[i].id, scores: usersIDObject[scoresArray[i].id]});
      }
      // if (scoresArray[i] <= 3) {
      //   bestMatches.push(scoresArray)
      // }
    }

    //var newestMatches = sqlData[bestMatches];
    console.log(bestMatches)
  });
}

scaleScore()

// first criteria:
// eliminate users who dont have close enough matches
// create a function that will find users that have the least amount of difference between them in respect to the 2nd(genre) and 3rd(director) questions
// push those users into an array that will move onto the second criteria of elimination
// var incomingUserScale = [27, 3, 5, false, false, true, false, "The Ozarks", "The Act", "I don't use this service"]
// var scoresArray = [];
// var bestMatches = [];

// // iterates through users, then iterates through them again to gather their scores 
// for (var i = 0; i < scaleObject.length; i++) {
//   var scoreDifference = 0;
//     for (var j = 0; incomingUserScale.length; j++) {
//       scoreDifference += (Math.abs(parseInt(storedDataScale[i].scaleScore[j]) - parseInt(incomingUserScale[j])))
//     }
//     scoresArray.push(scoreDifference)
// }

// // compare with users and find best matches
// for (var i = 0; i < scoresArray.length; i++){
//   if (scoresArray[i] <= scoresArray[bestMatches]){
//     bestMatches = i
//   }
// }

// var newestMatches = storedDataScale[bestMatch];


// // second criteria:
// // from the array matches of the first criteria do the following:
// // eliminate users who don't have close enough scores by
// // giving a user a score based on number of column matches. highest score is 4, lowest is 0
// // user has a score with each id from mysql table

// // create a function that creates a score between two users 
// // have that function run againts all others users from the mysql table
// // from that pull out id's that have matching scores of 3 or higer to be put into a new array of possible users

// var userScore = 0;
// var incomingUserBoolean = booleanScore;
// var storedDataBoolean; // data from mySQL. i.e the alone, discover, visual, and plot columns
// var booleanSurveryData = {}
// for (i = 0; i < storedDataBoolean; /*alone column*/ i++) {
//   if (incomingUserBoolean[0] == storedDataBoolean) {
//     userScore + 1
//   };
// };

// for (i = 0; i < storedDataBoolean; /*discover column*/ i++) {
//   if (incomingUserBoolean[0] == storedDataBoolean) {
//     userScore + 1
//   };
// };

// for (i = 0; i < storedDataBoolean; /*visual column*/ i++) {
//   if (incomingUserBoolean[0] == storedDataBoolean) {
//     userScore + 1
//   };
// };

// for (i = 0; i < storedDataBoolean; /*plot column*/ i++) {
//   if (incomingUserBoolean[0] == storedDataBoolean) {
//     userScore + 1
//   };
// };

// // third criteria:
// // of the matches from above return their show/movie recommendation 

// // if there are too many matches (lets say 10) narrow the list down by using age as a factor
// // if age of id is +- of the user then push into a new array
// // from that array randomly select a user id and display their movie reccemdation
// // if there are less than 10 matches then directly go to function that chooses an id at random