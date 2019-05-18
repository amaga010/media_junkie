require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes (Check here if broken)
require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);
// app.get("/", function(req, res){
//   res.render("index");
// });

// app.get("/results", function(req, res){
//   res.render("results");
// });


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

 app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

// Starting the server, syncing our models ------------------------------------/
//db.sequelize.sync(syncOptions).then(function() {
  //app.listen(PORT, function() {
    //console.log(
      //"==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      //PORT,
      //PORT
    //);
  //});
//});

module.exports = app;