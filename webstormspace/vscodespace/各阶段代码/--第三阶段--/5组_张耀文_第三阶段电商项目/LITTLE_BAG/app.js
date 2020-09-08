const mexpress = require("express");
const logger = require("morgan");
const favicon = require("serve-favicon");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoute = require("./route/userRoute");
const viewRoute = require("./route/viewRoute");
const utilRoute = require("./route/utilRoute");
const productRoute = require("./route/productRoute");

const app = mexpress();
app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    secret: '123123',//作为服务器端生成 session 的签名
    name: 'shopapp',//这里的name指的是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 800000 },//设置maxAge是80000ms，也就是说80s后相应的cookie失效过期
    rolling: true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
    resave: true,//强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    saveUninitialized: true //强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。(默 认:true)。建议手动添加。
}));

app.use(userRoute);
app.use(viewRoute);
app.use(utilRoute);
app.use(productRoute);
app.use(mexpress.static(__dirname + "/public", { index: "index.html" }));
app.use(favicon(__dirname + "/public/img/favicon.ico"));

app.listen(8899);