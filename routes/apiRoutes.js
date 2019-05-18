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
// eliminates users who dont have close enough matches based on a scale score (questions 2/3)
// and pushes the matches to be moved on to the second criteria

function findMatches() {
  connection.query("SELECT * FROM surveyData", function(err, data) {

    // gathering sql data for genre and director
console.log(data)
    // genre/discover score with id comes out like this [{ id: 1, genreScore: 1, directorScore: 1 }]
    var scaleObject = []
    for (var i = 0; i < data.length; i++) {
      scaleObject[i] = {
        id: data[i].id,
        genreScore: data[i].genre,
        directorScore: data[i].director
      }
    };
    console.log("~`````")
    console.log(scaleObject)

    // id with scores in an array, comes out like this [{ id: 1, scores: [ 1, 1 ] }]
    var sqlScaleData = [];
    for (var i = 0; i < scaleObject.length; i++) {
      var newDataObject = {};
      newDataObject.id = scaleObject[i].id;
      newDataObject.scores = [scaleObject[i].genreScore, scaleObject[i].directorScore];
      sqlScaleData.push(newDataObject)
    }
console.log("``~~~``")
console.log(sqlScaleData)
    // obeject with each id having its own array of scores, comes out like this { '1': [ 1, 1 ]}
    var genreIDObject = {}
    for (i = 0; i < data.length; i++) {
      let sqlDataObject = {
        id: data[i].id,
        age: data[i].age,
        genre: data[i].genre,
        director: data[i].director,
        alone: data[i].alone,
        discover: data[i].discover,
        visual: data[i].visual,
        plot: data[i].plot,
        netflix: data[i].netflix, 
        hulu: data[i].hulu,
        prime: data[i].prime
      }
      genreIDObject[data[i].id] = sqlDataObject;
    }
    console.log("++++")
    console.log(genreIDObject)

    //executing the first criteria 

    var incomingUserScale = [3, 2]
    var scaleScoresArray = [];
    var bestScaleMatches = []; //this is what will be pushed to next criteria

    // iterates through users, then iterates through them again to gather their scores 
    for (var i = 0; i < sqlScaleData.length; i++) {
      var scoreDifference = 0;
        for (var j = 0; j < incomingUserScale.length; j++) {
          scoreDifference += (Math.abs(parseInt(sqlScaleData[i].scores[j]) - parseInt(incomingUserScale[j])))
        }
        scaleScoresArray.push( { id:sqlScaleData[i].id, score: scoreDifference } )
    }
    console.log("****")
    console.log(scaleScoresArray)

    // compare with users and find best matches
    for (var i = 0; i < scaleScoresArray.length; i++){
      if (scaleScoresArray[i].score <=  3 ){
        bestScaleMatches.push({id: scaleScoresArray[i].id});
      }
    }
    console.log("!@#$%")
    console.log(bestScaleMatches)

    // second criteria:
    // eliminates users who dont have close enough matches based on a boolean score (questions 4/5/6/7)
    // and pushes the matches to be moved on to the second criteria

    // getting the id's for the matches from the previous criteria
    var idForScaleMatches = [];
    for (i = 0; i < bestScaleMatches.length; i++) {
      idForScaleMatches.push(bestScaleMatches[i].id)
    }
    console.log("*&^")
    console.log(idForScaleMatches)

    // getting the alone, discover, visual, and plot data for the id's
    var booleanObject = []
    for (var i = 0; i < idForScaleMatches.length; i++) {
      booleanObject[i] = {
        id: genreIDObject[idForScaleMatches[i]].id,
        aloneScore: genreIDObject[[idForScaleMatches[i]]].alone,
        discoverScore: genreIDObject[[idForScaleMatches[i]]].discover,
        visualScore: genreIDObject[[idForScaleMatches[i]]].visual,
        plotScore: genreIDObject[[idForScaleMatches[i]]].plot
      }
    };
    console.log("~~~~")
    console.log(booleanObject)
     // id with scores in an array, comes out like this [{ id: 1, scores: [ 1, 1 ] }]
     var sqlBooleanData = [];
     for (var i = 0; i < booleanObject.length; i++) {
      var newDataObject = {};
       if (booleanObject[i].id !== undefined) {
        newDataObject.id = booleanObject[i].id;
        newDataObject.scores = [booleanObject[i].aloneScore, booleanObject[i].discoverScore, booleanObject[i].visualScore, booleanObject[i].plotScore];
        sqlBooleanData.push(newDataObject)
       }
     }
     console.log(sqlBooleanData)
     console.log("~~~~")
     console.log(booleanObject)
    // creates an object of an array for the matches, while at the time removing any undefined(unmatched) id's from the array
    var advpObject = {}
    for (i = 0; i < booleanObject.length; i++) {
      if (booleanObject[i].id !== undefined) {
        console.log(booleanObject[i].id)
        advpObject[booleanObject[i].id] = [booleanObject[i].aloneScore, booleanObject[i].discoverScore, booleanObject[i].visualScore, booleanObject[i].plotScore];
      }
    }
    console.log("~~~~")
    console.log(advpObject)

    //executing the second criteria 

    // iterates through users, then iterates through them again to gather their scores 
    var incomingUserBoolean = [1, 0, 1, 0];
    var booleanScoresArray = []
    var bestBooleanMatches = []
    for (var i = 0; i < sqlBooleanData.length; i++) {
      var matchScore = 0;
        for (var j = 0; j < incomingUserBoolean.length; j++) {
          if ((Math.abs(parseInt(sqlBooleanData[i].scores[j]) - parseInt(incomingUserBoolean[j]))) == 0)
          matchScore += 1
        }
        booleanScoresArray.push( { id:sqlBooleanData[i].id, score: matchScore } )
    }
    console.log("PPPPP")
    console.log(sqlBooleanData)

    // compare with users and find best matches
    for (var i = 0; i < booleanScoresArray.length; i++){
      if (booleanScoresArray[i].score >=  3 ){
        bestBooleanMatches.push({id: booleanScoresArray[i].id});
      }
    }

    // third criteria
    // of the matches form above return their show/movie reccommendation

    // getting the id's for the matches from the previous criteria
    var idForBooleanMatches = [];
    for (i = 0; i < bestBooleanMatches.length; i++) {
      idForBooleanMatches.push(bestBooleanMatches[i].id)
    }

    // getting the show reccomendations for the id's
    var writtenObject = []
    for (var i = 0; i < idForBooleanMatches.length; i++) {
      writtenObject[i] = {
        id: genreIDObject[idForBooleanMatches[i]].id,
        netflixScore: genreIDObject[[idForBooleanMatches[i]]].netflix,
        huluScore: genreIDObject[[idForBooleanMatches[i]]].hulu,
        amazonScore: genreIDObject[[idForBooleanMatches[i]]].amazon,
      }
    };
    console.log("$%^$#%^#")
    console.log(writtenObject)
     // id with scores in an array, comes out like this [{ id: 1, scores: [ 1, 1 ] }]
     var sqlWrittenData = [];
     for (var i = 0; i < writtenObject.length; i++) {
      var newDataObject = {};
       if (writtenObject[i].id == idForBooleanMatches) {
        newDataObject.id = writtenObject[i].id;
        newDataObject.scores = [writtenObject[i].netflixScore, writtenObject[i].huluScore, writtenObject[i].amazonScore];
        sqlWrittenData.push(newDataObject)
       }
     }

    // creates an object of an array for the matches
    var recObject = {}
    for (i = 0; i < writtenObject.length; i++) {
      if (writtenObject[i].id == idForBooleanMatches) {
        recObject[writtenObject[i].id] = [writtenObject[i].netflixScore, writtenObject[i].huluScore, writtenObject[i].amazonScore];
      }
    }
    console.log(recObject)
    
  });

}

findMatches()
// // if there are too many matches (lets say 10) narrow the list down by using age as a factor
// // if age of id is +- of the user then push into a new array
// // from that array randomly select a user id and display their movie reccomdation
// // if there are less than 10 matches then directly go to function that chooses an id at random