// ERROR: when the latter answers are submitted (5, 5, with others, internet, cine, journey) the movieRec comes back undefined

var connection = require("../config/connection");
const movieInfo = require('movie-info');

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.post("/results/", function (req, res) {
    let results = [];
    connection.query("select netflix, COUNT(netflix) AS MOST_FREQUENT from surveyData GROUP BY netflix ORDER BY COUNT(netflix) DESC LIMIT 2", function (err, data) {
      let netflixPop = null;
      for (i = 0; i < data.length; i++) {
        if (data[i].netflix != '0') {
          netflixPop = data[i].netflix;
        } else {
        }
      }
      results.push(netflixPop);
    });

    connection.query("select hulu, COUNT(hulu) AS MOST_FREQUENT from surveyData GROUP BY hulu ORDER BY COUNT(hulu) DESC LIMIT 2", function (err, data) {
      let huluPop = null;
      for (i = 0; i < data.length; i++) {
        if (data[i].hulu != '0') {
          huluPop = data[i].hulu;
        } else {
        }
      }
      results.push(huluPop);
    });

    connection.query("select prime, COUNT(prime) AS MOST_FREQUENT from surveyData GROUP BY prime ORDER BY COUNT(prime) DESC LIMIT 2", function (err, data) {
      let primePop = null;
      for (i = 0; i < data.length; i++) {
        if (data[i].prime != '0') {
          primePop = data[i].prime;
        } else {
        }
      }
      results.push(primePop);
    });

    connection.query("SELECT * FROM surveyData", function (err, data) {


      // gathering sql data for genre and director
      //console.log(data)
      // genre/discover score with id comes out like this [{ id: 1, genreScore: 1, directorScore: 1 }]
      var scaleObject = []
      for (var i = 0; i < data.length; i++) {
        scaleObject[i] = {
          id: data[i].id,
          genreScore: data[i].genre,
          directorScore: data[i].director
        }
      };

      // id with scores in an array, comes out like this [{ id: 1, scores: [ 1, 1 ] }]
      var sqlScaleData = [];
      for (var i = 0; i < scaleObject.length; i++) {
        var newDataObject = {};
        newDataObject.id = scaleObject[i].id;
        newDataObject.scores = [scaleObject[i].genreScore, scaleObject[i].directorScore];
        sqlScaleData.push(newDataObject)
      }

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

      //executing the first criteria 

      var incomingUserScale = req.body.scaleScores
      var scaleScoresArray = [];
      var bestScaleMatches = []; //this is what will be pushed to next criteria

      // iterates through users, then iterates through them again to gather their scores 
      for (var i = 0; i < sqlScaleData.length; i++) {
        var scoreDifference = 0;
        for (var j = 0; j < incomingUserScale.length; j++) {
          scoreDifference += (Math.abs(parseInt(sqlScaleData[i].scores[j]) - parseInt(incomingUserScale[j])))
        }
        scaleScoresArray.push({ id: sqlScaleData[i].id, score: scoreDifference })
      }

      // compare with users and find best matches
      for (var i = 0; i < scaleScoresArray.length; i++) {
        if (scaleScoresArray[i].score <= 3) {
          bestScaleMatches.push({ id: scaleScoresArray[i].id });
        }
      }

      // second criteria:
      // eliminates users who dont have close enough matches based on a boolean score (questions 4/5/6/7)
      // and pushes the matches to be moved on to the second criteria

      // getting the id's for the matches from the previous criteria
      var idForScaleMatches = [];
      for (i = 0; i < bestScaleMatches.length; i++) {
        idForScaleMatches.push(bestScaleMatches[i].id)
      }

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

      // creates an object of an array for the matches, while at the time removing any undefined(unmatched) id's from the array
      var advpObject = {}
      for (i = 0; i < booleanObject.length; i++) {
        if (booleanObject[i].id !== undefined) {
          advpObject[booleanObject[i].id] = [booleanObject[i].aloneScore, booleanObject[i].discoverScore, booleanObject[i].visualScore, booleanObject[i].plotScore];
        }
      }

      //executing the second criteria 

      // iterates through users, then iterates through them again to gather their scores 
      var incomingUserBoolean = req.body.booleanScores;
      var booleanScoresArray = []
      var bestBooleanMatches = []
      for (var i = 0; i < sqlBooleanData.length; i++) {
        var matchScore = 0;
        for (var j = 0; j < incomingUserBoolean.length; j++) {
          if ((Math.abs(parseInt(sqlBooleanData[i].scores[j]) - parseInt(incomingUserBoolean[j]))) == 0)
            matchScore += 1
        }
        booleanScoresArray.push({ id: sqlBooleanData[i].id, score: matchScore })
      }
      // compare with users and find best matches
      for (var i = 0; i < booleanScoresArray.length; i++) {
        if (booleanScoresArray[i].score >= 3) {
          bestBooleanMatches.push({ id: booleanScoresArray[i].id });
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

      // id with scores in an array, comes out like this [{ id: 1, scores: [ 1, 1 ] }]
      var sqlWrittenData = [];
      for (var i = 0; i < writtenObject.length; i++) {
        var newDataObject = {};
        if (writtenObject[i].id == idForBooleanMatches[i]) {
          newDataObject.id = writtenObject[i].id;
          newDataObject.scores = [writtenObject[i].netflixScore, writtenObject[i].huluScore, writtenObject[i].amazonScore];
          sqlWrittenData.push(newDataObject)
        }
      }
      // creates an object of an array for the matches
      var recObject = {}
      for (i = 0; i < writtenObject.length; i++) {
        if (writtenObject[i].id == idForBooleanMatches[i]) {
          recObject[writtenObject[i].id] = [writtenObject[i].netflixScore, writtenObject[i].huluScore, writtenObject[i].amazonScore];
        }
      }
      var movieRec = []
      for (i = 0; i < writtenObject.length; i++) {
        movieRec.push(writtenObject[i].netflixScore)
        if (writtenObject[i].netflixScore == undefined) {
          movieRec.push(writtenObject[i].huluScore)
          if (writtenObject[i].huluScore == undefined) {
            movieRec.push(writtenObject[i].amazonScore)
          }
        }
      };
      let topPick = null;
      for (i = 0; i < 3; i++) {
        if (movieRec[i] != '0') {
          topPick = movieRec[i];
        } else {
        }
      }
      results.push(topPick);
      console.log(results);
      res.render("results", {
        results
      });
    });
  });

  // first criteria:
  // eliminates users who dont have close enough matches based on a scale score (questions 2/3)
  // and pushes the matches to be moved on to the second criteria

  //function findMatches() {

  //}
};
//findMatches()

