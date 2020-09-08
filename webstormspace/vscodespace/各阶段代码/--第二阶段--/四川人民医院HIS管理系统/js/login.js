
$(document).ready(function () {
    initLocalStorageData();//初始化本地数据

    $("#login").submit(function () {
        var u = $("#username").val().trim();
        var p = $("#password").val().trim();
        if (u == "" || p == "") {
            $(".login-alert").fadeIn();
            $("#tips").text("登录名和密码不能为空");
            return false;
        }
        var isAccount = false;
        for (var i = 0; i < userInfoArr.length; i++) {
            if (userInfoArr[i].account == u) {
                isAccount = true;
                if (userInfoArr[i].workState != "1") {
                    $(".login-alert").fadeIn();
                    $("#tips").text("该用户不是内部员工，禁止访问");
                    return false;
                } else {
                    if (userInfoArr[i].password == p) {
                        //登录成功
                        localStorage.setItem("loginState", true);
                        localStorage.setItem("currentUser", JSON.stringify(getUserInfoByAccount(u)));
                        localStorage.setItem("loginDate", new Date().getTime());//登录时间，用于过期验证
                    } else {
                        $(".login-alert").fadeIn();
                        $("#tips").text("用户名或密码错误");
                        return false;
                    }
                }
                break;
            }
        }
        if (!isAccount) {
            $(".login-alert").fadeIn();
            $("#tips").text("该用户不存在");
            return false;
        }
    });
});

/**
 * 根据登录账户获取用户信息
 * @param {} account 
 */
function getUserInfoByAccount(account) {
    var result = "";
    for (var i = 0; i < userInfoArr.length; i++) {
        if (userInfoArr[i].account == account) {
            var deptIdArr = userInfoArr[i].deptIds;
            result = $.extend({}, userInfoArr[i]);//扩展jQuery对象本身,用来在jQuery命名空间上增加新函数
            var deptArr = [];
            for (var j = 0; j < deptIdArr.length; j++) {
                var dept = getDeptInfoById(deptIdArr[j]);
                deptArr.push(dept);
            }
            result.deptInfo = deptArr;
            delete result["password"];//一定要删除密码
            break;
        }
    }
    return result;
}

/**
 * 根据部门id获取部门信息
 * @param {} deptId 
 */
function getDeptInfoById(deptId) {
    var result = "";
    for (var i = 0; i < deptInfoArr.length; i++) {
        if (deptInfoArr[i].deptId == deptId) {
            result = deptInfoArr[i];
            break;
        }
    }
    return result;
}

