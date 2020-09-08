var showStuNum = 5;//每页展示的数据量
var currentPageNum = 1;//当前的页码
var pageCount = 1;//页码总数
var stuNmStr = '', stuSexStr = '';//搜索条件

$(function () {
    showStuInfoList(currentPageNum);
    searchStuInfoEvent();
    addFenYeBtnEvent();
    updDelStudentEvent();
    addUpdStudentEvent();
    showAddStuModalEvent();
});

//展示学生信息列表
function showStuInfoList(pageNum) {
    mAjax("get", "/studentList", "showStuNum=" + showStuNum + "&currentPageNum=" + pageNum + "&stuNmStr=" + stuNmStr + "&stuSexStr=" + stuSexStr + "", function (resultStr) {
        var result = JSON.parse(resultStr).result;
        pageCount = result.pageCount;
        currentPageNum = pageNum;
        var resultArr = result.data;
        displayFenYeBtns(pageCount);
        $("#mTbody").empty();
        $.each(resultArr, function (index, item) {
            var trStr = `
                <tr>
                    <td><input type="checkbox" /></td>
                    <td id='sid_${resultArr[index].id}'>${resultArr[index].s_id}</td>
                    <td id='snm_${resultArr[index].id}'>${resultArr[index].s_name}</td>
                    <td id='sage_${resultArr[index].id}'>${resultArr[index].s_age}</td>
                    <td id='ssex_${resultArr[index].id}'>${resultArr[index].s_sex}</td>
                    <td>
                        <span class='glyphicon glyphicon-pencil updStu' data-stuid='${resultArr[index].id}'></span>&nbsp;&nbsp;<span class='glyphicon glyphicon-trash delStu' data-stuid='${resultArr[index].id}'></span>
                    </td>
                </tr>`;
            $("#mTbody").append(trStr);
        });
    });
}

//生成分页的下标
function displayFenYeBtns(num) {
    $("#fenyeBtns").empty();
    for (var i = 0; i < num; i++) {
        var btnStr = "";
        if (currentPageNum == (i + 1)) {
            btnStr = "<button type='button' class='btn btn-primary btn-sm'>" + (i + 1) + "</button>";
        } else {
            btnStr = "<button type='button' class='btn btn-default btn-sm'>" + (i + 1) + "</button>";
        }
        $("#fenyeBtns").append(btnStr);
    }
}

//给分页的按钮添加点击事件
function addFenYeBtnEvent() {
    $("#fenyeBtns").on("click", "button", function () {
        var num = $(this).text().trim();
        showStuInfoList(num);
    });
}

//添加搜索学生信息功能
function searchStuInfoEvent() {
    $("#searchBtn").click(function () {
        var stu_Nm = $("#stu_Nm").val().trim();
        var stu_Sex = $("#stu_Sex").val().trim();
        stuNmStr = stu_Nm;
        stuSexStr = stu_Sex;
        showStuInfoList(1);
    });
}

//添加修改和删除学生信息事件
function updDelStudentEvent() {
    $("#mTbody").on("click", ".updStu", function () {
        $("#myModal").modal("show");
        var stuId = $(this).data("stuid");
        $("#keyId").val(stuId);
        $("#stuId").val($("#sid_" + stuId).text().trim());
        $("#stuNm").val($("#snm_" + stuId).text().trim());
        $("#stuAge").val($("#sage_" + stuId).text().trim());
        $("#stuSex").val($("#ssex_" + stuId).text().trim());
    });

    $("#mTbody").on("click", ".delStu", function () {
        var stuId = $(this).data("stuid");
        if (confirm("是否确认删除该条数据？")) {
            delStuentInfo(stuId);
            showStuInfoList(currentPageNum);
        }
    });
}

//删除学生信息操作
function delStuentInfo(stuId) {
    mAjax("get", "/delStudent", "stuId=" + stuId + "", function (resultStr) {
        var result = JSON.parse(resultStr).result;
        if (result.affectedRows == 1) {
            alert("删除成功！");
        } else {
            alert("删除失败");
        }
    });
}

//添加学生信息弹框出现
function showAddStuModalEvent() {
    $("#addStudentInfo").click(function () {
        $("#stuId").val("");
        $("#stuNm").val("");
        $("#stuAge").val("");
        $("#stuSex").val("");
        $("#keyId").val("");
        $('#myModal').modal('show');
    });
}

//添加或修改学生信息操作
function addUpdStudentEvent() {
    $("#addUpdStudentBtn").click(function () {
        var stuId = $("#stuId").val().trim();
        var stuNm = $("#stuNm").val().trim();
        var stuAge = $("#stuAge").val().trim();
        var stuSex = $("#stuSex").val().trim();
        var keyId = $("#keyId").val().trim();
        if (keyId != '') {
            //修改
            mAjax("post", "/updStudent", "keyId=" + keyId + "&sid=" + stuId + "&sname=" + stuNm + "&sage=" + stuAge + "&ssex=" + stuSex, function (resultStr) {
                var result = JSON.parse(resultStr).result;
                console.log(result);
                if (result.affectedRows == 1) {
                    alert("修改成功！");
                } else {
                    alert("修改失败");
                }
            });
        } else {
            //新增
            mAjax("post", "/addStudent", "sid=" + stuId + "&sname=" + stuNm + "&sage=" + stuAge + "&ssex=" + stuSex, function (resultStr) {
                var result = JSON.parse(resultStr).result;
                if (result.affectedRows == 1) {
                    alert("添加成功！");
                } else {
                    alert("添加失败");
                }
            });
        }
        showStuInfoList(currentPageNum);
        $("#keyId").val("");
        $("#myModal").modal("hide");
    });
}

//封装ajax
function mAjax(method, api, paramStr, fun) {
    //1、xhr对象
    var xhr;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Mcrosoft.XMLHTTP");
    }

    //2、open设置请求
    if (method.toLowerCase() == "get") {
        xhr.open("get", api + "?" + paramStr, true);
        //3、发送请求
        xhr.send();
    } else {
        xhr.open("post", api, true);
        //post请求下需要配置请求头信息
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //post请求下，要传递的参数放这
        xhr.send(paramStr);
    }

    //4、设置事件，接收响应的数据
    xhr.onreadystatechange = function () {
        /* 0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪 */
        if (xhr.readyState == 4 && xhr.status == 200) {
            fun(xhr.responseText);
        }
    }
}