//存储所有的学生信息
var studentsInfo = [
    { id: "1", name: "张三", age: "23", sex: "男" },
    { id: "2", name: "李四", age: "18", sex: "女" },
    { id: "3", name: "王五", age: "23", sex: "男" },
    { id: "4", name: "赵六", age: "25", sex: "男" },
    { id: "5", name: "陈七", age: "22", sex: "女" },
    { id: "6", name: "黄八", age: "23", sex: "男" },
    { id: "7", name: "何九", age: "19", sex: "男" },
    { id: "8", name: "汤姆", age: "23", sex: "女" },
    { id: "9", name: "杰瑞", age: "23", sex: "男" },
    { id: "10", name: "鲍勃", age: "23", sex: "男" },
    { id: "11", name: "爱丽丝", age: "20", sex: "女" },
    { id: "12", name: "露西", age: "23", sex: "女" }
];


var showStuNum = 5;//每页展示的数据量
var currentPageNum = 1;//当前的页码
var pageCount = 1;//页码总数

$(function () {
    showStuInfoList(currentPageNum);
    addFenYeBtnEvent();
    updDelStudentEvent();
    addUpdStudentEvent();
    showAddStuModalEvent();
});

//展示学生信息列表
function showStuInfoList(pageNum) {
    //总页数
    pageCount = Math.ceil(studentsInfo.length / showStuNum);
    //确保删除了最后一页的最后一条数据，页面显示到最后一页
    if (pageNum > pageCount) {
        pageNum = pageCount;
    }
    currentPageNum = pageNum;
    //从数组当中取值的起始索引值
    var beginIndex = (currentPageNum - 1) * showStuNum;
    //取出当页实际需要显示的数据
    var resultArr = studentsInfo.slice(beginIndex, beginIndex + showStuNum);

    displayFenYeBtns(pageCount);
    $("#mTbody").empty();
    //数组的原生forEach
    /* resultArr.forEach(function (item, index) {
        var trStr = `
            <tr>
                <td><input type="checkbox" /></td>
                <td>${resultArr[index].id}</td>
                <td>${resultArr[index].name}</td>
                <td>${resultArr[index].age}</td>
                <td>${resultArr[index].sex}</td>
                <td><span class="glyphicon glyphicon-trash"></span></td>
            </tr>`;
        $("#mTbody").append(trStr);
    }); */

    //数组的原生map
    /* resultArr.map(function (item) {
        var trStr = `
            <tr>
                <td><input type="checkbox" /></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.sex}</td>
                <td><span class="glyphicon glyphicon-trash"></span></td>
            </tr>`;
        $("#mTbody").append(trStr);
    }); */

    /* $.map(resultArr, function (item) {
        var trStr = `
            <tr>
                <td><input type="checkbox" /></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.sex}</td>
                <td><span class="glyphicon glyphicon-trash"></span></td>
            </tr>`;
        $("#mTbody").append(trStr);
    }); */

    $.each(resultArr, function (index, item) {
        var trStr = `
            <tr>
                <td><input type="checkbox" /></td>
                <td>${resultArr[index].id}</td>
                <td>${resultArr[index].name}</td>
                <td>${resultArr[index].age}</td>
                <td>${resultArr[index].sex}</td>
                <td>
                    <span class='glyphicon glyphicon-pencil updStu' data-stuid='${resultArr[index].id}'></span>&nbsp;&nbsp;<span class='glyphicon glyphicon-trash delStu' data-stuid='${resultArr[index].id}'></span>
                </td>
            </tr>`;
        $("#mTbody").append(trStr);
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


//添加修改和删除学生信息事件
function updDelStudentEvent() {
    $("#mTbody").on("click", ".updStu", function () {
        $("#myModal").modal("show");
        var stuId = $(this).data("stuid");
        $("#stuId").attr("readonly", "readonly");
        studentsInfo.map(function (item) {
            if (item.id == stuId) {
                $("#stuId").val(item.id);
                $("#stuNm").val(item.name);
                $("#stuAge").val(item.age);
                $("#stuSex").val(item.sex);
            }
        });
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
    studentsInfo.forEach(function (item, index) {
        if (item.id == stuId) {
            studentsInfo.splice(index, 1);
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
        $("#stuId").removeAttr("readonly");
        $('#myModal').modal('show');
    });
}

//添加或修改学生信息操作
function addUpdStudentEvent() {
    $("#addUpdStudentBtn").click(function () {
        var stuId = $("#stuId").val();
        var stuNm = $("#stuNm").val();
        var stuAge = $("#stuAge").val();
        var stuSex = $("#stuSex").val();
        if ($("#stuId").attr("readonly")) {
            //修改
            $.map(studentsInfo, function (item) {
                if (item.id == stuId) {
                    item.name = stuNm;
                    item.age = stuAge;
                    item.sex = stuSex;
                }
            });
        } else {
            //新增
            var obj = { id: stuId, name: stuNm, age: stuAge, sex: stuSex };
            studentsInfo.push(obj);
        }
        showStuInfoList(currentPageNum);
        $("#myModal").modal("hide");
    });
}