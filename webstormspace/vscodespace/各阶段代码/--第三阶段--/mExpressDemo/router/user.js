const express = require("express");
const mrouter = express.Router();

//---------路由---------
//定义登录的处理方法
mrouter.get("/login.do", function (request, response) {
    console.log(request.query);
    let username = request.query.username;
    let password = request.query.password;
    if (username == 'admin' && password == '123123') {
        response.send("get登录成功");
    } else {
        response.send("get登录失败");
    }
});

mrouter.post("/login.do", function (request, response) {
    console.log(request.body);
    let username = request.body.username;
    let password = request.body.password;
    if (username == 'admin' && password == '123123') {
        response.send("post登录成功");
    } else {
        response.send("post登录失败");
    }
});

//将该路由模块导出
module.exports = mrouter;