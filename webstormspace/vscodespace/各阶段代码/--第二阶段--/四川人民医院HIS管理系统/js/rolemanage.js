var currentPageIndex = 1;//当前显示的页数
var pageCountNum = 1;//默认总页数
var showNum = 8;//一页显示的数据量
var idArr = [],//存储树状图每个节点的id
    dataArrJson = [];//存放数据集合
var idArr2 = [], dataArrJson2 = [];//存放修改的模块配置

$(document).ready(function () {
    initLocalStorageData();//初始化本地数据
    analysisShowTreeData();
    showInfoList(currentPageIndex);

    $("input[name='creTime']").val(getMTime());
    $("#table1 input[type='text'],#table2 input[type='text']").css("width", "90%");

    $("#saveInfo").click(saveRoleInfo);
    $("#resetInfo").click(resetRoleInfo);

    //首页
    document.getElementById("firstPage").onclick = function () { showInfoList(1) }

    //末页
    document.getElementById("lastPage").onclick = function () { showInfoList(pageCountNum) }

    //上一页
    document.getElementById("prevPage").onclick = function () {
        if (currentPageIndex > 1) { showInfoList(currentPageIndex - 1); }
    }

    //下一页
    document.getElementById("nextPage").onclick = function () {
        if (currentPageIndex < pageCountNum) { showInfoList(currentPageIndex + 1); }
    }

    //搜索
    document.getElementById("queryBtn").onclick = function () { showInfoList(1); }

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
        showInfoList(jumpPage);
    }
});


//解析并显示树状图数据
function analysisShowTreeData() {
    idArr = [], dataArrJson = [];
    for (var m = 0; m < yeWuMoKuaiArr.length; m++) {
        for (var n = 0; n < yeWuMoKuaiArr.length - 1 - m; n++) {
            if (Number(yeWuMoKuaiArr[n].modelGrade) > Number(yeWuMoKuaiArr[n + 1].modelGrade)) {
                var temp = yeWuMoKuaiArr[n];
                yeWuMoKuaiArr[n] = yeWuMoKuaiArr[n + 1];
                yeWuMoKuaiArr[n + 1] = temp;
            }
        }
    }
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        idArr.push(yeWuMoKuaiArr[i].modelId);
        var nodesArr = [];
        var modelColor = yeWuMoKuaiArr[i].isUse != 1 ? "red" : "";
        for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
            var itemColor = yeWuMoKuaiArr[i].itemArr[j].isUse != 1 ? "red" : "";
            if (modelColor == "red") {
                itemColor = "red";
            }
            var obj = { text: yeWuMoKuaiArr[i].itemArr[j].itemNm, color: itemColor };
            idArr.push(yeWuMoKuaiArr[i].itemArr[j].itemId);
            nodesArr.push(obj);
        }
        var object = { text: yeWuMoKuaiArr[i].modelNm, color: modelColor, nodes: nodesArr };
        dataArrJson.push(object);
    }

    $('#roleTreeView').treeview({
        color: "#428bca",
        data: dataArrJson,
        showIcon: false,
        showCheckbox: true,
        onNodeChecked: function (event, node) {
            $('#checkable-output').prepend('<p>' + node.text + ' was checked</p>');
            if (node.nodes != undefined) {
                //选中的一级模块
                for (var i = 0; i < node.nodes.length; i++) {
                    $('#roleTreeView').treeview("checkNode", [node.nodes[i].nodeId, { slient: true }]);
                }
            } else {
                //选中的是子项
                /* if (node.parentId != undefined) {
                    var parentNode = $('#roleTreeView').treeview('getParent', node.nodeId);
                    $('#roleTreeView').treeview("checkNode", [parentNode.nodeId, { slient: true }]);
                } */
            }
        },
        onNodeUnchecked: function (event, node) {
            $('#checkable-output').prepend('<p>' + node.text + ' was unchecked</p>');
            if (node.nodes != undefined) {
                for (var i = 0; i < node.nodes.length; i++) {
                    $('#roleTreeView').treeview("uncheckNode", [node.nodes[i].nodeId, { slient: true }]);
                }
            }
        }
    });
}

//保存角色信息
function saveRoleInfo() {
    var roleNm = $("#roleNm").val().trim();
    var creTime = $("#creTime").val().trim();
    var details = $("#details").val().trim();
    var arr = $('#roleTreeView').treeview('getChecked');
    var tempArr = [];
    for (var i = 0; i < arr.length; i++) {
        tempArr.push(idArr[arr[i].nodeId]);
    }
    if (roleNm == '') { fyAlert.msg("角色名称不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (isExistRoleNm('', roleNm)) { fyAlert.msg("该角色已存在！", { icon: 2, animateType: 2 }); return false; }
    var roleId = (getMaxRoleId() + 1) + "";
    var obj = {
        "roleId": roleId,
        "roleNm": roleNm,
        "creTime": creTime,
        "details": details,
        "range": tempArr
    };
    roleInfoArr.push(obj);
    localStorage.setItem("roleInfoArr", JSON.stringify(roleInfoArr));
    fyAlert.msg("保存成功", { icon: 1, animateType: 1 });
    resetRoleInfo();
    showInfoList(1);
}

//判断角色名称是否已存在
function isExistRoleNm(roleId, roleNm) {
    var result = false;
    for (var i = 0; i < roleInfoArr.length; i++) {
        if (roleInfoArr[i].roleId != roleId && roleInfoArr[i].roleNm == roleNm) {
            result = true;
            break;
        }
    }
    return result;
}

//获取最大的角色编号
function getMaxRoleId() {
    var tempArr = [];
    for (var i = 0; i < roleInfoArr.length; i++) {
        tempArr.push(Number(roleInfoArr[i].roleId));
    }
    if (tempArr.length == 0) {
        return 11;
    } else {
        return Math.max.apply(null, tempArr);
    }
}

//重置表格信息
function resetRoleInfo() {
    $("#roleNm").val("");
    $("#creTime").val(getMTime());
    $("#details").val("");
    analysisShowTreeData();
}

//展示数据列表
function showInfoList(pageNum) {
    var tempArr = [], roleNmStr = $("#roleNmStr").val().trim(), detailsStr = $("#detailsStr").val().trim();//查询条件
    if (roleNmStr != "" || detailsStr != "") {
        for (var i = 0; i < roleInfoArr.length; i++) {
            var data = roleInfoArr[i];
            if (data.roleNm.indexOf(roleNmStr) != -1 && data.details.indexOf(detailsStr) != -1) {
                tempArr.push(data);
            }
        }
    } else {
        tempArr = roleInfoArr;
    }

    //总页数
    pageCountNum = Math.ceil(tempArr.length / showNum);
    //确保删除了最后一页的最后一条数据，页面显示到最后一页
    if (pageNum > pageCountNum) {
        pageNum = pageCountNum;
    }
    currentPageIndex = pageNum;

    //从数组当中取值的起始索引值
    var beginIndex = (currentPageIndex - 1) * showNum;
    //取出当页实际需要显示的数据
    var resultArr = tempArr.slice(beginIndex, beginIndex + showNum);
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
        var trStr = "<tr><td> " + ((currentPageIndex - 1) * showNum + (j + 1)) + "</td><td>" + resultArr[j].deptId + "</td><td>" + resultArr[j].deptNm + "</td><td>" + resultArr[j].abbreviation + "</td><td>" + resultArr[j].zhiNeng + "</td><td>" + resultArr[j].createDate + "</td><td><a onclick=\"updateInfo('" + resultArr[j].deptId + "')\">修改</a>&nbsp;&nbsp;<a onclick=\"deleteInfo('" + resultArr[j].deptId + "')\">删除</a></td></tr>";
        var trStr = "<tr>"
            + "<td>" + ((currentPageIndex - 1) * showNum + (j + 1)) + "</td>"
            + "<td>" + resultArr[j].roleNm + "</td>"
            + "<td>" + resultArr[j].creTime + "</td>"
            + "<td>" + resultArr[j].details + "</td>";
        if (resultArr[j].roleId == '10') {//过滤掉超级管理员
            trStr += "<td></td>";
        } else {
            trStr += "<td><a href='javascript:;' onclick=\"uppRoleInfo('" + resultArr[j].roleId + "')\">修改</a>&nbsp;&nbsp;"
                + "<a href='javascript:;' onclick=\"delRoleInfo('" + resultArr[j].roleId + "')\">删除</a></td>";
        }
        trStr += "</tr>";
        showTbody.innerHTML += trStr;
    }
    $("#showTbody tr:odd").css("background-color", "#F9F9F9");
}

//删除角色
function delRoleInfo(roleId) {
    fyAlert.alert({
        title: "提 示",
        drag: true,
        shadowClose: false,
        content: '是否确认刪除该角色？',
        btns: {
            '确 定': function (obj) {
                for (var i = 0; i < roleInfoArr.length; i++) {
                    if (roleInfoArr[i].roleId == roleId) {
                        roleInfoArr.splice(i, 1);
                        localStorage.setItem("roleInfoArr", JSON.stringify(roleInfoArr));
                        fyAlert.msg("删除成功", { icon: 1, animateType: 1 });
                        resetRoleInfo();
                        showInfoList(1);
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

//修改角色信息
function uppRoleInfo(roleId) {
    var role;
    for (var i = 0; i < roleInfoArr.length; i++) {
        if (roleInfoArr[i].roleId == roleId) {
            role = roleInfoArr[i];
            break;
        }
    }
    var tableStr = "<table id='table4' class='table table-bordered'>";
    tableStr += "<tr align='center'><td>角色名称：</td><td><input id='roleNm_n' name='roleNm_n' type='text' class='form-control' value='" + role.roleNm + "'></td>";
    tableStr += "<td>创建时间：</td><td><input type='text' class='form-control' readonly='readonly' value='" + role.creTime + "'></td></tr>";
    tableStr += "<tr align='center'><td>备&nbsp;&nbsp;注：</td><td colspan='3'><input id='details_n' name='details_n' type='text' class='form-control' value='" + role.details + "'></td></tr>";
    tableStr += "<tr align='center'><td colspan='4' class='treeTd2'><div id='updTreeView'></div></td></tr>";
    tableStr += "</table>";
    tableStr += "<script>$(\"#table4 input[type='text']\").css('width', '90%');updModelTreeData('" + roleId + "');</script>";

    fyAlert.alert({
        title: "修改信息",
        shadowClose: false,
        area: ['500px', '500px'],
        content: tableStr,//内容
        btns: {
            '保 存': function (obj) {
                var roleNm = $("#roleNm_n").val().trim();
                var details = $("#details_n").val().trim();
                var arr = $('#updTreeView').treeview('getChecked');
                var tempArr = [];
                for (var i = 0; i < arr.length; i++) {
                    tempArr.push(idArr2[arr[i].nodeId]);
                }
                if (roleNm == '') { fyAlert.msg("角色名称不能为空！", { icon: 2, animateType: 2 }); return false; }
                if (isExistRoleNm(roleId, roleNm)) { fyAlert.msg("该角色已存在！", { icon: 2, animateType: 2 }); return false; }

                for (var j = 0; j < roleInfoArr.length; j++) {
                    if (roleInfoArr[j].roleId == roleId) {
                        roleInfoArr[j].roleNm = roleNm;
                        roleInfoArr[j].details = details;
                        roleInfoArr[j].range = tempArr;
                        break;
                    }
                }
                localStorage.setItem("roleInfoArr", JSON.stringify(roleInfoArr));
                fyAlert.msg("修改成功", { icon: 1, animateType: 1 });
                resetRoleInfo();
                showInfoList(1);
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });

}


//修改配置的模块
function updModelTreeData(roleId) {
    idArr2 = [], dataArrJson2 = [];
    var role, count = 0;;
    for (var i = 0; i < roleInfoArr.length; i++) {
        if (roleInfoArr[i].roleId == roleId) {
            role = roleInfoArr[i];
            break;
        }
    }
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        count = 0;
        idArr2.push(yeWuMoKuaiArr[i].modelId);
        var nodesArr = [];
        var modelColor = yeWuMoKuaiArr[i].isUse != 1 ? "red" : "";
        for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
            var itemColor = yeWuMoKuaiArr[i].itemArr[j].isUse != 1 ? "red" : "";
            if (modelColor == "red") {
                itemColor = "red";
            }
            var isChecked = false;
            for (var k = 0; k < role.range.length; k++) {
                if (role.range[k] == yeWuMoKuaiArr[i].itemArr[j].itemId) {
                    isChecked = true;
                    count++;
                    break;
                }
            }
            var obj = { text: yeWuMoKuaiArr[i].itemArr[j].itemNm, color: itemColor, state: { "checked": isChecked } };
            idArr2.push(yeWuMoKuaiArr[i].itemArr[j].itemId);
            nodesArr.push(obj);
        }
        var isChecked2 = count > 0 ? true : "";
        var object = { text: yeWuMoKuaiArr[i].modelNm, color: modelColor, nodes: nodesArr, state: { "checked": isChecked2 } };
        dataArrJson2.push(object);
    }

    $('#updTreeView').treeview({
        color: "#428bca",
        data: dataArrJson2,
        showIcon: false,
        showCheckbox: true,
        onNodeChecked: function (event, node) {
            $('#checkable-output').prepend('<p>' + node.text + ' was checked</p>');
            if (node.nodes != undefined) {
                //选中的一级模块
                for (var i = 0; i < node.nodes.length; i++) {
                    $('#updTreeView').treeview("checkNode", [node.nodes[i].nodeId, { slient: true }]);
                }
            }
        },
        onNodeUnchecked: function (event, node) {
            $('#checkable-output').prepend('<p>' + node.text + ' was unchecked</p>');
            if (node.nodes != undefined) {
                for (var i = 0; i < node.nodes.length; i++) {
                    $('#updTreeView').treeview("uncheckNode", [node.nodes[i].nodeId, { slient: true }]);
                }
            }
        }
    });
}