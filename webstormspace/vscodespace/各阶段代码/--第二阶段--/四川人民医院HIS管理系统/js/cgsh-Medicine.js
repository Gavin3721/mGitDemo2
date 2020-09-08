/* 1)药品购入==>
 订单编号，科室，商品名称，数量，价格，总计，申请日期，操作（审核通过，审核不通过；默认显示未审，操作过的显示查看）*/

//这是数组
var dataMedicine = [
    {
        code:"0001",//订单编号
        date:"2020-08-06",//申请日期
        id:"001",//药品编号
        depart:"内科",//科室
        name:"阿莫西林胶囊",//药品名称
        unit:"盒",//药品单位
        bid:"20",//价格
        si:"10",//数量
        total:"200",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0001",//订单编号
        date:"2020-08-06",//申请日期
        id:"002",//药品编号
        depart:"内分泌科",//科室
        name:"丹参",//药品名称
        unit:"盒",//药品单位
        bid:"30",//价格
        si:"10",//数量
        total:"300",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0001",//订单编号
        date:"2020-08-06",//申请日期
        id:"003",//药品编号
        depart:"内科",//科室
        name:"拜阿司匹林",//药品名称
        unit:"盒",//药品单位
        bid:"20",//价格
        si:"10",//数量
        total:"200",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0001",//订单编号
        date:"2020-08-06",//申请日期
        id:"004",//药品编号
        depart:"内科",//科室
        name:"扑尔敏",//药品名称
        unit:"盒",//药品单位
        bid:"50",//价格
        si:"10",//数量
        total:"500",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0001",//订单编号
        date:"2020-08-06",//申请日期
        id:"005",//药品编号
        depart:"眼科",//科室
        name:"新福林滴眼液",//药品名称
        unit:"瓶",//药品单位
        bid:"10",//价格
        si:"10",//数量
        total:"100",//总计
        check:"审核通过"//审核状态
    },


    {
        code:"0002",//订单编号
        date:"2020-08-06",//申请日期
        id:"006",//药品编号
        depart:"耳鼻喉科",//科室
        name:"金嗓子喉片",//药品名称
        unit:"盒",//药品单位
        bid:"15",//价格
        si:"10",//数量
        total:"150",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0002",//订单编号
        date:"2020-08-06",//申请日期
        id:"007",//药品编号
        depart:"内科",//科室
        name:"999感冒灵",//药品名称
        unit:"盒",//药品单位
        bid:"20",//价格
        si:"10",//数量
        total:"200",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0002",//订单编号
        date:"2020-08-06",//申请日期
        id:"008",//药品编号
        depart:"神经内科",//科室
        name:"天麻素",//药品名称
        unit:"瓶",//药品单位
        bid:"80",//价格
        si:"10",//数量
        total:"800",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0002",//订单编号
        date:"2020-08-06",//申请日期
        id:"009",//药品编号
        depart:"血液科",//科室
        name:"洛活喜",//药品名称
        unit:"盒",//药品单位
        bid:"60",//价格
        si:"10",//数量
        total:"600",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0002",//订单编号
        date:"2020-08-06",//申请日期
        id:"010",//药品编号
        depart:"神经内科",//科室
        name:"万爽力",//药品名称
        unit:"瓶",//药品单位
        bid:"50",//价格
        si:"10",//数量
        total:"500",//总计
        check:"审核通过"//审核状态
    },


    {
        code:"0003",//订单编号
        date:"2020-08-06",//申请日期
        id:"011",//药品编号
        depart:"耳鼻喉科",//科室
        name:"西瓜霜",//药品名称
        unit:"盒",//药品单位
        bid:"15",//价格
        si:"10",//数量
        total:"150",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0003",//订单编号
        date:"2020-08-06",//申请日期
        id:"012",//药品编号
        depart:"内科",//科室
        name:"克拉霉素",//药品名称
        unit:"盒",//药品单位
        bid:"15",//价格
        si:"10",//数量
        total:"150",//总计
        check:"审核通过"//审核状态
    },

    {
        code:"0003",//订单编号
        date:"2020-08-06",//申请日期
        id:"013",//药品编号
        depart:"内分泌科",//科室
        name:"舒血宁",//药品名称
        unit:"瓶",//药品单位
        bid:"30",//价格
        si:"10",//数量
        total:"300",//总计
        check:"审核通过"//审核状态
    }
];


//本地存储
var localMedicine=[];

//渲染页面数据
var pageData = [];//每页展示的数据
var tableBody = document.querySelector('#tBody');
var pageBox = document.getElementById("pageBox");

initTable();

//进入页面的初始状态，初始化表格
function initTable() {
    if(localStorage.getItem("realLocalMedicine") == null){
        localStorage.setItem("realLocalMedicine",JSON.stringify(dataMedicine));
        localMedicine = JSON.parse(localStorage.getItem("realLocalMedicine"));
    }else {
        localMedicine = JSON.parse(localStorage.getItem("realLocalMedicine"));
    }

 //默认获取第一页的数据
 getPageData(localMedicine, 1, 6);
 //渲染页面数据
 render(pageData,1,6);
 //渲染分页
 getPage(localMedicine.length, 6);
//}
}
//初始表格
 //页面的数据  pageIndex:页码  numPerPage:每页条数
 function render(pageData,pageIndex,numPerPage) {
  var trData = "";
  for (var i = 0; i < pageData.length; i++) {
   trData += "<tr>" +
   "<td>" + pageData[i].code + "</td>" +
   "<td>" + pageData[i].date + "</td>" +
   "<td>" + pageData[i].id + "</td>" +
   "<td>" + pageData[i].depart + "</td>" +
   "<td>" + pageData[i].name + "</td>" +
   "<td>" + pageData[i].bid + "</td>" +
   "<td>" + pageData[i].si + "</td>" +
   "<td>" + pageData[i].unit + "</td>" +
   "<td>" + pageData[i].total + "</td>" +
   "<td>" + pageData[i].check + "</td>" +
   "<td>" +
   '<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="delBtn btn btn-danger">删除</button>' +
   '<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="modBtn btn btn-warning">修改</button>' +
   '<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="viewBtn btn btn-info">查看</button>' +
   '<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="checkBtn btn btn-primary">审核</button>' +
   "</td>" +
   "</tr>";
  }
     tableBody.innerHTML = trData;
 }

//渲染分页
 //两个参数都是形参  total:共有几条数据 numPerPage:每页显示几条数据(6)
 function getPage(total, numPerPage) {
  var pageNum = Math.ceil(total / numPerPage);
  var lis = " ";
  for (var i = 1; i <= pageNum; i++) {
   if (i == 1) {
    lis += '<li class="active">' + i + "</li>"
   } else {
    lis += "<li>" + i + "</li>"
   }
  }
  pageBox.innerHTML = lis;
 }

//渲染每页数据
 //三个参数都是形参  arr:数组  index:页码的下标  numPerPage:每页显示几条数据(6)
 function getPageData(arr, index, numPerPage) {
  pageData = arr.slice((index - 1) * numPerPage, index * numPerPage)
 }

//切换当前页数
//原生里面获取值除了input用value以外，其余的获取值都用html或者text
$(function () { 
    $(pageBox).on("click","li",function() {
        getPageData(localMedicine,Number($(this).html()),6);
        render(pageData,$(this).html(),6);
        $(this).addClass("active").siblings("li").removeClass("active");
       });
 });

//整体查询药品信息
var inquireYaoMing=$("#inquireYaoMing");
var inquireArr=[];
$("#inquireBtn").click(function() {
    inquireArr=[];
    //console.log(typeof inquireYaoMing.val());//string
    for(var i=0;i<localMedicine.length;i++) {
        if(localMedicine[i].name.indexOf(inquireYaoMing.val() )> -1){
            inquireArr.push(localMedicine[i]);
        }
    }
    /* if(localMedicine[i].name.indexOf(inquireYaoMing.val() <=-1 || inquireYaoMing.val(" "))) {
     alert("输入错误，请输入正确的药品名称");
     break;
     }else {
     inquireArr.push(localMedicine[i]);
     }
     }*/
    inquireYaoMing.val(" ");
    //console.log(inquireArr);
    //渲染第一页的数据
    getPageData(inquireArr,1,6);
    //渲染页面数据
    render(pageData,1,6);
    //渲染分页
    getPage(inquireArr.length,6);
});

//删除药品的模态框
function delOpenDialog() {
    fyAlert.alert({
        title: "删除药品信息",
        drag: true,
        shadowClose: false,
        content: '是否确认删除该条信息？删除后不可修复？',
        btns: {
            '确 定': function (obj) {
                localMedicine.splice(shanChu,1);
                localStorage.setItem("realLocalMedicine",JSON.stringify(localMedicine));
                initTable();
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}

//删除药品
$("#tBody").on("click",".delBtn",function() {
    //console.log($(this).data("index"));
    //console.log(localMedicine);
    shanChu=$(this).data('index');
    delOpenDialog();
});

//修改药品的模态框
function modOpenDialogMod() {
    fyAlert.alert({
        title: "修改药品信息",
        drag: true,
        shadowClose: false,
        content: '<form action="">' +
        '<p>订单编号：<input type="text" id="mod1"/></p>' +
        '<p>申请日期：<input type="text" id="mod2"/></p>' +
        '<p>药品编号：<input type="text" id="mod3"/></p>' +
        '<p style="text-indent: 2em">科室：<input type="text" id="mod4"/></p>' +
        '<p>药品名称：<input type="text" id="mod5"/></p>' +
        '<p>药品单位：<input type="text" id="mod6"/></p>' +
        '<p style="text-indent: 2em">价格：<input type="text" id="mod7"/></p>' +
        '<p style="text-indent: 2em">数量：<input type="text" id="mod8"/></p>' +
        '<p style="text-indent: 2em">总计：<input type="text" id="mod9"/></p>' +
        '</form>',
        btns: {
            '确 定': function (obj) {
                mod();
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}

//修改药品信息
 $("#tBody").on("click",".modBtn",function() {
     //console.log("点击了修改事件");
     modOpenDialogMod();
     //要修改的数据显示在模态框内
     console.log($(this).data("index"));//这里的this指向#modBtn,index代表当前按钮的下标
     $("#mod1").val(localMedicine[$(this).data("index")].code);
     $("#mod2").val(localMedicine[$(this).data("index")].date);
     $("#mod3").val(localMedicine[$(this).data("index")].id);
     $("#mod4").val(localMedicine[$(this).data("index")].depart);
     $("#mod5").val(localMedicine[$(this).data("index")].name);
     $("#mod6").val(localMedicine[$(this).data("index")].unit);
     $("#mod7").val(localMedicine[$(this).data("index")].bid);
     $("#mod8").val(localMedicine[$(this).data("index")].si);
     $("#mod9").val(localMedicine[$(this).data("index")].total);
     newMod = $(this).data("index");
 });

 //确定修改的函数
 function mod() {
     console.log($('.modBtn').data("index")) ;
     localMedicine[newMod].code = $("#mod1").val();
     localMedicine[newMod].date = $("#mod2").val();
     localMedicine[newMod].id = $("#mod3").val();
     localMedicine[newMod].depart = $("#mod4").val();
     localMedicine[newMod].name = $("#mod5").val();
     localMedicine[newMod].unit = $("#mod6").val();
     localMedicine[newMod].bid = $("#mod7").val();
     localMedicine[newMod].si = $("#mod8").val();
     localMedicine[newMod].total = $("#mod9").val();
     localStorage.setItem("realLocalMedicine",JSON.stringify(localMedicine));//本地存储
     initTable();
 }

//查看信息的模态框
function viewOpenDialog() {
    fyAlert.alert({
        title: "查看药品信息",
        drag: true,
        shadowClose: false,
        content:'<form action="">' +
        '<p>订单编号：<input type="text" id="mod1" readonly/></p>' +
        '<p>申请日期：<input type="text" id="mod2" readonly/></p>' +
        '<p>药品编号：<input type="text" id="mod3" readonly/></p>' +
        '<p style="text-indent: 2em">科室：<input type="text" id="mod4" readonly/></p>' +
        '<p>药品名称：<input type="text" id="mod5" readonly/></p>' +
        '<p>药品单位：<input type="text" id="mod6" readonly/></p>' +
        '<p style="text-indent: 2em">价格：<input type="text" id="mod7" readonly/></p>' +
        '<p style="text-indent: 2em">数量：<input type="text" id="mod8" readonly/></p>' +
        '<p style="text-indent: 2em">总计：<input type="text" id="mod9" readonly/></p>' +
        '</form>'
    });
}

//查看药品信息
$("#tBody").on("click",".viewBtn",function() {
    viewOpenDialog();
    //要查看的数据显示在模态框内
    console.log($(this).data("index"));//这里的this指向#viewBtn,index代表当前按钮的下标
    $("#mod1").val(localMedicine[$(this).data("index")].code);
    $("#mod2").val(localMedicine[$(this).data("index")].date);
    $("#mod3").val(localMedicine[$(this).data("index")].id);
    $("#mod4").val(localMedicine[$(this).data("index")].depart);
    $("#mod5").val(localMedicine[$(this).data("index")].name);
    $("#mod6").val(localMedicine[$(this).data("index")].unit);
    $("#mod7").val(localMedicine[$(this).data("index")].bid);
    $("#mod8").val(localMedicine[$(this).data("index")].si);
    $("#mod9").val(localMedicine[$(this).data("index")].total);
});

//审核药品信息的模态框
function checkOpenDialog(index) {
    fyAlert.alert({
        title: "审核药品信息",
        drag: true,
        shadowClose: false,
        content:'确定是否通过审核',
        btns: {
            '审核通过': function (obj) {
                var localData = JSON.parse(localStorage.getItem("realLocalMedicine"));
                localData[index].check = '审核通过';
                localStorage.setItem("realLocalMedicine",JSON.stringify(localData));
                getPageData(localData,1,6);
                //渲染页面数据
                render(pageData,1,6);
                //渲染分页
                getPage(localData.length,6);
                obj.destory();
            },
            '审核未过': function (obj) {
                //var isCheckOut=localStorage.setItem("realLocalMedicine","审核未过");
                var localDataNo = JSON.parse(localStorage.getItem("realLocalMedicine"));
                localDataNo[index].check = '审核未过';
                localStorage.setItem("realLocalMedicine",JSON.stringify(localDataNo));
                getPageData(localDataNo,1,6);
                //渲染页面数据
                render(pageData,1,6);
                //渲染分页
                getPage(localDataNo.length,6);
                obj.destory();
            }
        }
    });
}

//要审核的药品信息
$("#tBody").on("click",".checkBtn",function() {
    checkOpenDialog($(this).data("index"));
    //要查看的数据显示在模态框内
    console.log($(this).data("index"));//这里的this指向#viewBtn,index代表当前按钮的下标
    $("#mod1").val(localMedicine[$(this).data("index")].code);
    $("#mod2").val(localMedicine[$(this).data("index")].date);
    $("#mod3").val(localMedicine[$(this).data("index")].id);
    $("#mod4").val(localMedicine[$(this).data("index")].depart);
    $("#mod5").val(localMedicine[$(this).data("index")].name);
    $("#mod6").val(localMedicine[$(this).data("index")].unit);
    $("#mod7").val(localMedicine[$(this).data("index")].bid);
    $("#mod8").val(localMedicine[$(this).data("index")].si);
    $("#mod9").val(localMedicine[$(this).data("index")].total);
    //newCheckIn = $(this).data("index");
});


