var mysql = require("mysql");
var connection;
require('dotenv').config()

// mysql/jaws connection
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
      host: "i5x1cqhq5xbqtv00.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      port: 3306,
      user: "esvqf02n04ag1dt8",
      password: "lk8pjaruij2obet2",
      database: "csisrql67xl751v1",
  });
}

// initialize connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;