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
   /*'<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="checkBtn btn btn-primary">---</button>' +*/
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
$(pageBox).on("click","li",function() {
    getPageData(localMedicine,Number($(this).html()),6);
    render(pageData,$(this).html(),6);
    $(this).addClass("active").siblings("li").removeClass("active");
   });

//这是全局变量
    var danHao=$("#danHao");
    var riQi=$("#riQi");
    var yaoBian=$("#yaoBian");
    var keShi=$("#keShi");
    var yaoMing=$("#yaoMing");
    var danWei=$("#danWei");
    var jiaGe=$("#jiaGe");
    var shuLiang=$("#shuLiang");
    var zongJi=$("#zongJi");


//输入价格和数量后自动算出总计
$(".inPut").on("input",function() {
    if(jiaGe.val() && shuLiang.val()) {
        var jinE=jiaGe.val() * shuLiang.val();
        zongJi.val(jinE);
    }
});

//添加功能
var addBtn=$("#addBtn");
addBtn.click(function() {
    var regDanHao=/^[0-9]\d{3}$/;
    if( danHao.val() != 0 &&
        riQi.val() != 0 &&
        yaoBian.val() != 0 &&
        keShi.val() != 0 &&
        yaoMing.val() != 0 &&
        danWei.val() != 0 &&
        jiaGe.val() != 0 &&
        shuLiang.val() != 0 &&
        zongJi.val() != 0
    ){
        if(regDanHao.test(danHao.val())==true)
        {
            localMedicine.unshift( {
                code:danHao.val(),
                date:riQi.val(),
                id:yaoBian.val(),
                depart:keShi.val(),
                name:yaoMing.val(),
                unit:danWei.val(),
                bid:jiaGe.val(),
                si:shuLiang.val(),
                total:(jiaGe.val()) * (shuLiang.val()),
                check: '未审核'
        });
    }else {
            fyAlert.msg("订单编号不符合规范，请重新输入！", { icon: 2, animateType: 2 }); return false;
        }
        localStorage.setItem("realLocalMedicine",JSON.stringify(localMedicine));
        danHao.val('');
        riQi.val('');
        yaoBian.val('');
        keShi.val('');
        yaoMing.val('');
        danWei.val('');
        jiaGe.val('');
        shuLiang.val('');
        zongJi.val('');
        //console.log(localMedicine);
        //数据初始化

    }else {
        //alert("输入内容不正确，请重新输入");
        fyAlert.msg("输入内容不正确，请重新输入！", { icon: 2, animateType: 2 }); return false;
        //break;
    }
    initTable();
});

//重置正在添加但还未新增的药品
var resetBtn = $("#resetBtn");
$(resetBtn).click(function() {
    danHao.val('');
    riQi.val('');
    yaoBian.val('');
    keShi.val('');
    yaoMing.val('');
    danWei.val('');
    jiaGe.val('');
    shuLiang.val('');
    zongJi.val('');
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
        // '<p style="text-indent: 2em">审核状态：<input type="text" id="mod10"/></p>' +
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
    //  $("#mod10").val(localMedicine[$(this).data("index")].total);
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
    //  localMedicine[newMod].total = $("#mod10").val();
     localStorage.setItem("realLocalMedicine",JSON.stringify(localMedicine));//本地存储
     initTable();
 }

//查看信息的模态框
function viewOpenDialog() {
    fyAlert.alert({
        title: "退出",
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
        // '<p style="text-indent: 2em">审核状态：<input type="text" id="mod10" readonly/></p>' +
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

//审核状态的模态框
/*function checkOpenDialog() {
    var str ="<div>"++"</div>";

    fyAlert.alert({
        title: "审核状态",
        drag: true,
        shadowClose: false,
        content:str
    });
}*/
