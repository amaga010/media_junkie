var mysql = require("mysql");
var connection;

// mysql/jaws connection
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
      host: "i5x1cqhq5xbqtv00.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      port: 3306,
      user: process.env.WEBSITE_USER,
      password: process.env.WEBSITE_PASSWORD,
      database: process.env.WEBSITE_DATABASE,
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