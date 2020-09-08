const db = require("./sqlHelper");
const mRoute = require("express").Router();

//用户登录
mRoute.post("/userLogin", function (request, response) {
    let loginUser = request.body.loginUser;
    let loginPwd = request.body.loginPwd;
    const sql = "select * from USER where username = ? and pwd = ?";
    db.mQuery(sql, [loginUser, loginPwd], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            if (data.length > 0) {
                request.session.loginUser = loginUser;
                request.session.info = JSON.stringify(data[0]);
            }
            response.send({ code: 200, result: data });
        }
    });
});

//用户注册
mRoute.post("/userReg", function (request, response) {
    let zhuceUser = request.body.zhuceUser;
    let resPwd = request.body.resPwd;
    let email = request.body.Email;
    let sql = "insert into user(username,pwd,email) values(?,?,?)";
    db.mQuery(sql, [zhuceUser, resPwd, email], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, result: data });
        }
    });
});


module.exports = mRoute;