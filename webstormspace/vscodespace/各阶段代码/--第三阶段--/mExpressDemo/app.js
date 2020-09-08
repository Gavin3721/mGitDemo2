const mexpress = require('express');
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = mexpress();

//添加日志打印
app.use(logger("dev"));
//静态资源的路径访问设置
app.use(mexpress.static(__dirname + "/public", { index: "login.html" }));
//定义icon图标
app.use(favicon(__dirname + "/public/img/favicon.ico"));
//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//引用分离的动态路由文件user.js
const userRouter = require("./router/user");
app.use(userRouter);

app.listen(8085);