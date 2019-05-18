var connection = require("./connection");

var orm = {
    selectAll: function(req, res) {
        var sql = "SELECT * FROM surveyData"
        connection.query(sql, function(err, sqlResult) {
            if (err) {
                throw err;
            }
            res.json(sqlResult)
        })
        console.log(sql)
    }
}
module.exports = orm;