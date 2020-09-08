$(document).ready(function () {
    setInterval("showTime()", 1000);
    initUserData();

    $("#signOutSys").click(signOutSysOperate);
});

//初始化并显示数据
function initUserData() {
    var currentUser = localStorage.getItem("currentUser");
    var loginDate = localStorage.getItem("loginDate");
    if (loginDate != "") {
        var currentDate = new Date().getTime();
        var time = currentDate - loginDate;
        //登录过期时间为30分钟
        if (time > 30 * 60 * 1000) {
            //登录状态已过期
            localStorage.removeItem("loginState");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("loginDate");
            window.location.href = "login.html";
        } else {
            //正常登录状态
            currentUser = JSON.parse(currentUser);
            $("#userName").html(currentUser.userNm);
            var img = currentUser.picture;
            if (!img) {
                if (currentUser.userSex == "男") {
                    img = "man.jpg";
                } else {
                    img = "woman.jpg";
                }
                $("#userImg").attr("src", "img/user/" + img);
            } else {
                if (img.length > 100) {
                    $("#userImg").attr("src", img);
                } else {
                    $("#userImg").attr("src", "img/user/" + img);
                }
            }
            initLocalStorageData();
            showLeftMenuByQuanXian(currentUser.userId);
        }
    } else {
        window.location.href = "login.html";
    }
}

//退出系统，跳转到登录页
function signOutSysOperate() {
    fyAlert.alert({
        title: "提 示",
        drag: true,
        shadowClose: false,  //是否点击遮罩关闭
        content: '是否确认退出系统？',
        btns: {
            '确 定': function (obj) {
                localStorage.removeItem("loginState");
                localStorage.removeItem("currentUser");
                localStorage.removeItem("loginDate");
                window.location.href = "login.html";
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();//销毁
            }
        },
    });
}

function showTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    //var xingQi = date.getDay();
    var hour = date.getHours();
    var min2 = date.getMinutes();
    var sec = date.getSeconds();
    $("#showTime").html(year + "-" + month + "-" + day + "  星期" + ("天一二三四五六".charAt(date.getDay())) + "  " + hour + ":" + min2 + ":" + sec);
}

//登录成功后查询用户权限并显示左边菜单栏
function showLeftMenuByQuanXian(userId) {
    var tempRangeArr = [];//存放该用户可查看的模块编号
    for (var i = 0; i < userInfoArr.length; i++) {
        if (userInfoArr[i].userId == userId) {
            var quanXianArr = userInfoArr[i].quanxian;//该用户配置的角色数组
            for (var j = 0; j < quanXianArr.length; j++) {
                for (var k = 0; k < roleInfoArr.length; k++) {
                    if (quanXianArr[j] == roleInfoArr[k].roleId) {
                        tempRangeArr = tempRangeArr.concat(tempRangeArr, roleInfoArr[k].range);
                    }
                }
            }
            break;
        }
    }

    //去除重复编号
    for (var l = 0; l < tempRangeArr.length; l++) {
        for (var m = l + 1; m < tempRangeArr.length; m++) {
            if (tempRangeArr[l] == tempRangeArr[m]) {
                tempRangeArr.splice(m, 1);
                m--;
            }
        }
    }
    tempRangeArr.sort();
    var pageUrlArr = [];//根据角色编号查询可操作的模块信息
    for (var n = 0; n < tempRangeArr.length; n++) {
        if (tempRangeArr[n].indexOf('_') != -1) {
            for (var q = 0; q < yeWuMoKuaiArr.length; q++) {
                for (var w = 0; w < yeWuMoKuaiArr[q].itemArr.length; w++) {
                    var str = "";
                    if (userId != "000111") {//过滤掉最大的管理员
                        if (yeWuMoKuaiArr[q].itemArr[w].itemId == tempRangeArr[n] && yeWuMoKuaiArr[q].itemArr[w].isUse == "1" && yeWuMoKuaiArr[q].isUse == "1") {
                            str = yeWuMoKuaiArr[q].modelNm + "|" + yeWuMoKuaiArr[q].itemArr[w].itemNm + "|" + yeWuMoKuaiArr[q].itemArr[w].url;
                            pageUrlArr.push(str);
                        }
                    } else {
                        if (yeWuMoKuaiArr[q].itemArr[w].itemId == tempRangeArr[n]) {
                            str = yeWuMoKuaiArr[q].modelNm + "|" + yeWuMoKuaiArr[q].itemArr[w].itemNm + "|" + yeWuMoKuaiArr[q].itemArr[w].url;
                            pageUrlArr.push(str);
                        }
                    }
                }
            }
        }
    }
    $("#mLeftMenu").empty();
    var leftMenuStr = "<li><a href='shouYe.html' target='content'><i class='glyphicon glyphicon-home'></i>&nbsp;&nbsp;我的首页</a></li>";
    var prevModelNm = "";
    for (var r = 0; r < pageUrlArr.length; r++) {
        var mArr = pageUrlArr[r].split("|");
        if (mArr[0] != prevModelNm) {
            leftMenuStr = leftMenuStr + "<li class='nav-header hidden-md'><i class='glyphicon glyphicon-edit'></i>&nbsp;&nbsp;" + mArr[0] + "</li>";
            prevModelNm = mArr[0];
        }
        leftMenuStr = leftMenuStr + "<li><a href='" + mArr[2] + "' target='content'><i class='glyphicon glyphicon-list-alt' ></i >&nbsp;&nbsp; " + mArr[1] + "</a ></li > ";
    }
    $("#mLeftMenu").html(leftMenuStr);
}


