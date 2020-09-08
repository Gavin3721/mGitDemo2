const mexpress = require("express");
const msqlutil = require("./msqlutil");
const mrouter = mexpress.Router();

//登录操作
mrouter.post("/loginOpr", function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let sql = "select count(*) as count from mStudentInfo where username = ? and pwd = ?";
    msqlutil.mquery(sql, [username, password], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, result: data });
        }
    });
});

//显示学生信息列表
mrouter.get("/studentList", function (request, response) {
    let sql1 = "select count(*) as count from student_info where 1=1 ";
    let showStuNum = parseInt(request.query.showStuNum.trim());
    let pageNum = parseInt(request.query.currentPageNum.trim());
    let stuNmStr = request.query.stuNmStr.trim();
    let stuSexStr = request.query.stuSexStr.trim();
    let param = [];
    if (stuNmStr != null && stuNmStr != '') {
        sql1 += " and s_name like ?";
        param.push("%" + stuNmStr + "%");
    }
    if (stuSexStr != null && stuSexStr != '') {
        sql1 += " and s_sex = ?";
        param.push(stuSexStr);
    }
    msqlutil.mquery(sql1, param, function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            let count = Number(data[0].count);
            //总页数
            let pageCount = Math.ceil(count / showStuNum);
            //确保删除了最后一页的最后一条数据，页面显示到最后一页
            if (pageNum > pageCount) {
                pageNum = pageCount;
            }
            if (pageNum == 0) {
                pageNum = 1;
            }
            //起始索引值 
            let beginIndex = (pageNum - 1) * showStuNum;
            //取出当页实际需要显示的数据
            let sql2 = "select * from student_info where 1=1 ";
            let param2 = [];
            if (stuNmStr != null && stuNmStr != '') {
                sql2 += " and s_name like ?";
                param2.push("%" + stuNmStr + "%");
            }
            if (stuSexStr != null && stuSexStr != '') {
                sql2 += " and s_sex = ?";
                param2.push(stuSexStr);
            }
            sql2 += " limit ?,?";
            param2.push(beginIndex, showStuNum);
            msqlutil.mquery(sql2, param2, function (err2, data2) {
                if (err2) {
                    console.log(err);
                    response.send({ code: 500, message: "数据库错误，请联系管理员" });
                } else {
                    var resultStr = {
                        pageCount: pageCount,
                        data: data2
                    };
                    response.send({ code: 200, result: resultStr });
                }
            });
        }
    });
});

//删除学生信息
mrouter.get("/delStudent", function (request, response) {
    let stuId = request.query.stuId.trim();
    let sql = "delete from student_info where id = ?";
    msqlutil.mquery(sql, [stuId], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, result: data });
        }
    });
});

//新增学生信息
mrouter.post("/addStudent", function (request, response) {
    let sid = request.body.sid.trim();
    let sname = request.body.sname.trim();
    let sage = request.body.sage.trim();
    let ssex = request.body.ssex.trim();
    let sql = "insert into student_info(s_name,s_age,s_sex,s_id) values(?,?,?,?)";
    msqlutil.mquery(sql, [sname, sage, ssex, sid], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, result: data });
        }
    });
});

//修改学生信息
mrouter.post("/updStudent", function (request, response) {
    let keyId = request.body.keyId.trim();
    let sid = request.body.sid.trim();
    let sname = request.body.sname.trim();
    let sage = request.body.sage.trim();
    let ssex = request.body.ssex.trim();
    let sql = "update student_info set s_name = ?,s_age = ?,s_sex = ?,s_id = ? where id = ?";
    msqlutil.mquery(sql, [sname, sage, ssex, sid, keyId], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, result: data });
        }
    });
});


module.exports = mrouter;