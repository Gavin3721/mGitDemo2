const mexpress = require("express");
const logger = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const userRouter = require("./route/user.js");

const app = mexpress();
app.use(logger("dev"));
app.use(favicon(__dirname + "/public/img/favicon.ico"));
//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mexpress.static(__dirname + "/public", { index: "login.html" }));

//引用外部的路由
app.use(userRouter);

app.listen(8086);


