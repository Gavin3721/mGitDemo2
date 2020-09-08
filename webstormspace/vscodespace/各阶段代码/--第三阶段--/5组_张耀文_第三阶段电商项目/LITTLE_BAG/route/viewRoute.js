const db = require("./sqlHelper");
const mroute = require("./productRoute");
const mRoute = require("express").Router();

mRoute.get("/", (request, response) => {
    response.redirect("/index.html");
});

mRoute.get("/index.html", async (request, response) => {
    let data1 = await getBanner();
    console.log(data1);
    request.imgArr = data1.imgArr;
    request.urlArr = data1.urlArr;
    let data2 = await getNewProduct();
    request.productArr = data2;

    if (request.session.loginUser) {
        response.render("index", { user: request.session.loginUser, headImage: JSON.parse(request.session.info).headimage, request });
    } else {
        response.render("index", { user: '', headImage: '', request });
    }
});

//获取轮播的广告图信息
function getBanner() {
    return new Promise((resolve, reject) => {
        let sql = "select * from Banner where keyname = 'lunbo' order by createtime desc limit 0,3";
        let imgArr = [], urlArr = [];
        db.mQuery(sql, [], (err, data) => {
            if (err) {
                console.log(err);
                response.send({ code: 500, message: "数据库错误，请联系管理员" });
            } else {
                data.forEach(function (banner) {
                    imgArr.push(banner.imagepath);
                    urlArr.push(banner.url);
                });
            }
            resolve({ "imgArr": imgArr, "urlArr": urlArr });
        });
    });
}

//获取默认最新的商品并展示
function getNewProduct() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM product p,productrule r WHERE p.id = r.productid AND r.isnew = 1 AND r.isdefault = 1";
        let productArr = [];
        db.mQuery(sql, [], (err, data) => {
            if (err) {
                console.log(err);
                response.send({ code: 500, message: "数据库错误，请联系管理员" });
            } else {
                data.forEach(function (product) {
                    productArr.push(product);
                });
            }
            resolve(productArr);
        });
    });
}

//商品详情页
mRoute.get("/productDetail.html", (request, response) => {
    let rid = request.query.rid;
    let sql = "SELECT * FROM product p,productrule r WHERE p.id = r.productid AND r.rid = ?";
    db.mQuery(sql, [rid], (err, data) => {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "服务器出错，请联系管理员" });
        } else {
            if (request.session.loginUser) {
                response.render("productDetail", { user: request.session.loginUser, headImage: JSON.parse(request.session.info).headimage, productinfo: data[0] });
            } else {
                response.render("productDetail", { user: '', headImage: '', productinfo: data[0] });
            }
        }

    });
});

//购物车详情
mRoute.get("/cart.html", (request, response) => {
    if (request.session.loginUser) {
        let userid = JSON.parse(request.session.info).id;
        let sql = "SELECT *,s.id sid FROM Product p,productrule r,ShopCart s WHERE p.id = r.productid AND r.rid = s.ruleid AND s.userid = ?";
        db.mQuery(sql, [userid], (err, data) => {
            if (err) {
                console.log(err);
                response.send({ code: 500, message: "服务器出错，请联系管理员" });
            } else {
                response.render("cart", { user: request.session.loginUser, headImage: JSON.parse(request.session.info).headimage, cartshoparr: data });
            }
        });
    } else {
        response.render("cart", { user: '', headImage: '', cartshoparr: [] });
    }
});

//订单详情
mRoute.get("/order.html", (request, response) => {
    if (request.session.loginUser) {
        let userid = JSON.parse(request.session.info).id;
        let sql = "SELECT * FROM Product p,productrule r,Orders o,OrderDetail d WHERE p.id = r.productid AND o.id = d.orderid AND d.ruleid = r.rid AND o.userid = ?";
        db.mQuery(sql, [userid], (err, data) => {
            if (err) {
                console.log(err);
                response.send({ code: 500, message: "服务器出错，请联系管理员" });
            } else {
                response.render("order", { user: request.session.loginUser, headImage: JSON.parse(request.session.info).headimage, ordersArr: data });
            }
        });
    } else {
        response.render("order", { user: '', headImage: '', ordersArr: [] });
    }
});

//支付页面
mRoute.get("/pay.html", (request, response) => {
    if (request.session.loginUser) {
        response.render("pay", { user: request.session.loginUser, headImage: JSON.parse(request.session.info).headimage });
    } else {
        response.render("pay", { user: '', headImage: '' });
    }
});

//测试ejs对母版的引用
mRoute.get("/studentinfo.html", (request, response) => {
    let sql = "select * from USER";
    db.mQuery(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.render("studentinfo", { stuArr: data });
        }
    });
});

module.exports = mRoute;