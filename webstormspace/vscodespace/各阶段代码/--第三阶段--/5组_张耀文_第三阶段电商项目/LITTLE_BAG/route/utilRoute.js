const mRoute = require("express").Router();
const nodeMailer = require("nodemailer");

mRoute.post("/sendEmail", (request, response) => {
    //1、获取邮件相关信息
    let shou = request.body.txtName;
    let content = request.body.txtContent;
    //2、配置发件人的相关信息
    let transport = nodeMailer.createTransport({
        service: "qq",//服务商
        auth: {
            user: "2251752521",//账号
            pass: "hjpqwupnzrtjeaib" //密码，qq邮件指授权码
        }
    });
    //3、设置邮件内容
    let message = {
        from: "gavin <2251752521@qq.com>",
        to: shou,
        subject: "gavin send mailer test",//邮件的主题
        text: "随便写点11233qqq",
        html: "<h3>你好，XX</h3><p>" + content + "</p>"
    };
    //4、发送邮件
    transport.sendMail(message, (err, data) => {
        if (err) {
            console.log(err);
            response.send("邮件发送失败");
        } else {
            console.log(JSON.stringify(data));
            response.send("邮件发送成功");
        }
    });
});

module.exports = mRoute;