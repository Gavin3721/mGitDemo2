const mysql = require("mysql");

function DbOper(sql, params, callback) {
    var db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1",
        sort: 3306,
        database: "w227"
    });
    db.connect();
    db.query(sql, params, callback);
    db.end();
}

module.exports = {
    mquery: DbOper
};