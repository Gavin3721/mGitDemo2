var currentPageIndex = 1;//当前显示的页数
var pageCountNum = 1;//默认总页数
var showNum = 8;//一页显示的数据量
var currentSelectDeptId = "";//当前选中部门id
var currentSelectUserId = "";//当前选中的部门人员

$(document).ready(function () {
    initLocalStorageData();//初始化本地数据

    $("#saveUserInfo").click(saveUser);
    $("#resetUserInfo").click(resetUser);
    $("#addStaffTab").click(addOrSortShow1);
    $("#sortStaffTab").click(addOrSortShow2);
    $("#topBtn").click(sortTopOperate);
    $("#bottomBtn").click(sortBottomOperate);
    $("#userPicture").click(selectUserImg);

    $("#entryDate").val(getMTime().split(' ')[0]);
    $("#deptIds").empty();
    $("#deptIds").html(showDeptSelect());
    $("#deptNmStr").empty();
    $("#deptNmStr").html(showDeptSelect());

    showUserInfoList(currentPageIndex);
    //首页
    document.getElementById("firstPage").onclick = function () { showUserInfoList(1) }

    //末页
    document.getElementById("lastPage").onclick = function () { showUserInfoList(pageCountNum) }

    //上一页
    document.getElementById("prevPage").onclick = function () {
        if (currentPageIndex > 1) {
            showUserInfoList(currentPageIndex - 1);
        }
    }

    //下一页
    document.getElementById("nextPage").onclick = function () {
        if (currentPageIndex < pageCountNum) {
            showUserInfoList(currentPageIndex + 1);
        }
    }

    //搜索
    document.getElementById("queryBtn").onclick = function () { showUserInfoList(1); }

    //跳转页
    document.getElementById("jumpBtn").onclick = function () {
        $("#tips").text("");
        jumpPage = document.getElementById("jumpPage").value.trim();
        if (Number(jumpPage) != parseInt(jumpPage)) {
            $("#tips").text("~您输入的页数不规范，必须为整数~");
            return false;
        }
        if (jumpPage > pageCountNum || jumpPage < 1) {
            $("#tips").text("~您输入的页数不规范，页数必须在总页数范围内~");
            return false;
        }
        showUserInfoList(jumpPage);
    }
});

//保存员工信息
function saveUser() {
    var result = checkUserInfo();
    if (!result) { return false; }
    var userNm = $("#userNm").val().trim();
    var userSex = $("#userSex").val().trim();
    var userAge = $("#userAge").val().trim();
    var cardNum = $("#cardNum").val().trim();
    var userPhone = $("#userPhone").val().trim();
    var email = $("#email").val().trim();
    var account = $("#account").val().trim();
    var password = $("#password").val().trim();
    var password2 = $("#password2").val().trim();
    if (password2 == '') { fyAlert.msg("请输入确认密码！", { icon: 2, animateType: 2 }); return false; }
    if (password != password2) { fyAlert.msg("两次密码输入不一致！", { icon: 2, animateType: 2 }); return false; }
    var bloodType = $("#bloodType").val().trim();
    var marriage = $("#marriage").val().trim();
    var education = $("#education").val().trim();
    var country = $("#country").val().trim();
    var nation = $("#nation").val().trim();
    var nativePlace = $("#nativePlace").val().trim();
    var address = $("#address").val().trim();
    var deptIds = $("#deptIds").val().trim();
    var zhiWei = $("#zhiWei").val().trim();
    var wages = $("#wages").val().trim();
    var entryDate = $("#entryDate").val().trim();
    var details = $("#details").val().trim();

    var picture = $("#userPicture").attr("src");
    if (picture == "../../img/user/default.jpg") {
        picture = '';
    }
    var userId = "111111", userGrade = "1";
    if (deptInfoArr.length > 1) {
        userId = (getMaxUserId() + 1) + "";
        userGrade = (getMinGrade() + 1) + "";
    }

    var obj = {
        "userId": userId,
        "account": account,
        "password": password,
        "picture": picture,
        "userNm": userNm,
        "userSex": userSex,
        "userAge": userAge,
        "cardNum": cardNum,
        "userPhone": userPhone,
        "email": email,
        "bloodType": bloodType,
        "marriage": marriage,
        "education": education,
        "country": country,
        "nation": nation,
        "nativePlace": nativePlace,
        "address": address,
        "deptIds": [deptIds],
        "zhiWei": zhiWei,
        "wages": wages,
        "userGrade": userGrade,
        "entryDate": entryDate,
        "quitDate": "",
        "workState": "1",//在职状态，1为在职，0为离职
        "details": details,
        "quanxian": []
    };
    userInfoArr.push(obj);
    localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
    fyAlert.msg("保存成功", { icon: 1, animateType: 1 });
    resetUser();
    showUserInfoList(1);
}

//验证各项信息
function checkUserInfo() {
    var userNm = $("#userNm").val().trim();
    if (userNm == '') { fyAlert.msg("员工姓名不能为空！", { icon: 2, animateType: 2 }); return false; }
    var userSex = $("#userSex").val().trim();
    if (userSex == '') { fyAlert.msg("请选择性别！", { icon: 2, animateType: 2 }); return false; }
    var userAge = $("#userAge").val().trim();
    if (userAge == '') { fyAlert.msg("年龄不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (Number(userAge) != parseInt(userAge)) { fyAlert.msg("年龄必须为整数！", { icon: 2, animateType: 2 }); return false; }
    if (parseInt(userAge) > 120 || parseInt(userAge) < 1) { fyAlert.msg("年龄输入不规范！", { icon: 2, animateType: 2 }); return false; }
    var cardNum = $("#cardNum").val().trim();
    var cardZz = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
    if (cardNum == '') { fyAlert.msg("身份证号不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (!cardZz.test(cardNum)) { fyAlert.msg("身份证号不规范！", { icon: 2, animateType: 2 }); return false; }
    var userPhone = $("#userPhone").val().trim();
    var phoneZz = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    if (userPhone == '') { fyAlert.msg("电话号码不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (!phoneZz.test(userPhone)) { fyAlert.msg("手机号码不规范！", { icon: 2, animateType: 2 }); return false; }
    var email = $("#email").val().trim();
    var emailZz = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') { fyAlert.msg("邮箱不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (!emailZz.test(email)) { fyAlert.msg("邮箱不规范！", { icon: 2, animateType: 2 }); return false; }
    var account = $("#account").val().trim();
    if (account == '') { fyAlert.msg("登录账户不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (isExistAccount(account)) { fyAlert.msg("该登录账户已存在", { icon: 2, animateType: 2 }); return false; }
    var password = $("#password").val().trim();
    if (password == '') { fyAlert.msg("密码不能为空！", { icon: 2, animateType: 2 }); return false; }
    var bloodType = $("#bloodType").val().trim();
    if (bloodType == '') { fyAlert.msg("请选择血型！", { icon: 2, animateType: 2 }); return false; }
    var marriage = $("#marriage").val().trim();
    if (marriage == '') { fyAlert.msg("请选择婚姻状况！", { icon: 2, animateType: 2 }); return false; }
    var education = $("#education").val().trim();
    if (education == '') { fyAlert.msg("请选择教育背景！", { icon: 2, animateType: 2 }); return false; }
    var country = $("#country").val().trim();
    if (country == '') { fyAlert.msg("国籍不能为空！", { icon: 2, animateType: 2 }); return false; }
    var nation = $("#nation").val().trim();
    if (nation == '') { fyAlert.msg("民族不能为空！", { icon: 2, animateType: 2 }); return false; }
    var nativePlace = $("#nativePlace").val().trim();
    if (nativePlace == '') { fyAlert.msg("籍贯不能为空！", { icon: 2, animateType: 2 }); return false; }
    var address = $("#address").val().trim();
    if (address == '') { fyAlert.msg("家庭住址不能为空！", { icon: 2, animateType: 2 }); return false; }
    var deptIds = $("#deptIds").val().trim();
    if (deptIds == '') { fyAlert.msg("请选择所属部门！", { icon: 2, animateType: 2 }); return false; }
    var zhiWei = $("#zhiWei").val().trim();
    if (zhiWei == '') { fyAlert.msg("职位不能为空！", { icon: 2, animateType: 2 }); return false; }
    var wages = $("#wages").val().trim();
    if (wages == '') { fyAlert.msg("工资不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (isNaN(wages)) { fyAlert.msg("工资必须为数字！", { icon: 2, animateType: 2 }); return false; }
    return true;
}


//检验账户名称是否已存在
function isExistAccount(account) {
    var result = false;
    for (var i = 0; i < userInfoArr.length; i++) {
        if (userInfoArr[i].account == account) {
            result = true;
            break;
        }
    }
    return result;
}

//获取最大的账户编号
function getMaxUserId() {
    var tempArr = [];
    for (var i = 0; i < userInfoArr.length; i++) {
        tempArr.push(Number(userInfoArr[i].userId));
    }
    return Number(Math.max.apply(null, tempArr));
}

//获取当前最低的用户等级
function getMinGrade() {
    var tempArr = [];
    for (var i = 0; i < userInfoArr.length; i++) {
        tempArr.push(Number(userInfoArr[i].userGrade));
    }
    return Number(Math.max.apply(null, tempArr));
}

//重置页面信息
function resetUser() {
    $("#userPicture").attr("src", "../../img/user/default.jpg");
    $("#table1 input,select").val("");
    $("#entryDate").val(getMTime().split(' ')[0]);
    $("#deptIds").empty();
    $("#deptIds").html(showDeptSelect());
}

//显示部门下拉列表
function showDeptSelect() {
    for (var m = 0; m < deptInfoArr.length; m++) {
        for (var n = 0; n < deptInfoArr.length - 1 - m; n++) {
            if (Number(deptInfoArr[n].deptGrade) > Number(deptInfoArr[n + 1].deptGrade)) {
                var tempDept = deptInfoArr[n];
                deptInfoArr[n] = deptInfoArr[n + 1];
                deptInfoArr[n + 1] = tempDept;
            }
        }
    }
    var optionStr = "<option value='' selected='selected'>--请选择--</option>";
    for (var i = 0; i < deptInfoArr.length; i++) {
        optionStr += "<option value='" + deptInfoArr[i].deptId + "'>" + deptInfoArr[i].deptNm + "</option>";
    }
    return optionStr;
}

//选择上传头像
function selectUserImg() {
    $("#imgFile").click();
    $("#imgFile").change(function () {
        //document.getElementById("imgFile").files;//用原生获取最好
        var imgFile = $(this)[0].files;//jq没有files属性，要这样获取才行
        var fileReader = new FileReader();
        fileReader.readAsDataURL(imgFile[0]);
        fileReader.onloadend = function (e) {
            //console.log(e.target.result);//图片字节码
            $("#userPicture").attr("src", e.target.result);
        }
    });
}

//修改头像
function selectUserImg2() {
    $("#imgFile2").click();
    $("#imgFile2").change(function () {
        var imgFile = $(this)[0].files;//jq没有files属性，要这样获取才行
        var fileReader = new FileReader();
        fileReader.readAsDataURL(imgFile[0]);
        fileReader.onloadend = function (e) {
            $("#userPicture2").attr("src", e.target.result);
        }
    });
}

//展示数据列表
function showUserInfoList(pageNum) {
    var tempArr = [], userIdStr = $("#userIdStr").val().trim(),
        userNmStr = $("#userNmStr").val().trim(),
        deptNmStr = $("#deptNmStr").val().trim(),
        workState = $("#workState").val().trim();//查询条件
    for (var i = 0; i < userInfoArr.length; i++) {
        var data = userInfoArr[i];
        if (data.userId != "000111" && data.userId.indexOf(userIdStr) != -1 && data.userNm.indexOf(userNmStr) != -1 && data.deptIds[0].indexOf(deptNmStr) != -1 && data.workState.indexOf(workState) != -1) {
            tempArr.push(data);
        }
    }

    //部门等级排序
    for (var m = 0; m < deptInfoArr.length; m++) {
        for (var n = 0; n < deptInfoArr.length - 1 - m; n++) {
            if (Number(deptInfoArr[n].deptGrade) > Number(deptInfoArr[n + 1].deptGrade)) {
                var tempDept = deptInfoArr[n];
                deptInfoArr[n] = deptInfoArr[n + 1];
                deptInfoArr[n + 1] = tempDept;
            }
        }
    }
    //员工等级排序
    for (var j = 0; j < tempArr.length; j++) {
        for (var k = 0; k < tempArr.length - 1 - j; k++) {
            if (Number(tempArr[k].userGrade) > Number(tempArr[k + 1].userGrade)) {
                var tempUser = tempArr[k];
                tempArr[k] = tempArr[k + 1];
                tempArr[k + 1] = tempUser;
            }
        }
    }

    //获取最终的用户排序
    var tempArr2 = [];
    for (var a = 0; a < deptInfoArr.length; a++) {
        for (var b = 0; b < tempArr.length; b++) {
            if (deptInfoArr[a].deptId == tempArr[b].deptIds[0]) {
                tempArr2.push(tempArr[b]);
            }
        }
    }

    //总页数
    pageCountNum = Math.ceil(tempArr2.length / showNum);
    //确保删除了最后一页的最后一条数据，页面显示到最后一页
    if (pageNum > pageCountNum) {
        pageNum = pageCountNum;
    }
    currentPageIndex = pageNum;
    //从数组当中取值的起始索引值
    var beginIndex = (currentPageIndex - 1) * showNum;
    //取出当页实际需要显示的数据
    var resultArr = tempArr2.slice(beginIndex, beginIndex + showNum);
    if (resultArr.length == 0) {
        $("#tips").text("~没有找到相关消息哟~");
    } else {
        $("#tips").text("");
    }

    //下边开始展示向前端展示分页的数据信息
    document.getElementById("currentPageIndex").innerText = currentPageIndex;
    document.getElementById("pageCount").innerText = pageCountNum;
    var showTbody = document.getElementById("showTbody");
    showTbody.innerHTML = "";
    for (var j = 0; j < resultArr.length; j++) {
        var dept = getDeptInfoById(resultArr[j].deptIds[0]);
        var trStr = "<tr><td> " + ((currentPageIndex - 1) * showNum + (j + 1)) + "</td>"
            + "<td>" + resultArr[j].userId + "</td>"
            + "<td>" + resultArr[j].userNm + "</td>"
            + "<td>" + resultArr[j].userSex + "</td>"
            + "<td>" + resultArr[j].userAge + "</td>"
            + "<td>" + resultArr[j].userPhone + "</td>"
            + "<td>" + resultArr[j].email + "</td>"
            + "<td>" + dept.deptNm + "</td>"
            + "<td>" + resultArr[j].zhiWei + "</td>"
            + "<td><a onclick=\"updateInfo('" + resultArr[j].userId + "')\">修改</a>&nbsp;"
            + "&nbsp;<a onclick=\"deleteInfo('" + resultArr[j].userId + "')\">删除</a></td></tr>";
        showTbody.innerHTML += trStr;
    }
    $("#showTbody tr:odd").css("background-color", "#F9F9F9");
}

//通过编号获取用户信息
function getUserInfoById(userId) {
    var user = "";
    for (var i = 0; i < userInfoArr.length; i++) {
        if (userInfoArr[i].userId == userId) {
            user = userInfoArr[i];
            break;
        }
    }
    return user;
}

//通过编号获取部门信息
function getDeptInfoById(deptId) {
    var dept = "";
    for (var i = 0; i < deptInfoArr.length; i++) {
        if (deptInfoArr[i].deptId == deptId) {
            dept = deptInfoArr[i];
            break;
        }
    }
    return dept;
}

//更新用户信息
function updateInfo(userId) {
    var user = getUserInfoById(userId);
    var tableStr = "<table id='table5' cellspadding='0' cellspacing='0'>";
    var img = "";
    if (user.picture == "") {
        img = "../../img/user/default.jpg";
    } else if (user.picture.length > 100) {
        img = user.picture;
    } else {
        img = "../../img/user/" + user.picture;
    }
    tableStr += "<tr><td colspan='2' align='center'><img id='userPicture2' src='" + img + "' onclick='selectUserImg2()' /><input id='imgFile2' type='file' accept='.jpg,.png,.jpeg,.gif' multiple='multiple' /></td><td>姓&nbsp;&nbsp;名：</td><td><input id='userNm2' name='userNm2' type='text' value='" + user.userNm + "'></td><td>性&nbsp;&nbsp;别：</td><td><select id='userSex2'><option value='男'>男</option><option value='女'>女</option></select></td><td>年&nbsp;&nbsp;龄：</td><td><input id='userAge2' name='userAge2' type='text' value='" + user.userAge + "'></td></tr>";
    tableStr += "<tr><td>身份证号：</td><td><input id='cardNum2' name='cardNum2' type='text' value='" + user.cardNum + "'></td><td>手机号：</td><td><input id='userPhone2' name='userPhone2' type='text' value='" + user.userPhone + "'></td><td>邮&nbsp;&nbsp;箱：</td><td><input id='email2' name='email2' type='text' value='" + user.email + "'></td><td>在职状态：</td><td><select id='workState2'><option value='1' selected='selected'>在职</option><option value='0'>离职</option></select></td></tr>";
    tableStr += "<tr><td>登录账户：</td><td><input id='account2' name='account2' type='text' value='" + user.account + "'></td><td>密&nbsp;&nbsp;码：</td><td><input id='mpassword2' name='mpassword2' type='password' value='" + user.password + "'></td><td>血&nbsp;&nbsp;型：</td><td><select id='bloodType2'><option value='' selected='selected'>--请选择--</option><option value='A'>A</option><option value='B'>B</option><option value='O'>O</option><option value='AB'>AB</option><option value='其它'>其它</option></select></td><td>婚&nbsp;&nbsp;姻：</td><td><select id='marriage2'><option value='' selected='selected'>--请选择--</option><option value='未婚'>未婚</option><option value='已婚'>已婚</option><option value='离异'>离异</option><option value='其它'>其它</option></select></td></tr>";
    tableStr += "<tr><td>教育背景：</td><td><select id='education2'><option value='' selected='selected'>--请选择--</option><option value='博士'>博士</option><option value='硕士'>硕士</option><option value='本科'>本科</option><option value='专科'>专科</option><option value='高中以下'>高中以下</option></select></td><td>国&nbsp;&nbsp;籍：</td><td><input id='country2' name='country2' type='text' value='" + user.country + "'></td><td>民&nbsp;&nbsp;族：</td><td><input id='nation2' name='nation2' type='text' value='" + user.nation + "'></td><td>籍&nbsp;&nbsp;贯：</td><td><input id='nativePlace2' name='nativePlace2' type='text' value='" + user.nativePlace + "'></td></tr>";
    tableStr += "<tr><td>家庭住址：</td><td><input id='address2' name='address2' type='text' value='" + user.address + "'></td> <td>所属部门：</td><td><select id='deptIds2'></select></td><td>职&nbsp;&nbsp;位：</td><td><input id='zhiWei2' name='zhiWei2' type='text' value='" + user.zhiWei + "'></td><td>工&nbsp;&nbsp;资：</td><td><input id='wages2' name='wages2' type='text' value='" + user.wages + "'></td></tr>";
    tableStr += "<tr><td>入职日期：</td><td><input id='entryDate2' name='entryDate2' type='text' readonly='readonly' value='" + user.entryDate + "'></td><td>离职日期：</td><td><input id='quitDate2' name='quitDate2' type='text' value='" + user.quitDate + "'></td><td>备&nbsp;&nbsp;注：</td><td><input id='details2' name='details2' type='text' value='" + user.details + "'></td></tr>";
    tableStr += "</table>";
    tableStr += "<script>$('#entryDate2').css('background-color','#EEEEEE');var str = showDeptSelect();$('#deptIds2').html(str);$('#workState2').val('" + user.workState + "');$('#bloodType2').val('" + user.bloodType + "');$('#marriage2').val('" + user.marriage + "');$('#education2').val('" + user.education + "');$('#deptIds2').val('" + user.deptIds + "');</script>";
    fyAlert.alert({
        title: "修改信息",
        shadowClose: false,
        area: ['1000px', '400px'],
        content: tableStr,
        btns: {
            '保 存': function (obj) {
                for (var i = 0; i < userInfoArr.length; i++) {
                    if (userInfoArr[i].userId == userId) {
                        user = userInfoArr[i];
                        var userPicture2 = $("#userPicture2").attr("src");
                        if (userPicture2 == "../../img/user/default.jpg") { userPicture2 = ""; }
                        user.picture = userPicture2;
                        user.userNm = $("#userNm2").val();
                        user.userSex = $("#userSex2").val();
                        user.userAge = $("#userAge2").val();
                        user.cardNum = $("#cardNum2").val();
                        user.userPhone = $("#userPhone2").val();
                        user.email = $("#email2").val();
                        user.workState = $("#workState2").val();
                        user.account = $("#account2").val();
                        user.password = $("#mpassword2").val();
                        user.bloodType = $("#bloodType2").val();
                        user.marriage = $("#marriage2").val();
                        user.education = $("#education2").val();
                        user.country = $("#country2").val();
                        user.nation = $("#nation2").val();
                        user.nativePlace = $("#nativePlace2").val();
                        user.address = $("#address2").val();
                        user.deptIds = [$("#deptIds2").val()];
                        user.zhiWei = $("#zhiWei2").val();
                        user.wages = $("#wages2").val();
                        user.quitDate = $("#quitDate2").val();
                        user.details = $("#details2").val();
                        break;
                    }
                }
                fyAlert.msg("修改成功", { icon: 1, animateType: 1 });
                localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
                showUserInfoList(currentPageIndex);
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });

}

//删除用户信息
function deleteInfo(userId) {
    fyAlert.alert({
        title: "提 示",
        drag: true,
        shadowClose: false,
        content: '是否确认刪除该员工？',
        btns: {
            '确 定': function (obj) {
                for (var i = 0; i < userInfoArr.length; i++) {
                    if (userInfoArr[i].userId == userId) {
                        userInfoArr.splice(i, 1);
                        fyAlert.msg("删除成功", { icon: 1, animateType: 1 });
                        showUserInfoList(currentPageIndex);
                        localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
                        break;
                    }
                }
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        },
    });
}

//切换新增部门和部门排序
function addOrSortShow1() {
    $("#addUserDiv").css("display", "block");
    $("#sortUserDiv").css("display", "none");
    $("#addStaffTab").css({ "background-color": "#3EAAE8" });
    $("#sortStaffTab").css({ "background-color": "#D9534F" });
}

function addOrSortShow2() {
    $("#addUserDiv").css("display", "none");
    $("#sortUserDiv").css("display", "table");
    $("#addStaffTab").css({ "background-color": "#D9534F" });
    $("#sortStaffTab").css({ "background-color": "#3EAAE8" });
    $("#deptUlList").empty();
    $("#userUlList").html("<li>请选择一个部门</li>");
    currentSelectDeptId = "", currentSelectUserId = "";
    for (var i = 0; i < deptInfoArr.length; i++) {
        var liStr = "<li id='" + deptInfoArr[i].deptId + "' data-num='" + deptInfoArr[i].deptGrade + "'>" + deptInfoArr[i].deptNm + "</li>";
        $("#deptUlList").append(liStr);
    }
    $("#deptUlList li").click(showUserList);
}

//显示部门下的所有员工列表
function showUserList(dpId) {
    var deptId = $(this).attr("id");
    if (deptId == undefined || deptId == "") {
        deptId = dpId;
    }
    var userArr = getUsersByDeptId(deptId);
    currentSelectDeptId = deptId;
    $("#userUlList").empty();
    if (userArr.length != 0) {
        for (var i = 0; i < userArr.length; i++) {
            var liStr = "<li id='" + userArr[i].userId + "' data-num='" + userArr[i].userGrade + "' data-dpid='" + deptId + "'>" + userArr[i].userNm + "</li>";
            $("#userUlList").append(liStr);
        }
    } else {
        $("#userUlList").append("<li>未找到该部门员工</li>");
    }
    $(this).siblings().css({ "background-color": "#FFFFFF", "color": "#555555" });
    $(this).css({ "background-color": "#3EAAE8", "color": "white" });
    $("#userUlList li").click(function () {
        var userId = $(this).attr("id");
        if (userId != undefined && userId != '') {
            currentSelectUserId = userId;
            $(this).siblings().css({ "background-color": "#FFFFFF", "color": "#555555" });
            $(this).css({ "background-color": "#3EAAE8", "color": "white" });
        }
    });
}

//根据部门id获取所有员工
function getUsersByDeptId(deptId) {
    var tempArr = [];
    for (var i = 0; i < userInfoArr.length; i++) {
        if (userInfoArr[i].deptIds.length > 0) {
            if (userInfoArr[i].deptIds[0] == deptId) {
                tempArr.push(userInfoArr[i]);
            }
        }
    }
    return tempArr;
}

//往上调整员工等级
function sortTopOperate() {
    if (currentSelectUserId == "") { fyAlert.msg("请先选择一个员工！", { icon: 2, animateType: 2 }); return false; }
    if ($("#" + currentSelectUserId).prev().length != 0) {
        var num = $("#" + currentSelectUserId).data("num");
        var prevUid = $("#" + currentSelectUserId).prev().attr("id");
        var prevNum = $("#" + currentSelectUserId).prev().data("num");
        for (var i = 0; i < userInfoArr.length; i++) {
            if (userInfoArr[i].userId == prevUid) {
                userInfoArr[i].userGrade = num + "";
            }
            if (userInfoArr[i].userId == currentSelectUserId) {
                userInfoArr[i].userGrade = prevNum + "";
            }
        }
        //进行等级排序
        for (var m = 0; m < userInfoArr.length; m++) {
            for (var n = 0; n < userInfoArr.length - 1 - m; n++) {
                if (Number(userInfoArr[n].userGrade) > Number(userInfoArr[n + 1].userGrade)) {
                    var tempUser = userInfoArr[n];
                    userInfoArr[n] = userInfoArr[n + 1];
                    userInfoArr[n + 1] = tempUser;
                }
            }
        }
        localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
        var dpId = $("#" + currentSelectUserId).data("dpid");
        $("#userUlList").empty();
        for (var i = 0; i < userInfoArr.length; i++) {
            if (userInfoArr[i].deptIds[0] == dpId) {
                var liStr = "<li id='" + userInfoArr[i].userId + "' data-num='" + userInfoArr[i].userGrade + "' data-dpid='" + userInfoArr[i].deptIds[0] + "'>" + userInfoArr[i].userNm + "</li>";
                $("#userUlList").append(liStr);
            }
        }
        $("#userUlList li").click(function () {
            var userId = $(this).attr("id");
            if (userId != undefined && userId != '') {
                currentSelectUserId = userId;
                $(this).siblings().css({ "background-color": "#FFFFFF", "color": "#555555" });
                $(this).css({ "background-color": "#3EAAE8", "color": "white" });
            }
        });
        $("#" + currentSelectUserId).css({ "background-color": "#3EAAE8", "color": "white" });
        showUserInfoList(currentPageIndex);
    } else {
        fyAlert.msg($("#" + currentSelectUserId).text() + "已经是最高等级！", { icon: 2, animateType: 2 }); return false;
    }
}

//往下调整部门等级
function sortBottomOperate() {
    if (currentSelectUserId == "") { fyAlert.msg("请先选择一个员工！", { icon: 2, animateType: 2 }); return false; }
    if ($("#" + currentSelectUserId).next().length != 0) {
        var num = $("#" + currentSelectUserId).data("num");
        var nextUid = $("#" + currentSelectUserId).next().attr("id");
        var nextNum = $("#" + currentSelectUserId).next().data("num");
        for (var i = 0; i < userInfoArr.length; i++) {
            if (userInfoArr[i].userId == nextUid) {
                userInfoArr[i].userGrade = num + "";
            }
            if (userInfoArr[i].userId == currentSelectUserId) {
                userInfoArr[i].userGrade = nextNum + "";
            }
        }
        //进行等级排序
        for (var m = 0; m < userInfoArr.length; m++) {
            for (var n = 0; n < userInfoArr.length - 1 - m; n++) {
                if (Number(userInfoArr[n].userGrade) > Number(userInfoArr[n + 1].userGrade)) {
                    var tempUser = userInfoArr[n];
                    userInfoArr[n] = userInfoArr[n + 1];
                    userInfoArr[n + 1] = tempUser;
                }
            }
        }
        localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
        var dpId = $("#" + currentSelectUserId).data("dpid");
        $("#userUlList").empty();
        for (var i = 0; i < userInfoArr.length; i++) {
            if (userInfoArr[i].deptIds[0] == dpId) {
                var liStr = "<li id='" + userInfoArr[i].userId + "' data-num='" + userInfoArr[i].userGrade + "' data-dpid='" + userInfoArr[i].deptIds[0] + "'>" + userInfoArr[i].userNm + "</li>";
                $("#userUlList").append(liStr);
            }
        }
        $("#userUlList li").click(function () {
            var userId = $(this).attr("id");
            if (userId != undefined && userId != '') {
                currentSelectUserId = userId;
                $(this).siblings().css({ "background-color": "#FFFFFF", "color": "#555555" });
                $(this).css({ "background-color": "#3EAAE8", "color": "white" });
            }
        });
        $("#" + currentSelectUserId).css({ "background-color": "#3EAAE8", "color": "white" });
        showUserInfoList(currentPageIndex);
    } else {
        fyAlert.msg($("#" + currentSelectUserId).text() + "已经是最末一级！", { icon: 2, animateType: 2 }); return false;
    }
}