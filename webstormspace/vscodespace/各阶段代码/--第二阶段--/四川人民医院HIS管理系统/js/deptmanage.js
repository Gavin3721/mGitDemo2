var currentPageIndex = 1;//当前显示的页数
var pageCountNum = 1;//默认总页数
var showNum = 8;//一页显示的数据量
var currentSelectDeptId = "";//当前选中部门id

$(document).ready(function () {
    initLocalStorageData();//初始化本地数据

    $("input[name='createDate']").val(getMTime());
    $("#table1 input[type='text']").css("width", "90%");
    $("#table2 input[type='text']").css("width", "80%");

    $("#saveInfo").click(saveDeptNm);
    $("#resetInfo").click(resetDeptInfo);
    $("#addDeptTab").click(addOrSortShow1);
    $("#sortDeptTab").click(addOrSortShow2);
    $("#topBtn").click(sortTopOperate);
    $("#bottomBtn").click(sortBottomOperate);

    showDeptInfoList(currentPageIndex);
    //首页
    document.getElementById("firstPage").onclick = function () { showDeptInfoList(1) }

    //末页
    document.getElementById("lastPage").onclick = function () { showDeptInfoList(pageCountNum) }

    //上一页
    document.getElementById("prevPage").onclick = function () {
        if (currentPageIndex > 1) {
            showDeptInfoList(currentPageIndex - 1);
        }
    }

    //下一页
    document.getElementById("nextPage").onclick = function () {
        if (currentPageIndex < pageCountNum) {
            showDeptInfoList(currentPageIndex + 1);
        }
    }

    //搜索
    document.getElementById("queryBtn").onclick = function () { showDeptInfoList(1); }

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
        showDeptInfoList(jumpPage);
    }
});

//保存部门信息
function saveDeptNm() {
    var deptNm = $("#deptNm").val().trim();
    var abbreviation = $("#abbreviation").val().trim();
    var zhiNeng = $("#zhiNeng").val().trim();
    var createDate = $("#createDate").val().trim();
    var details = $("#details").val().trim();
    if (deptNm == '') { fyAlert.msg("部门名称不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (abbreviation == '') { fyAlert.msg("英文简称不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (zhiNeng == '') { fyAlert.msg("职能不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (isExistDept('', deptNm)) { fyAlert.msg("该部门已存在", { icon: 2, animateType: 2 }); return false; }
    if (isExistAbbr('', abbreviation)) { fyAlert.msg("该英文简称已存在", { icon: 2, animateType: 2 }); return false; }
    var deptId = "010", deptGrade = "1";
    if (deptInfoArr.length != 0) {
        deptId = (getMaxDeptId() + 1) + "";
        deptGrade = (getMinGrade() + 1) + "";
    }
    deptId.length == 2 ? deptId = "0" + deptId : deptId = "" + deptId;
    var obj = {
        "deptId": deptId,
        "deptNm": deptNm,
        "abbreviation": abbreviation,
        "deptGrade": deptGrade,
        "zhiNeng": zhiNeng,
        "details": details,
        "createDate": createDate
    };
    deptInfoArr.push(obj);
    localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArr));
    fyAlert.msg("保存成功", { icon: 1, animateType: 1 });
    resetDeptInfo();
    showDeptInfoList(1);
}

//检验部门名称是否已存在
function isExistDept(deptId, deptNm) {
    var result = false;
    if (deptId == "") {
        //新增部门时验证
        for (var i = 0; i < deptInfoArr.length; i++) {
            if (deptInfoArr[i].deptNm == deptNm) {
                result = true;
                break;
            }
        }
    } else {
        //修改部门时验证
        for (var j = 0; j < deptInfoArr.length; j++) {
            if (deptInfoArr[j].deptId != deptId && deptInfoArr[j].deptNm == deptNm) {
                result = true;
                break;
            }
        }
    }
    return result;
}

//检验部门简称是否已存在
function isExistAbbr(deptId, abbreviation) {
    var result = false;
    if (deptId == "") {
        for (var i = 0; i < deptInfoArr.length; i++) {
            if (deptInfoArr[i].abbreviation == abbreviation) {
                result = true;
                break;
            }
        }
    } else {
        for (var j = 0; j < deptInfoArr.length; j++) {
            if (deptInfoArr[j].deptId != deptId && deptInfoArr[j].abbreviation == abbreviation) {
                result = true;
                break;
            }
        }
    }
    return result;
}

//获取最大的部门编号
function getMaxDeptId() {
    var tempArr = [];
    for (var i = 0; i < deptInfoArr.length; i++) {
        tempArr.push(Number(deptInfoArr[i].deptId));
    }
    return Number(Math.max.apply(null, tempArr));
}

//获取当前最低的部门等级
function getMinGrade() {
    var tempArr = [];
    for (var i = 0; i < deptInfoArr.length; i++) {
        tempArr.push(Number(deptInfoArr[i].deptGrade));
    }
    return Number(Math.max.apply(null, tempArr));
}

//重置页面信息
function resetDeptInfo() {
    $("#deptNm").val("");
    $("#abbreviation").val("");
    $("#zhiNeng").val("");
    $("input[name='createDate']").val(getMTime());
    $("#details").val("");
}

//展示数据列表
function showDeptInfoList(pageNum) {
    var tempArr = [], deptIdStr = $("#deptIdStr").val().trim(), deptNmStr = $("#deptNmStr").val().trim();//查询条件
    if (deptIdStr != "" || deptNmStr != "") {
        //如果条件不为空，则先找出符合要求的数据
        for (var i = 0; i < deptInfoArr.length; i++) {
            var data = deptInfoArr[i];
            if (data.deptId.indexOf(deptIdStr) != -1 && data.deptNm.indexOf(deptNmStr) != -1) {
                tempArr.push(data);
            }
        }
    } else {
        tempArr = deptInfoArr;
    }

    //进行等级排序
    for (var m = 0; m < tempArr.length; m++) {
        for (var n = 0; n < tempArr.length - 1 - m; n++) {
            if (Number(tempArr[n].deptGrade) > Number(tempArr[n + 1].deptGrade)) {
                var tempDept = tempArr[n];
                tempArr[n] = tempArr[n + 1];
                tempArr[n + 1] = tempDept;
            }
        }
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
        showTbody.innerHTML += trStr;
    }
    $("#showTbody tr:odd").css("background-color", "#F9F9F9");
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

//更新部门信息
function updateInfo(deptId) {
    var dept = getDeptInfoById(deptId);
    var tableStr = "<table id='table5' class='table table-bordered' align='center'>";
    tableStr += "<tr align='center'><td>部门编号：</td><td>" + dept.deptId + "</td></tr>";
    tableStr += "<tr align='center'><td>部门名称：</td><td><input id='deptNm_n' type='text' class='form-control' value='" + dept.deptNm + "'></td></tr>";
    tableStr += "<tr align='center'><td>英文简称：</td><td><input id='abbreviation_n' type='text' class='form-control' value='" + dept.abbreviation + "'></td></tr>";
    tableStr += "<tr align='center'><td>职&nbsp;&nbsp;能：</td><td><input id='zhiNeng_n' type='text' class='form-control' value='" + dept.zhiNeng + "'></td></tr>";
    tableStr += "<tr align='center'><td>创建时间：</td><td>" + dept.createDate + "</td></tr>";
    tableStr += "<tr align='center'><td>备&nbsp;&nbsp;注：</td><td><input id='details_n' type='text' class='form-control' value='" + dept.details + "'></td></tr>";
    tableStr += "</table>";

    fyAlert.alert({
        title: "修改信息",
        /* drag: true, */
        shadowClose: false,
        area: ['450px', '400px'],
        content: tableStr,//内容
        btns: {
            '保 存': function (obj) {
                var deptNm = $("#deptNm_n").val().trim();
                var abbreviation = $("#abbreviation_n").val().trim();
                var zhiNeng = $("#zhiNeng_n").val().trim();
                var details = $("#details_n").val().trim();
                if (deptNm == '') { fyAlert.msg("部门名称不能为空！", { icon: 2, animateType: 2 }); return false; }
                if (abbreviation == '') { fyAlert.msg("英文简称不能为空！", { icon: 2, animateType: 2 }); return false; }
                if (zhiNeng == '') { fyAlert.msg("职能不能为空！", { icon: 2, animateType: 2 }); return false; }
                if (isExistDept(deptId, deptNm)) { fyAlert.msg("该部门已存在", { icon: 2, animateType: 2 }); return false; }
                if (isExistAbbr(deptId, abbreviation)) { fyAlert.msg("该英文简称已存在", { icon: 2, animateType: 2 }); return false; }
                for (var i = 0; i < deptInfoArr.length; i++) {
                    if (deptInfoArr[i].deptId == deptId) {
                        dept = deptInfoArr[i];
                        dept.deptNm = deptNm;
                        dept.abbreviation = abbreviation;
                        dept.zhiNeng = zhiNeng;
                        dept.details = details;
                        break;
                    }
                }
                fyAlert.msg("修改成功", { icon: 1, animateType: 1 });
                localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArr));
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });

}

//删除部门信息
function deleteInfo(deptId) {
    for (var k = 0; k < userInfoArr.length; k++) {
        if (userInfoArr[k].deptIds[0] == deptId) {
            fyAlert.msg("该部门下有所属员工，不能直接删除！", { icon: 2, animateType: 2 }); return false;
        }
    }
    fyAlert.alert({
        title: "提 示",
        drag: true,
        shadowClose: false,
        content: '是否确认刪除该部门？',
        btns: {
            '确 定': function (obj) {
                for (var i = 0; i < deptInfoArr.length; i++) {
                    if (deptInfoArr[i].deptId == deptId) {
                        deptInfoArr.splice(i, 1);
                        fyAlert.msg("删除成功", { icon: 1, animateType: 1 });
                        showDeptInfoList(currentPageIndex);
                        localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArr));
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
    $("#addDeptDiv").css("display", "block");
    $("#sortDeptDiv").css("display", "none");
    $("#addDeptTab").css({ "background-color": "#3EAAE8" });
    $("#sortDeptTab").css({ "background-color": "#D9534F" });
}

function addOrSortShow2() {
    $("#addDeptDiv").css("display", "none");
    $("#sortDeptDiv").css("display", "table");
    $("#addDeptTab").css({ "background-color": "#D9534F" });
    $("#sortDeptTab").css({ "background-color": "#3EAAE8" });
    $("#deptUlList").empty();
    currentSelectDeptId = "";
    for (var i = 0; i < deptInfoArr.length; i++) {
        var liStr = "<li id='" + deptInfoArr[i].deptId + "' data-num='" + deptInfoArr[i].deptGrade + "'>" + deptInfoArr[i].deptNm + "</li>";
        $("#deptUlList").append(liStr);
    }
    $("#deptUlList li").click(onlyShowDeptInfo);
}

//仅用于显示部门信息
function onlyShowDeptInfo() {
    var deptId = $(this).attr("id");
    var dept = getDeptInfoById(deptId);
    currentSelectDeptId = deptId;
    $(this).siblings().css({ "background-color": "#FFFFFF", "color": "#555555" });
    $(this).css({ "background-color": "#3EAAE8", "color": "white" });
    $("#dId").text(dept.deptId);
    $("#dNm").text(dept.deptNm);
    $("#dAbbr").text(dept.abbreviation);
    $("#dZn").text(dept.zhiNeng);
    $("#dCt").text(dept.createDate);
    $("#dDet").text(dept.details);
}

//往上调整部门等级
function sortTopOperate() {
    if (currentSelectDeptId == "") { fyAlert.msg("请先选择一个部门！", { icon: 2, animateType: 2 }); return false; }
    if ($("#" + currentSelectDeptId).prev().length != 0) {
        var num = $("#" + currentSelectDeptId).data("num");
        var prevDid = $("#" + currentSelectDeptId).prev().attr("id");
        var prevNum = $("#" + currentSelectDeptId).prev().data("num");
        for (var i = 0; i < deptInfoArr.length; i++) {
            if (deptInfoArr[i].deptId == prevDid) {
                deptInfoArr[i].deptGrade = num + "";
            }
            if (deptInfoArr[i].deptId == currentSelectDeptId) {
                deptInfoArr[i].deptGrade = prevNum + "";
            }
        }
        //进行等级排序
        for (var m = 0; m < deptInfoArr.length; m++) {
            for (var n = 0; n < deptInfoArr.length - 1 - m; n++) {
                if (Number(deptInfoArr[n].deptGrade) > Number(deptInfoArr[n + 1].deptGrade)) {
                    var tempDept = deptInfoArr[n];
                    deptInfoArr[n] = deptInfoArr[n + 1];
                    deptInfoArr[n + 1] = tempDept;
                }
            }
        }
        localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArr));
        $("#deptUlList").empty();
        for (var i = 0; i < deptInfoArr.length; i++) {
            var liStr = "<li id='" + deptInfoArr[i].deptId + "' data-num='" + deptInfoArr[i].deptGrade + "'>" + deptInfoArr[i].deptNm + "</li>";
            $("#deptUlList").append(liStr);
        }
        $("#deptUlList li").click(onlyShowDeptInfo);
        $("#" + currentSelectDeptId).css({ "background-color": "#3EAAE8", "color": "white" });
        showDeptInfoList(currentPageIndex);
    } else {
        fyAlert.msg($("#" + currentSelectDeptId).text() + "已经是最高等级部门！", { icon: 2, animateType: 2 }); return false;
    }

}

//往下调整部门等级
function sortBottomOperate() {
    if (currentSelectDeptId == "") { fyAlert.msg("请先选择一个部门！", { icon: 2, animateType: 2 }); return false; }
    if ($("#" + currentSelectDeptId).next().length != 0) {
        var num = $("#" + currentSelectDeptId).data("num");
        var nextDid = $("#" + currentSelectDeptId).next().attr("id");
        var nextNum = $("#" + currentSelectDeptId).next().data("num");
        for (var i = 0; i < deptInfoArr.length; i++) {
            if (deptInfoArr[i].deptId == nextDid) {
                deptInfoArr[i].deptGrade = num + "";
            }
            if (deptInfoArr[i].deptId == currentSelectDeptId) {
                deptInfoArr[i].deptGrade = nextNum + "";
            }
        }
        //进行等级排序
        for (var m = 0; m < deptInfoArr.length; m++) {
            for (var n = 0; n < deptInfoArr.length - 1 - m; n++) {
                if (Number(deptInfoArr[n].deptGrade) > Number(deptInfoArr[n + 1].deptGrade)) {
                    var tempDept = deptInfoArr[n];
                    deptInfoArr[n] = deptInfoArr[n + 1];
                    deptInfoArr[n + 1] = tempDept;
                }
            }
        }
        localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArr));
        $("#deptUlList").empty();
        for (var i = 0; i < deptInfoArr.length; i++) {
            var liStr = "<li id='" + deptInfoArr[i].deptId + "' data-num='" + deptInfoArr[i].deptGrade + "'>" + deptInfoArr[i].deptNm + "</li>";
            $("#deptUlList").append(liStr);
        }
        $("#deptUlList li").click(onlyShowDeptInfo);
        $("#" + currentSelectDeptId).css({ "background-color": "#3EAAE8", "color": "white" });
        showDeptInfoList(currentPageIndex);
    } else {
        fyAlert.msg($("#" + currentSelectDeptId).text() + "已经是最低等级部门！", { icon: 2, animateType: 2 }); return false;
    }
}