var currentIsLogin = false;//当前是否是登录状态
var currentUser = "";//当前登录用户
var currentPageIndex = 1;//当前显示的页数
var pageCountNum = 1;//默认总页数
var queryStr = "";//查询条件

window.onload = function () {
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var topBar = document.getElementById("topBar");
        if (scrollTop > 100) {
            topBar.style.position = "fixed";
            topBar.style.top = 0;
        } else topBar.style.position = "static";
    }

    if (currentIsLogin) {
        showLunTanInfo(queryStr, currentPageIndex);
    }

    //打开登录框
    document.getElementById("loginBtn").onclick = function () { document.getElementById("loginDiv").style.display = "block"; }

    //关闭登录框
    document.getElementById("closeLogin").onclick = function () { document.getElementById("loginDiv").style.display = "none"; }

    //登录的表单提交
    document.getElementById("loginForm").onsubmit = function () {
        var username = document.getElementById("username").value.trim(), password = document.getElementById("password").value.trim();
        var loginTips = document.getElementById("loginTips");
        if (username == '' || password == '') {
            loginTips.style.color = "red";
            loginTips.innerText = "账户和密码不能为空";
            return false;
        }

        var phoneZz = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        var emailZz = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!phoneZz.test(username) && !emailZz.test(username)) {
            loginTips.style.color = "red";
            loginTips.innerText = "账户输入不规范，必须是手机号或邮箱";
            return false;
        }

        var result = loginOperate(username, password);
        if (result == 0) {
            loginTips.style.color = "red";
            loginTips.innerText = "账户不存在，请检查后重新输入";
        } else if (result == 1) {
            loginTips.style.color = "red";
            loginTips.innerText = "账户或密码错误";
        } else {
            loginTips.style.color = "green";
            loginTips.innerText = "登录成功";
            currentIsLogin = true;
            currentUser = result;
            showLunTanInfo(queryStr, currentPageIndex);
            document.getElementById("login_register").style.display = "none";
            document.getElementById("signout_change").style.display = "inline-block";
            document.getElementById("loginDiv").style.display = "none";
            document.getElementById("touxiang").setAttribute("src", "img/" + result.img);
            document.getElementById("nicheng").innerText = result.username;
            document.getElementById("xingbie_nianling").innerText = result.sex + "_" + result.age + "岁";
            document.getElementById("xingzuo").innerText = result.xingzuo;
            document.getElementById("qianming").innerText = "签名：" + result.sign;
            document.getElementById("aihao").innerText = "爱好：" + result.hobby;
            document.getElementById("dengji").innerText = "等级：XXXX";
        }
    }

    //退出系统
    document.getElementById("signOutBtn").onclick = function () {
        var result = confirm("是否确认退出系统？");
        if (result) {
            currentIsLogin = false;
            currentUser = "";
            currentPageIndex = 1;
            var forumShow = document.getElementById("forumShow");
            var noInfo = document.getElementById("noInfo");
            forumShow.innerHTML = "";
            noInfo.style.display = "block";
            //后续清空操作
            var inputArr = document.getElementsByTagName("input");
            for (var i = 0; i < inputArr.length; i++) {
                if (inputArr[i].type == "text" || inputArr[i].type == "password") {
                    inputArr[i].value = "";
                }
            }
            queryStr = "";
            document.getElementById("loginTips").innerText = "";
            document.getElementById("login_register").style.display = "inline-block";
            document.getElementById("signout_change").style.display = "none";
            document.getElementById("touxiang").setAttribute("src", "img/25.png");
            document.getElementById("nicheng").innerText = "请先登录~";
            document.getElementById("currentPageIndex").innerText = "0";
            document.getElementById("pageCount").innerText = "0";
            var userInfoArr = document.getElementsByClassName("userInfoli");
            for (var j = 0; j < userInfoArr.length; j++) {
                userInfoArr[j].innerText = "";
            }
        }
    }

    //上一页
    document.getElementById("prevPage").onclick = function () {
        if (!currentIsLogin) {
            document.getElementById("loginDiv").style.display = "block";
            return false;
        }
        if (currentPageIndex > 1) {
            showLunTanInfo(queryStr, currentPageIndex - 1);
        }
    }

    //下一页
    document.getElementById("nextPage").onclick = function () {
        if (!currentIsLogin) {
            document.getElementById("loginDiv").style.display = "block";
            return false;
        }
        if (currentPageIndex < pageCountNum) {
            showLunTanInfo(queryStr, currentPageIndex + 1);
        }
    }

    //首页
    document.getElementById("firstPage").onclick = function () {
        if (!currentIsLogin) {
            document.getElementById("loginDiv").style.display = "block";
            return false;
        }
        showLunTanInfo(queryStr, 1);
    }

    //末页
    document.getElementById("lastPage").onclick = function () {
        if (!currentIsLogin) {
            document.getElementById("loginDiv").style.display = "block";
            return false;
        }
        showLunTanInfo(queryStr, pageCountNum);
    }

    //搜索
    document.getElementById("searchBtn").onclick = function () {
        if (!currentIsLogin) {
            document.getElementById("loginDiv").style.display = "block";
            return false;
        }
        queryStr = document.getElementById("searchInfo").value.trim();
        showLunTanInfo(queryStr, 1);
    }

    //发帖
    document.getElementById("sendTieZi").onclick = function () {
        if (!currentIsLogin) {
            document.getElementById("loginDiv").style.display = "block";
            return false;
        }
        //var imgs = document.getElementById("addImgs");
        //console.log(imgs.files);
        var tieZi = document.getElementById("faTieArea").value.trim();
        if (tieZi == "") {
            alert("帖子内容不能为空！");
            return false;
        }
        faTieOperate(tieZi, []);
        document.getElementById("faTieArea").value = "";
        showLunTanInfo(queryStr, 1);
    }

    //添加发帖子图片
    /* document.getElementById("addImgs").onchange = function () {
        var arr = this.files;
        console.log(arr);
        var tianJiaPic = document.getElementById("tianJiaPic");
        for (var i = 0; i < arr.length; i++) {
            var newNode = document.createElement("li");
            var text = document.createTextNode(arr[i].name);
            newNode.appendChild(text);
            tianJiaPic.appendChild(newNode);
        }
    } */

};

//登陆操作，成功则返回个人信息，失败返回0：用户名不存在，1：密码错误
function loginOperate(username, password) {
    var result = "0";
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userid == username) {
            if (userArr[i].password == password) {
                result = userArr[i];
            } else {
                result = 1;
            }
            break;
        }
    }
    return result;
}

//个人你就用户ID取得相应的个人信息
function getUserInfoById(userId) {
    var result = "";
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userid == userId) {
            result = userArr[i];
            break;
        }
    }
    return result;
}

//展示相应的论坛消息(每页显示5条信息)
function showLunTanInfo(detailStr, currPageNum) {
    var tempTzArr = [];
    //如果条件不为空，则先找出符合要求的数据
    if (detailStr != '') {
        for (var i = 0; i < tieZiArr.length; i++) {
            var tieZi = tieZiArr[i];
            if (tieZi.details.indexOf(detailStr) != -1) {
                tempTzArr.push(tieZi);
            }
        }
    } else {
        tempTzArr = tieZiArr;
    }
    pageCountNum = Math.ceil(tempTzArr.length / 5);//总页数
    if (currPageNum > pageCountNum) {
        currPageNum = pageCountNum;
    }
    currentPageIndex = currPageNum;//默认显示的页数

    var beginIndex = (currentPageIndex - 1) * 5;
    var resultArr = tempTzArr.slice(beginIndex, beginIndex + 5);
    //下边开始展示论坛消息
    document.getElementById("currentPageIndex").innerText = currentPageIndex;
    document.getElementById("pageCount").innerText = pageCountNum;
    var forumShow = document.getElementById("forumShow");
    var noInfo = document.getElementById("noInfo");
    forumShow.innerHTML = "";
    noInfo.style.display = "none";
    if (resultArr.length == 0) {
        noInfo.style.display = "block";
    } else {
        for (var j = 0; j < resultArr.length; j++) {
            var result = resultArr[j];
            var userInfo = getUserInfoById(result.userid);
            var img = "";
            if (userInfo.img.indexOf("\\") == -1) {
                img = "img/" + userInfo.img;
            } else {
                img = userInfo.img;//带有本地路径的图片
            }
            //发帖人的信息
            var personDiv = "<div class='personInfo'><img src='" + img + "' /><br /><br /><p>" + userInfo.username + "-" + userInfo.sex + "</p><p>签名：" + userInfo.sign + "</p></div> ";
            var imgsStr = "";
            for (var k = 0; k < result.imgArr.length; k++) {
                var imgPath = "";
                if (result.imgArr[k].indexOf("\\") == -1) {
                    imgPath = "img/" + result.imgArr[k];
                } else
                    imgPath = result.imgArr[k];//带有本地路径的图片
                if (result.imgArr.length < 3) {
                    imgsStr += "<img class='pic2' src='" + imgPath + "' />";
                } else
                    imgsStr += "<img class='pic1' src='" + imgPath + "' />";
            }
            //帖子内容详情
            var detailsP = "<p class='details'>" + result.details + "<br /><br />" + imgsStr + "</p>";
            //点赞或取消该操作
            var dianZanOpeStr = "<div><span><img src='img/bg1.jpg' />&nbsp;" + result.time + "</span><span id='dz_" + result.id + "' class='dianZanOpe' onclick=\"tieZiDianZan('" + result.id + "','" + currentUser.userid + "')\"><img src='img/bg2.jpg' />&nbsp;赞</span>";
            var isDz = false;
            for (var m = 0; m < result.dianZanArr.length; m++) {
                if (result.dianZanArr[m] == currentUser.userid) {
                    isDz = true;
                    dianZanOpeStr = "<div><span><img src='img/bg1.jpg' />&nbsp;" + result.time + "</span><span id='dz_" + result.id + "' class='dianZanOpe' onclick=\"tieZiDianZan('" + result.id + "','" + currentUser.userid + "')\"><img src='img/bg3.jpg' />&nbsp;取消赞</span>";
                    break;
                }
            }
            //本人删除自己的帖子
            if (result.userid == currentUser.userid) {
                dianZanOpeStr += "<span class='delTieZi'><button onclick='deleteTieZi(" + result.id + ")'>删&nbsp;除</button></span></div>";
            } else {
                dianZanOpeStr += "</div>";
            }
            //点赞数量提示
            var dianZanTips = "";
            if (result.userid == currentUser.userid && isDz) {
                dianZanTips = "<p id='tips_" + result.id + "' class='dianZanTips'><img src='img/praise.png' />我和" + (result.dianZanArr.length - 1) + "个人觉得很赞</p><br />";
            } else {
                dianZanTips = "<p id='tips_" + result.id + "' class='dianZanTips'><img src='img/praise.png' />" + result.dianZanArr.length + "个人觉得很赞</p><br />";
            }

            //显示相关人员的评论消息
            var pingLunUl = pingLunShow(result);
            //发评论消息
            var pingLunSend = "<textarea id='plstr_" + result.id + "' class='pingLunInfo' placeholder='评论...' maxlength='140'></textarea><div><span>0/140</span><button id='pl_" + result.id + "' class='pingLunHf1'>回&nbsp;复</button></div>";
            var liStr = "<li>" + personDiv + "<div class='forumInfo'>" + detailsP + dianZanOpeStr + dianZanTips + pingLunUl + pingLunSend + "</div></li>";
            forumShow.innerHTML += liStr;
        }
    }
    addPingLunEvent();
}

//删帖
function deleteTieZi(tieZiId) {
    var result = confirm("是否确认删除该条帖子？");
    if (result) {
        for (var i = 0; i < tieZiArr.length; i++) {
            if (tieZiArr[i].id == tieZiId) {
                tieZiArr.splice(i, 1);
                break;
            }
        }
    }
    showLunTanInfo(queryStr, currentPageIndex);
    return true;
}

//获取当前时间
function getMTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;//0-11
    var day = date.getDate();//1-31
    var hour = date.getHours();

    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

//发帖操作
function faTieOperate(str, imgsArr) {
    var newId = tieZiArr[tieZiArr.length - 1].id + 1;
    var obj = {
        "id": newId,
        "userid": currentUser.userid,
        "details": str,
        "time": getMTime(),
        "imgArr": imgsArr,
        "dianZanArr": [],
        "pingLunArr": []
    };
    tieZiArr.unshift(obj);
    return true;
}

//帖子点赞
function tieZiDianZan(tieZiId, currentId) {
    $("#dz_" + tieZiId).html("<img src='img/bg3.jpg' />&nbsp;取消赞");
    for (var i = 0; i < tieZiArr.length; i++) {
        if (tieZiArr[i].id == tieZiId) {
            var isDz = false;//该用户之前是否点过赞
            for (var j = 0; j < tieZiArr[i].dianZanArr.length; j++) {
                if (tieZiArr[i].dianZanArr[j] == currentId) {
                    isDz = true;
                    tieZiArr[i].dianZanArr.splice(j, 1);
                    $("#dz_" + tieZiId).html("<img src='img/bg2.jpg' />&nbsp;赞");
                    $("#tips_" + tieZiId).html("<img src='img/praise.png' />" + tieZiArr[i].dianZanArr.length + "个人觉得很赞");
                    break;
                }
            }
            if (!isDz) {
                tieZiArr[i].dianZanArr.push(currentId);
                if (tieZiArr[i].dianZanArr.length == 1) {
                    $("#tips_" + tieZiId).html("<img src='img/praise.png' />我个人觉得很赞");
                } else {
                    $("#tips_" + tieZiId).html("<img src='img/praise.png' />" + tieZiArr[i].dianZanArr.length + "个人觉得很赞");
                }
            }
            break;
        }
    }
}

//添加评论有关的事件，在页面登录并加载显示完成后才可绑定
function addPingLunEvent() {
    //评论的文本域
    $(".pingLunInfo").focus(function () {
        $(this).css({ "height": "60px" });
        $(this).keyup(function () {
            var str = $(this).val();
            if (str.length != 0) {
                $(this).next().find("span").text(str.length + "/140");
                $(this).next().find("button").removeClass("pingLunHf1");
                $(this).next().find("button").addClass("pingLunHf2");
            } else {
                $(this).next().find("span").text("0/140");
                $(this).next().find("button").removeClass("pingLunHf2");
                $(this).next().find("button").addClass("pingLunHf1");
            }
        });
    });

    $(".pingLunInfo").blur(function () {
        $(this).css({ "height": "20px" });
    });

    //回复评论消息
    $("[id^='pl_']").click(function () {
        var str = $(this).parent().prev().val();
        if (str != "") {
            var id = $(this).attr("id").split("_")[1];
            for (var i = 0; i < tieZiArr.length; i++) {
                if (tieZiArr[i].id == id) {
                    var pingLunId = "100000";
                    if (tieZiArr[i].pingLunArr.length != 0) {
                        pingLunId = Number(tieZiArr[i].pingLunArr[0].pingLunId) + 1;
                    }
                    var obj = {
                        "pingLunId": pingLunId,
                        "visitUserId": currentUser.userid,
                        "plDetails": str,
                        "plTime": getMTime(),
                        "plDzArr": []
                    };
                    tieZiArr[i].pingLunArr.unshift(obj);
                    $(this).prev().text("0/140");
                    $(this).parent().prev().val("");
                    $(this).parent().prev().css("height", "20px");
                    $(this).removeClass("pingLunHf2");
                    $(this).addClass("pingLunHf1");
                    var pingLunUl = pingLunShow(tieZiArr[i]);
                    $(this).parent().prev().prev().replaceWith(pingLunUl);
                    addPingLunEvent();
                    break;
                }
            }
        }
    });

    //删除自己的评论消息
    $("[id^=pldel_]").click(function () {
        var result = confirm("是否确认删除该条评论消息？");
        if (result) {
            var tzId = $(this).attr("id").split("_")[1];
            var plId = $(this).attr("id").split("_")[2];
            for (var i = 0; i < tieZiArr.length; i++) {
                if (tieZiArr[i].id == tzId) {
                    for (var j = 0; j < tieZiArr[i].pingLunArr.length; j++) {
                        if (tieZiArr[i].pingLunArr[j].pingLunId == plId) {
                            tieZiArr[i].pingLunArr.splice(j, 1);
                            break;
                        }
                    }
                    var pingLunUl = pingLunShow(tieZiArr[i]);
                    $(this).parent().parent().parent().parent().replaceWith(pingLunUl);
                    break;
                }
            }
        }
    });
}

//生成评论的展示
function pingLunShow(tieZiInfo) {
    var pingLunUl = "<ul class='pingLunUl'>";
    var pingLunArr = tieZiInfo.pingLunArr;
    for (var n = 0; n < pingLunArr.length; n++) {
        var plInfo = pingLunArr[n];
        var visitUserInfo = getUserInfoById(plInfo.visitUserId);
        var plUserNm = "我";
        var delStr = "";
        if (plInfo.visitUserId == currentUser.userid) {
            delStr = "<span id='pldel_" + tieZiInfo.id + "_" + plInfo.pingLunId + "' class='pingLunDelete'>删&nbsp;除</span>";
        } else {
            plUserNm = visitUserInfo.username;
        }
        var str = "<li><div><img src='img/" + visitUserInfo.img + "'></div><div><p><span class='pingLunUser'>" + plUserNm + "：</span>" + plInfo.plDetails + "</p><p><span class='pinglunTime'>" + plInfo.plTime + "</span>" + delStr + "</p></div></li>";
        pingLunUl += str;
    }
    pingLunUl += "</ul>";
    return pingLunUl;
}