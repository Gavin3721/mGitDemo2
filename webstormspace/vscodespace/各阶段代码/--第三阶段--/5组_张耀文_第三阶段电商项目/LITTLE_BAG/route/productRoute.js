const mroute = require("express").Router();
const db = require("./sqlHelper");

//添加购物车
mroute.post("/shopcart", (request, response) => {
    let rid = request.body.rid;
    if (request.session.loginUser) {
        let sql = "SELECT * FROM ShopCart WHERE ruleid = ?";
        db.mQuery(sql, [rid], (err, data) => {
            if (err) {
                console.log(err);
                response.send({ code: 500, message: "数据库出错，请联系管理员" });
            } else {
                let sql2 = "";
                let userId = JSON.parse(request.session.info).id;
                if (data.length == 0) {
                    sql2 = "INSERT INTO ShopCart(userid,ruleid) VALUES(?,?)";
                } else {
                    sql2 = "UPDATE ShopCart SET num = num + 1 WHERE userid = ? AND ruleid = ?";
                }
                db.mQuery(sql2, [userId, rid], (err1, data1) => {
                    if (err1) {
                        console.log(err);
                        response.send({ code: 500, message: "数据库出错，请联系管理员" });
                    } else {
                        response.send({ code: 200, data: data1 });
                    }
                });
            }
        });

    } else {
        response.send({ code: 201, message: "请先登录" });
    }
});

//生成订单
mroute.post("/buildOrder", (request, response) => {
    if (request.session.loginUser) {
        let userId = JSON.parse(request.session.info).id;
        let sidStr = request.body.sidStr;
        let total = request.body.total;
        //1. 插入订单表
        let sql1 = "INSERT INTO Orders (userid,total) VALUES(?,?)";
        db.mQuery(sql1, [userId, parseFloat(total)], (err, data1) => {
            if (err) {
                console.log(err);
                response.send({ code: 500, message: "数据库错误，请联系管理员" });
            } else {
                if (data1.affectedRows > 0) {
                    let orderId = data1.insertId;
                    ////2. 插入订单详情
                    let sql2 = `INSERT INTO orderdetail(orderId, ruleId, num, price) SELECT ?, s.RuleId, s.num, r.price FROM shopcart s JOIN productrule r ON s.RuleId = r.rid WHERE s.id IN (${sidStr})`;
                    db.mQuery(sql2, [orderId], (err, data2) => {
                        if (err) {
                            console.log(err);
                            response.send({ code: 500, message: "数据库错误，请联系管理员" });
                        } else {
                            if (data2.affectedRows > 0) {
                                //3. 删除购物车
                                let sql3 = `delete from shopcart where id in (${sidStr})`;
                                db.mQuery(sql3, [], (err, data3) => {
                                    if (err) {
                                        console.log(err);
                                        response.send({ code: 500, message: "数据库错误，请联系管理员" });
                                    } else {
                                        response.send({ code: 200 });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    } else {
        response.send({ code: 201, message: "请先登录" });
    }
});

module.exports = mroute;