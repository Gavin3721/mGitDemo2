/**
 * Created by SYT on 2016-07-31.
 */
var Box = document.getElementById("Box");
var loginBox = document.getElementById("loginBox");
var zhuceBox = document.getElementById("zhuceBox");
function login() {
    Box.style.visibility = "visible";
    loginBox.style.visibility = "visible"
    console.log("456")
}

function switchLogin() {
    Box.style.visibility = "visible";
    zhuceBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible"
}

function switchZhuce() {
    Box.style.visibility = "visible";
    loginBox.style.visibility = "hidden";
    zhuceBox.style.visibility = "visible"
}

function zhuce() {
    Box.style.visibility = "visible";
    zhuceBox.style.visibility = "visible"
}

function close1() {
    console.log("123")
    Box.style.visibility = "hidden";
    loginBox.style.visibility = "hidden";
    zhuceBox.style.visibility = "hidden"
}

var layer = layui.layer;

$(document).ready(function () {
    loginBtnEvent();//登录按钮事件
    zhuceBtnEvent();//注册按钮事件
});

function loginBtnEvent() {
    $("#loginBtn").click(function () {
        var loginUser = $("#loginUser").val().trim();
        var loginPwd = $("#loginPwd").val().trim();
        if (loginUser == '' || loginPwd == '') {
            layer.msg('用户名及密码不能为空');
        } else {
            //出现loading层
            var index = layer.load(1, { shade: [0.1, '#000'] });
            $.ajax({
                async: false,
                cache: false,
                url: '/userLogin',
                type: 'POST',
                data: {
                    'loginUser': loginUser,
                    'loginPwd': loginPwd
                },
                dataType: 'json',
                success: function (data) {
                    layer.close(index);
                    var result = data.result;
                    if (result.length == 0) {
                        layer.msg('用户名或密码错误，登录失败');
                    } else {
                        layer.msg('登录成功');
                        location.reload();//刷新主页面
                        close1();
                    }
                },
                error: function (data) {
                }
            });
        }
    });
}

function zhuceBtnEvent() {
    $("#zhuceBtn").click(function () {
        var obj = { 'Email': '邮箱', 'zhuceUser': '用户名', 'zhucePwd': '密码', 'resPwd': '确认密码' };
        var flag = true;
        for (var key in obj) {
            if ($("#" + key).val().trim() == '') {
                flag = false;
                layer.msg(obj[key] + "不能为空");
                break;
            }
        }
        if (flag) {
            //进行注册操作
            var index = layer.load(1, { shade: [0.1, '#000'] });
            $.ajax({
                async: false,
                cache: false,
                url: '/userReg',
                type: 'POST',
                data: $("#registerForm").serialize(),
                dataType: 'json',
                success: function (data) {
                    layer.close(index);
                    var result = data.result;
                    if (result.affectedRows == 0) {
                        layer.msg('注册失败');
                    } else {
                        layer.msg('注册成功');
                        close1();
                    }
                },
                error: function (data) {
                }
            });
        }
    });
}
