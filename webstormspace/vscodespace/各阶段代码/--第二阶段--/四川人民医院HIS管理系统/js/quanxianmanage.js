var idArr = [],//存储树状图每个节点的id
    dataArrJson = [];//存放数据集合

$(document).ready(function () {
    initLocalStorageData();//初始化本地数据
    analysisShowTreeData();
    showAllRole('', true);

    $("#saveInfo").click(addUserQuanXian);
});


//解析并显示树状图数据
function analysisShowTreeData() {
    idArr = [], dataArrJson = [];
    //部门等级排序
    for (var m = 0; m < deptInfoArr.length; m++) {
        for (var n = 0; n < deptInfoArr.length - 1 - m; n++) {
            if (Number(deptInfoArr[n].deptGrade) > Number(deptInfoArr[n + 1].deptGrade)) {
                var temp1 = deptInfoArr[n];
                deptInfoArr[n] = deptInfoArr[n + 1];
                deptInfoArr[n + 1] = temp1;
            }
        }
    }
    //员工等级排序
    for (var p = 0; p < userInfoArr.length; p++) {
        for (var q = 0; q < userInfoArr.length - 1 - p; q++) {
            if (Number(userInfoArr[q].userGrade) > Number(userInfoArr[q + 1].userGrade)) {
                var temp2 = userInfoArr[q];
                userInfoArr[q] = userInfoArr[q + 1];
                userInfoArr[q + 1] = temp2;
            }
        }
    }
    for (var i = 0; i < deptInfoArr.length; i++) {
        idArr.push(deptInfoArr[i].deptId);
        var tempUsersArr = [];
        //先找出该部门下所有员工
        for (var k = 0; k < userInfoArr.length; k++) {
            if (userInfoArr[k].deptIds[0] == deptInfoArr[i].deptId) {
                tempUsersArr.push(userInfoArr[k]);
            }
        }
        var nodesArr = [];
        for (var j = 0; j < tempUsersArr.length; j++) {
            var itemColor = tempUsersArr[j].workState != 1 ? "red" : "";
            var obj = { text: tempUsersArr[j].userNm, color: itemColor, tags: [tempUsersArr[j].userId, tempUsersArr[j].userNm, tempUsersArr[j].account, tempUsersArr[j].userPhone, deptInfoArr[i].deptNm, tempUsersArr[j].zhiWei, tempUsersArr[j].workState] };
            idArr.push(deptInfoArr[i].deptId + "_" + tempUsersArr[j].userId);
            nodesArr.push(obj);
        }
        var object = { text: deptInfoArr[i].deptNm, nodes: nodesArr };
        dataArrJson.push(object);
    }

    $('#userListShow').treeview({
        color: "#428bca",
        data: dataArrJson
    });

    //自定义树状图双击事件
    //节点选中时触发
    $('#userListShow').on('nodeSelected', function (event, data) {
        if (data.nodes == undefined) {
            $("#userId").text(data.tags[0]);
            $("#userNm").text(data.tags[1]);
            $("#account").text(data.tags[2]);
            $("#phoneNum").text(data.tags[3]);
            $("#deptNm").text(data.tags[4]);
            $("#zhiWei").text(data.tags[5]);
            var str = data.tags[6] == "1" ? "在职" : "离职";
            $("#workState").text(str);
            if (data.tags[6] == "1") {
                showAllRole(data.tags[0], false);
            } else {
                showAllRole(data.tags[0], true);
            }
        } else {
            $("#userId,#userNm,#account,#phoneNum,#deptNm,#zhiWei,#workState").text("");
            showAllRole('', true);
        }
    });
    //节点取消选中时触发
    $('#userListShow').on('nodeUnselected', function (event, data) { });
}

//展示所有业务角色，isDisabled：true代表禁用
function showAllRole(userId, isDisabled) {
    $(".roleBox").empty();
    for (var i = 0; i < roleInfoArr.length; i++) {
        var liStr = "";
        if (roleInfoArr[i].roleId != '10') {//过滤掉超级管理员
            if (!isDisabled) {
                liStr = "<li><div class='checkbox'><label>"
                    + "<input type='checkbox' id='qx_" + roleInfoArr[i].roleId + "' value='" + roleInfoArr[i].roleId + "'>" + roleInfoArr[i].roleNm
                    + "</label></div></li>";
            } else {
                liStr = "<li><div class='checkbox disabled'><label>"
                    + "<input type='checkbox' id='qx_" + roleInfoArr[i].roleId + "' value='" + roleInfoArr[i].roleId + "' disabled>" + roleInfoArr[i].roleNm
                    + "</label></div></li>";
            }
            $(".roleBox").append(liStr);
        }
    }

    if (userId != '' && userId != undefined) {
        for (var i = 0; i < userInfoArr.length; i++) {
            if (userInfoArr[i].userId == userId) {
                for (var j = 0; j < userInfoArr[i].quanxian.length; j++) {
                    $("#qx_" + userInfoArr[i].quanxian[j]).attr("checked", "true");
                }
                break;
            }
        }
    }
}

//保存用户权限
function addUserQuanXian() {
    var userId = $("#userId").text().trim();
    if (userId == '') { fyAlert.msg("请先选择一个员工！", { icon: 2, animateType: 2 }); return false; }
    if ($("#workState").text().trim() == '离职') { fyAlert.msg("该员工已离职，无法操作！", { icon: 2, animateType: 2 }); return false; }
    var dataArr = [];
    $(".roleBox").find(":checkbox:checked").each(function () {
        var val = $(this).val();
        dataArr.push(val);
    });
    for (var i = 0; i < userInfoArr.length; i++) {
        if (userInfoArr[i].userId == userId) {
            userInfoArr[i].quanxian = dataArr;
            break;
        }
    }
    localStorage.setItem("userInfoArr", JSON.stringify(userInfoArr));
    showAllRole(userId, false);
    fyAlert.msg("保存成功", { icon: 1, animateType: 1 });
}







