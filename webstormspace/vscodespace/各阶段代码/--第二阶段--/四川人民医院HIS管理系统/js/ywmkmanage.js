var idArr = [],//存储树状图每个节点的id
    dataArrJson = [],//存放数据集合
    lastSelectTime = null;//最后一次触发时间

$(document).ready(function () {
    initLocalStorageData();//初始化本地数据
    analysisShowTreeData();
    resetModelSelect();
    showModelList();

    $("#createTime").val(getMTime()), $("#creTime").val(getMTime());
    $("#createTime,#creTime").css("background-color", "#EEEEEE");
    $("#saveInfo").click(addModelInfo);
    $("#resetInfo").click(resetTdInfo);
    $("#saveInfo2").click(addModelInfo2);
    $("#resetInfo2").click(resetTdInfo2);

});


//解析并显示树状图数据
function analysisShowTreeData() {
    idArr = [], dataArrJson = [];
    //等级排序
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

    $('#moKuaiShow').treeview({
        color: "#428bca",
        data: dataArrJson
    });

    //自定义树状图双击事件
    //节点选中时触发
    $('#moKuaiShow').on('nodeSelected', function (event, data) {
        clickNode(event, data)
    });
    //节点取消选中时触发
    $('#moKuaiShow').on('nodeUnselected', function (event, data) {
        clickNode(event, data)
    });
}

//树状图的双击事件
function clickNode(event, data) {
    var time = new Date().getTime();
    var t = time - lastSelectTime;
    if (t < 400) {
        //双击可查看修改信息
        var nodeId = data.nodeId;
        console.log(idArr[nodeId]);
        if (idArr[nodeId].indexOf("_") == -1) {
            updModelInfo(idArr[nodeId]);
        } else {
            updItemInfo(idArr[nodeId]);
        }
    }
    lastSelectTime = time;
}

//新增模块
function addModelInfo() {
    var modelNm = $("#modelNm").val();
    var isUse = $("#isUse").val();
    var createTime = $("#createTime").val();
    var details = $("#details").val();
    if (modelNm == '') { fyAlert.msg("模块名称不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (isExistModelNm('', modelNm)) { fyAlert.msg("该模块名已存在！", { icon: 2, animateType: 2 }); return false; }

    var id = (getMaxModelId() + 1) + "";
    var grade = (getMaxModelGrade() + 1) + "";
    var obj = {
        "modelId": id,
        "modelNm": modelNm,
        "isUse": isUse,
        "modelGrade": grade,
        "createTime": createTime,
        "details": details,
        "itemArr": []
    };
    yeWuMoKuaiArr.push(obj);
    localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
    analysisShowTreeData();
    showModelList();
    resetTdInfo();
    fyAlert.msg("添加成功", { icon: 1, animateType: 1 });
}

//刷新父模块下拉框
function resetModelSelect() {
    $("#prevModel").empty();
    var str = "<option value='' selected='selected'>--请选择--</option>";
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        str += "<option value='" + yeWuMoKuaiArr[i].modelId + "'>" + yeWuMoKuaiArr[i].modelNm + "</option>";
    }
    $("#prevModel").html(str);
}

//检查模块名是否存在
function isExistModelNm(modelId, modelNm) {
    var result = false;
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (modelId == '') {
            if (yeWuMoKuaiArr[i].modelNm == modelNm) {
                result = true;
                break;
            }
        } else {
            if (yeWuMoKuaiArr[i].modelId != modelId && yeWuMoKuaiArr[i].modelNm == modelNm) {
                result = true;
                break;
            }
        }
    }
    return result;
}

//获取最大的模块编号
function getMaxModelId() {
    var tempArr = [];
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        tempArr.push(Number(yeWuMoKuaiArr[i].modelId));
    }
    if (tempArr.length == 0) {
        return 110;
    } else {
        return Math.max.apply(null, tempArr);
    }
}

//获取最大的模块等级
function getMaxModelGrade() {
    var tempArr = [];
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        tempArr.push(Number(yeWuMoKuaiArr[i].modelGrade));
    }
    if (tempArr.length == 0) {
        return 0;
    } else {
        return Math.max.apply(null, tempArr);
    }
}

//重置表格
function resetTdInfo() {
    $("#modelNm").val("");
    $("#isUse").val("1");
    $("#createTime").val(getMTime());
    $("#details").val("");
    resetModelSelect();
}

//新增模块子项
function addModelInfo2() {
    var prevModel = $("#prevModel").val();
    var itemNm = $("#itemNm").val();
    var isUseItem = $("#isUseItem").val();
    var creTime = $("#creTime").val();
    var pageUrl = $("#pageUrl").val();
    if (prevModel == '') { fyAlert.msg("父模块名不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (itemNm == '') { fyAlert.msg("子项名称不能为空！", { icon: 2, animateType: 2 }); return false; }
    if (isExistItemNm(prevModel, itemNm, '')) { fyAlert.msg("该子项名已存在！", { icon: 2, animateType: 2 }); return false; }
    if (pageUrl == '') { fyAlert.msg("页面URL不能为空！", { icon: 2, animateType: 2 }); return false; }

    var id = prevModel + "_" + (getMaxItemId(prevModel) + 1);
    var obj = {
        "itemId": id,
        "itemNm": itemNm,
        "isUse": isUseItem,
        "createTime": creTime,
        "url": pageUrl
    };
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == prevModel) {
            yeWuMoKuaiArr[i].itemArr.push(obj);
            break;
        }
    }
    localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
    analysisShowTreeData();
    showModelList();
    resetTdInfo2();
    fyAlert.msg("添加成功", { icon: 1, animateType: 1 });
}

//是否已存在子项名称
function isExistItemNm(modelId, itemNm, itemId) {
    var result = false;
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == modelId) {
            for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
                if (yeWuMoKuaiArr[i].itemArr[j].itemId != itemId && yeWuMoKuaiArr[i].itemArr[j].itemNm == itemNm) {
                    result = true;
                    break;
                }
            }
            break;
        }
    }
    return result;
}


//获取当前模块最大的子项编号
function getMaxItemId(modelId) {
    var tempArr = [];
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == modelId) {
            for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
                tempArr.push(yeWuMoKuaiArr[i].itemArr[j].itemId.split("_")[1]);
            }
            break;
        }
    }
    if (tempArr.length == 0) {
        return 0;
    } else {
        return Math.max.apply(null, tempArr);
    }
}

//重置子项表格
function resetTdInfo2() {
    $("#prevModel").val("");
    $("#itemNm").val("");
    $("#isUseItem").val("1");
    $("#creTime").val(getMTime());
    $("#pageUrl").val("");
}

//展示模块列表
function showModelList() {
    $("#showTbody").empty();
    //进行等级排序
    for (var m = 0; m < yeWuMoKuaiArr.length; m++) {
        for (var n = 0; n < yeWuMoKuaiArr.length - 1 - m; n++) {
            if (Number(yeWuMoKuaiArr[n].modelGrade) > Number(yeWuMoKuaiArr[n + 1].modelGrade)) {
                var temp = yeWuMoKuaiArr[n];
                yeWuMoKuaiArr[n] = yeWuMoKuaiArr[n + 1];
                yeWuMoKuaiArr[n + 1] = temp;
            }
        }
    }
    var tabStr = "";
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        var count = 1, tempStr = "";
        if (yeWuMoKuaiArr[i].itemArr.length != 0) {
            count = yeWuMoKuaiArr[i].itemArr.length;
        }
        tabStr = tabStr + "<tr><td rowspan='" + count + "'>" + (i + 1) + "</td><td rowspan='" + count + "'>" + yeWuMoKuaiArr[i].modelNm + "</td>";
        if (yeWuMoKuaiArr[i].itemArr.length == 0) {
            tabStr += "<td>X</td><td>X</td><td>X</td>";
        } else {
            for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
                if (j == 0) {
                    tabStr = tabStr + "<td>" + yeWuMoKuaiArr[i].itemArr[j].itemNm + "</td><td>" + yeWuMoKuaiArr[i].itemArr[j].url + "</td><td><a href='javascript:;' onclick=\"updItemInfo('" + yeWuMoKuaiArr[i].itemArr[j].itemId + "')\">修改</a><br /><a href='javascript:;' onclick=\"deleItemInfo('" + yeWuMoKuaiArr[i].itemArr[j].itemId + "')\">删除</a></td>";
                } else {
                    tempStr = tempStr + "<tr><td>" + yeWuMoKuaiArr[i].itemArr[j].itemNm + "</td><td>" + yeWuMoKuaiArr[i].itemArr[j].url + "</td><td><a href='javascript:;' onclick=\"updItemInfo('" + yeWuMoKuaiArr[i].itemArr[j].itemId + "')\">修改</a><br /><a href='javascript:;' onclick=\"deleItemInfo('" + yeWuMoKuaiArr[i].itemArr[j].itemId + "')\">删除</a></td></tr>";
                }
            }
        }
        if (i == 0) {
            sortStr = "<a id='n_" + yeWuMoKuaiArr[i].modelId + "' href='javascript:;' data-grade='" + yeWuMoKuaiArr[i].modelGrade + "' onclick=\"nextMove('" + yeWuMoKuaiArr[i].modelId + "','" + yeWuMoKuaiArr[i + 1].modelId + "')\">向下移</a>";
        } else if (i == yeWuMoKuaiArr.length - 1) {
            sortStr = "<a id='p_" + yeWuMoKuaiArr[i].modelId + "' href='javascript:;' data-grade='" + yeWuMoKuaiArr[i].modelGrade + "' onclick=\"preMove('" + yeWuMoKuaiArr[i].modelId + "','" + yeWuMoKuaiArr[i - 1].modelId + "')\">向上移</a>";
        } else {
            sortStr = "<a id='p_" + yeWuMoKuaiArr[i].modelId + "' href='javascript:;' data-grade='" + yeWuMoKuaiArr[i].modelGrade + "' onclick=\"preMove('" + yeWuMoKuaiArr[i].modelId + "','" + yeWuMoKuaiArr[i - 1].modelId + "')\">向上移</a><br /><a id='n_" + yeWuMoKuaiArr[i].modelId + "' href='javascript:;' data-grade='" + yeWuMoKuaiArr[i].modelGrade + "' onclick=\"nextMove('" + yeWuMoKuaiArr[i].modelId + "','" + yeWuMoKuaiArr[i + 1].modelId + "')\">向下移</a>";
        }
        tabStr = tabStr + "<td rowspan='" + count + "'><a href='javascript:;' onclick=\"updModelInfo('" + yeWuMoKuaiArr[i].modelId + "')\">修改</a><br /><a href='javascript:;' onclick=\"delModelInfo('" + yeWuMoKuaiArr[i].modelId + "')\">删除</a><br />" + sortStr + "</td></tr>";
        tabStr += tempStr;
    }
    $("#showTbody").html(tabStr);
}

//修改模块信息
function updModelInfo(modelId) {
    var obj;
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == modelId) {
            obj = yeWuMoKuaiArr[i];
            break;
        }
    }
    var tableStr = "<table class='table1' cellspacing='0' cellspadding='0'>";
    tableStr += "<tr><td>模块名称：</td><td><input id='modelNm_n' name='modelNm_n' type='text' class='minput' value='" + obj.modelNm + "' /></td></tr>";
    tableStr += "<tr><td>是否启用：</td><td><select id='isUse_n' name='isUse_n' class='minput'><option value='1' selected='selected'>是</option><option value='0'>否</option></select></tr>";
    tableStr += "<tr><td>创建时间：</td><td><input id='createTime_n' name='createTime_n' readonly='readonly' type='text' class='minput' value='" + obj.createTime + "' /></td></tr>";
    tableStr += "<tr><td>备&nbsp;&nbsp;注：</td><td><input id='details_n' name='details_n' type='text' class='minput' value='" + obj.details + "' /></td></tr>";
    tableStr += "</table>";
    tableStr += "<script>$('#isUse_n').val('" + obj.isUse + "');$('#createTime_n').css('background-color','#EEEEEE')</script>";

    fyAlert.alert({
        title: "修改信息",
        /* drag: true, */
        shadowClose: false,
        area: ['450px', '400px'],
        content: tableStr,//内容
        btns: {
            '保 存': function (obj) {
                var modelNm = $("#modelNm_n").val().trim();
                var isUse = $("#isUse_n").val().trim();
                var createTime = $("#createTime_n").val().trim();
                var details = $("#details_n").val().trim();
                if (modelNm == '') { fyAlert.msg("模块名称不能为空！", { icon: 2, animateType: 2 }); return false; }
                if (isExistModelNm(modelId, modelNm)) { fyAlert.msg("该模块名已存在！", { icon: 2, animateType: 2 }); return false; }
                for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
                    if (yeWuMoKuaiArr[i].modelId == modelId) {
                        model = yeWuMoKuaiArr[i];
                        model.modelNm = modelNm;
                        model.isUse = isUse;
                        model.createTime = createTime;
                        model.details = details;
                        break;
                    }
                }
                fyAlert.msg("修改成功", { icon: 1, animateType: 1 });
                localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
                analysisShowTreeData();
                showModelList();
                resetTdInfo();
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}


//删除模块
function delModelInfo(modelId) {
    fyAlert.alert({
        title: "提 示",
        drag: true,
        shadowClose: false,
        content: '是否确认刪除该模块及其子项？',
        btns: {
            '确 定': function (obj) {
                for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
                    if (yeWuMoKuaiArr[i].modelId == modelId) {
                        yeWuMoKuaiArr.splice(i, 1);
                        fyAlert.msg("删除成功", { icon: 1, animateType: 1 });
                        localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
                        analysisShowTreeData();
                        showModelList();
                        resetTdInfo();
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


//往上排序
function preMove(modelId, prevId) {
    var grade = $("#p_" + modelId).data("grade");
    var prevGrade = $("[id*='" + prevId + "']").data("grade");
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == prevId) {
            yeWuMoKuaiArr[i].modelGrade = grade + "";
        }
        if (yeWuMoKuaiArr[i].modelId == modelId) {
            yeWuMoKuaiArr[i].modelGrade = prevGrade + "";
        }
    }
    localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
    analysisShowTreeData();
    showModelList();
    resetTdInfo();
}

//往下排序
function nextMove(modelId, nextId) {
    var grade = $("#n_" + modelId).data("grade");
    var nextGrade = $("[id*='" + nextId + "']").data("grade");
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == modelId) {
            yeWuMoKuaiArr[i].modelGrade = nextGrade + "";
        }
        if (yeWuMoKuaiArr[i].modelId == nextId) {
            yeWuMoKuaiArr[i].modelGrade = grade + "";
        }
    }
    localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
    analysisShowTreeData();
    showModelList();
    resetTdInfo();
}


//修改子项信息
function updItemInfo(itemId) {
    var modelNm = '', obj;
    var modelId = itemId.split("_")[0];
    for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
        if (yeWuMoKuaiArr[i].modelId == modelId) {
            modelNm = yeWuMoKuaiArr[i].modelNm;
            for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
                if (yeWuMoKuaiArr[i].itemArr[j].itemId == itemId) {
                    obj = yeWuMoKuaiArr[i].itemArr[j];
                    break;
                }
            }
            break;
        }
    }
    var tableStr = "<table class='table1' cellspacing='0' cellspadding='0'>";
    tableStr += "<tr><td>父模块名：</td><td>" + modelNm + "</td></tr>";
    tableStr += "<tr><td>子项名称：</td><td><input id='itemNm_n' name='itemNm_n' type='text' class='minput' value='" + obj.itemNm + "' /></td></tr>";
    tableStr += "<tr><td>是否启用：</td><td><select id='isUseItem_n' name='isUseItem_n' class='minput'><option value='1' selected='selected'>是</option><option value='0'>否</option></select></tr>";
    tableStr += "<tr><td>创建时间：</td><td><input id='creTime_n' name='creTime_n' readonly='readonly' type='text' class='minput' value='" + obj.createTime + "' /></td></tr>";
    tableStr += "<tr><td>页面URL：</td><td><input id='pageUrl_n' name='pageUrl_n' type='text' class='minput' value='" + obj.url + "' /></td></tr>";
    tableStr += "</table>";
    tableStr += "<script>$('#isUseItem_n').val('" + obj.isUse + "');$('#creTime_n').css('background-color','#EEEEEE')</script>";

    fyAlert.alert({
        title: "修改信息",
        shadowClose: false,
        area: ['450px', '400px'],
        content: tableStr,//内容
        btns: {
            '保 存': function (obj) {
                var itemNm = $("#itemNm_n").val();
                var isUseItem = $("#isUseItem_n").val();
                var pageUrl = $("#pageUrl_n").val();
                if (itemNm == '') { fyAlert.msg("子项名称不能为空！", { icon: 2, animateType: 2 }); return false; }
                if (isExistItemNm(modelId, itemNm, itemId)) { fyAlert.msg("该子项名已存在！", { icon: 2, animateType: 2 }); return false; }
                if (pageUrl == '') { fyAlert.msg("页面URL不能为空！", { icon: 2, animateType: 2 }); return false; }

                for (var k = 0; k < yeWuMoKuaiArr.length; k++) {
                    if (yeWuMoKuaiArr[k].modelId == modelId) {
                        if (isUseItem == "1") {
                            yeWuMoKuaiArr[k].isUse = "1";
                        }
                        for (var l = 0; l < yeWuMoKuaiArr[k].itemArr.length; l++) {
                            if (yeWuMoKuaiArr[k].itemArr[l].itemId == itemId) {
                                yeWuMoKuaiArr[k].itemArr[l].itemNm = itemNm;
                                yeWuMoKuaiArr[k].itemArr[l].isUse = isUseItem;
                                yeWuMoKuaiArr[k].itemArr[l].url = pageUrl;
                                break;
                            }
                        }
                        break;
                    }
                }
                fyAlert.msg("修改成功", { icon: 1, animateType: 1 });
                localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
                analysisShowTreeData();
                showModelList();
                resetTdInfo();
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}

//删除子项信息
function deleItemInfo(itemId) {
    fyAlert.alert({
        title: "提 示",
        drag: true,
        shadowClose: false,
        content: '是否确认刪除该子项？',
        btns: {
            '确 定': function (obj) {
                var modelId = itemId.split("_")[0];
                for (var i = 0; i < yeWuMoKuaiArr.length; i++) {
                    if (yeWuMoKuaiArr[i].modelId == modelId) {
                        for (var j = 0; j < yeWuMoKuaiArr[i].itemArr.length; j++) {
                            console.log("bb__" + yeWuMoKuaiArr[i].itemArr[j].itemId + "  " + itemId);
                            if (yeWuMoKuaiArr[i].itemArr[j].itemId == itemId) {
                                console.log("cc__" + yeWuMoKuaiArr[i].itemArr[j].itemId + "  " + itemId);
                                yeWuMoKuaiArr[i].itemArr.splice(j, 1);
                                fyAlert.msg("删除成功", { icon: 1, animateType: 1 });
                                localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArr));
                                analysisShowTreeData();
                                showModelList();
                                resetTdInfo();
                                break;
                            }
                        }
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