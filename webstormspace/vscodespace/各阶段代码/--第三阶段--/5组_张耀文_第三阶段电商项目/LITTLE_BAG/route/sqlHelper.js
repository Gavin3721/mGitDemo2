const mysql = require("mysql");

function DbHelper(sql, param, callback) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1",
        port: "3306",
        database: "shop"
    });
    db.connect();
    db.query(sql, param, callback);
    db.end();
}

module.exports = {
    mQuery: DbHelper
};
