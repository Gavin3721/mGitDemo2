/**
 * Created by Administrator on 2020/8/8 0008.
 */
/**
 * Created by Administrator on 2020/8/4 0004.
 */
var hzArr=[{
    idCard:'101010',
    zw:'设计师',
    jiehun:'否',
    age:'23',
    name:'小海',
    sex:'男'
}];


var patientArr=[{
    patientKS:'打喷嚏，流鼻涕，咳嗽',
    doctorZD:'普通感冒',
    suggest:'多喝水',
    caseH:'无',
    allergyH:'无'
},
    {
        patientKS:'嗓子不舒服',
        doctorZD:'普通感冒',
        suggest:'多喝水',
        caseH:'无',
        allergyH:'无'
    },
    {
        patientKS:'肚子疼',
        doctorZD:'普通感冒',
        suggest:'多喝水',
        caseH:'无',
        allergyH:'无'
    },
    {
        patientKS:'额头及身体发热',
        doctorZD:'普通发烧',
        suggest:'多喝水',
        caseH:'无',
        allergyH:'无'
    }
];

var datas = [
    {
        saleId:'1111',
        id:'001',
        name:'金嗓子喉片',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'002',
        name:'西瓜霜',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'003',
        name:'999感冒灵',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'004',
        name:'三九胃泰',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'005',
        name:'碧生常润茶',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'006',
        name:'维C银翘片',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'007',
        name:'金嗓子喉片',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'008',
        name:'西瓜霜',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    },
    {
        saleId:'1111',
        id:'009',
        name:'999感冒灵',
        sale:'5',
        guiGe:'2g*20',
        danWei:'支',
        si:'1',
        numKF:'1',
        xiaoJi:'5.0',
        riqi:'2020-08-11'
    }

];

var localyaopin=[];//本地数据
var pageData = [];
//var btn2=document.getElementById('btn2');
var tableBody = document.querySelector('#personInfo tbody');
var pageBox = document.querySelector('#pageBox');

initTable();
function initTable(){//进入页面的初始状态，初始化表格
    //默认获取第一页的数据
    if(localStorage.getItem('yaopin')==null){
        localStorage.setItem('yaopin',JSON.stringify(datas));//把初始的假数据存储
        localyaopin=JSON.parse(localStorage.getItem('yaopin'));
    }else{
        localyaopin=JSON.parse(localStorage.getItem('yaopin'));
    }

    getPageData(localyaopin,1,5);
    //console.log(localyaopin);
    //渲染页面数据
    render(pageData,1,5);
    //渲染分页
    getPage(localyaopin.length,5);
}
function render(pageData,pageIndex,numPerPage){
    var trData = '';
    for(var i =0;i<pageData.length;i++){
        trData += "<tr align='center'>" +
        "<td>" +

        "<input type='checkbox' class='inputs'  data-index="+i+">"+

        "</td>" +
        "<td>"+pageData[i].saleId+"</td>" +
        "<td>"+pageData[i].id+"</td>" +
        "<td>"+pageData[i].name+"</td>" +
        "<td>"+pageData[i].sale+"</td>" +
        "<td>"+pageData[i].guiGe+"</td>" +
        "<td>"+pageData[i].danWei+"</td>" +
        "<td>"+pageData[i].si+"</td>" +
        "<td>"+pageData[i].numKF+"</td>" +
        "<td>"+pageData[i].xiaoJi+"</td>" +
        "<td>"+pageData[i].riqi+"</td>" +
        "<td>"+
        '<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="delBtn btn btn-danger">删除</button>' +
        '<button type="button" data-index="'+((pageIndex-1)*numPerPage+i)+'" class="xgBtn btn btn-warning">修改</button>' +
        "</td>"+

            /*"<td><button onclick='delAlert()' class='delBtn' data-index='"+i+"'>删除</button>" +
             "<button id='xgBtn' style='margin-left: 20px' data-index='"+i+"'>修改</button></td>" +*/
        "</tr>";
        console.log(trData);
    }
    console.log(trData);
    tableBody.innerHTML = trData;
}
//date
/*$(tableBody).on('change','.dates',function() {
    console.log('hhhhh')
    //console.log(localyaopin[$(this).data('index')])
   console.log(get(Date))
    localStorage.setItem('dingdan',JSON.stringify(newArr));
});
$('.dates').click(function() {
    dingdan = JSON.parse(localStorage.getItem('dingdan'));
    //console.log(dingdan);

});*/
function getPage(total,numPerPage){
    var pageNum = Math.ceil(total/numPerPage);
    var lis='';
    for(var i=1;i<=pageNum;i++){
        if(i == 1){
            lis += '<li class="active">'+i+'</li>'
        }else{
            lis += '<li>'+i+'</li>'
        }
    }
    pageBox.innerHTML = lis;
    /* console.log(pageNum);*/
}

function getPageData(arr,index,numPerPage){
    pageData = arr.slice((index-1)*numPerPage, index * numPerPage)
}

$(pageBox).on('click','li',function(){
    console.log($(this).index());
    getPageData(localyaopin,$(this).index()+1,5);
    //console.log(localyaopin)
    render(pageData,$(this).index()+1,5);
    $(this).addClass('active').siblings('li').removeClass('active');
});
//添加功能
var addBtn = $('#add');

addBtn.click(function(){
    console.log('hhhh');
    var oids = $('#ids');
    var osaleId = $('#saleId');
    var oypName = $('#ypName');
    var osale=$('#sale');
    var oguiGe=$('#guiGe');
    var odanWei=$('#danWei');
    var osi=$('#si');
    var onumKF=$('#numKF');
    var oxiaoJi=$('#xiaoJi');
    var odate=$('#date');

    var regDanHao=/^[0-9]\d{2}$/;
    if(
        osaleId.val()==1111&&
        oids.val()!=0&&
        oypName.val() != 0&&
        osale.val() !=0&&
        oguiGe.val() !=0&&
        odanWei.val() !=0&&
        osi.val() !=0&&
        onumKF.val() !=0&&
        oxiaoJi.val() !=0&&
        odate.val() !=0
    ){
        if(regDanHao.test(oids.val())==true)
        {
            localyaopin.unshift({
                saleId:Number(osaleId.val()),
                id:Number(oids.val()),
                name:oypName.val(),
                sale:osale.val(),
                guiGe:oguiGe.val(),
                danWei:odanWei.val(),
                si:osi.val(),
                numKF:onumKF.val(),
                xiaoJi:onumKF.val()*osale.val(),
                riqi:odate.val()
            });
        }else{
            fyAlert.msg('药品编号不存在，请重新输入！',{incon: 2,animatetype: 2});return false;
        }
        localStorage.setItem("yaopin",JSON.stringify(localyaopin));
        oids.val('');
        oypName.val('');
        osale.val('');
        oguiGe.val('');
        odanWei.val('');
        osi.val('');
        onumKF.val('');
        oxiaoJi.val('');
    }else{
        fyAlert.msg('输入内容不正确，请重新输入！',{incon: 2,animatetype: 2});return false;
    }
    initTable();
});

//修改----的模态框
function delAlert(){
    fyAlert.alert({
        title: "药品信息",
        drag: true,
        shadowClose: false,
        content: '<form action="">' +
        '<p>订单编号：<input type="text" id="mod1"/></p>' +
        '<p>药品编号：<input type="text" id="mod2"/></p>' +
        '<p>药品名称：<input type="text" id="mod3"/></p>' +
        '<p>药品价格：<input type="text" id="mod4"/></p>' +
        '<p style="text-indent: 2em">规格：<input type="text" id="mod5"/></p>' +
        '<p style="text-indent: 2em">单位：<input type="text" id="mod6"/></p>' +
        '<p>药房数量：<input type="text" id="mod7"/></p>' +
        '<p>开方数量：<input type="text" id="mod8"/></p>' +
        '<p style="text-indent: 2em">小计：<input type="text" id="mod9"/></p>' +
        '<p style="text-indent: 2em">日期：<input type="date" id="mod10"/></p>' +
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
//打印药单
function dayinyaodan(){
    fyAlert.alert({
        title: "提交成功！",
        drag: true,
        shadowClose: false,
        content:
            '<p>'+'请到药库取药！'+'</p>',

        btns: {
            '确 定': function (obj) {
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}

$("#btn2").click(function(){
    dayinyaodan();
});
//        console.log(this)
    //在数组中删除数据
    //datas.splice($(this).data('index'),1);
    //渲染页面。渲染分页




function xiugai() {
    getPageData(localyaopin,1,5);//获取当前页面要展示的数据
//        渲染页面数据
    render(pageData,1,5);
    //        渲染分页
    getPage(localyaopin.length,5);
}


//查询功能
var input1=$('#input1');
var newArr=[];
$('#btn1').click(function(){
    newArr=[];
    for(var i=0;i<localyaopin.length;i++) {
        if (localyaopin[i].id.indexOf(input1.val()) > -1) {
            newArr.push(localyaopin[i])
        }
    }
    getPageData(newArr,1,5);
    //渲染页面数据
    render(pageData,1,5);
    //渲染分页
    getPage(newArr.length,5);
    //console.log(newArr)
});
//console.log(newArr)
//删除--的模态框

function openDialog() {
    fyAlert.alert({
        title: "退出",
        drag: true,
        shadowClose: false,
        content: '是否确认删除？',
        btns: {
            '确 定': function (obj) {
                var allData=localStorage.getItem('yaopin');
                allData = JSON.parse((allData));
                if(newArr.length > 0){
                    var thisData=newArr[jj];
                    for(var  i=allData.length-1;i>=0;i--){
                        if(allData[i].id==thisData.id){
                            allData.splice(i,1)
                        }
                    }
                    newArr.splice(jj,1);
                    getPageData(newArr,1,5);
                    render(newArr,1,5);
                    getPage(newArr.length,5);
                }else{
                    allData.splice(jj,1);
                    getPageData(allData,1,5);
                    render(pageData,1,5);
                    getPage(allData.length,5);
                }

                localStorage.setItem('yaopin',JSON.stringify(allData));

                //shanchu();
                obj.destory();
            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}



//删除数据
$(tableBody).on('click','.delBtn',function(){
//        console.log(this)
    //在数组中删除数据
    //datas.splice($(this).data('index'),1);
    //渲染页面。渲染分页
    jj=$(this).data('index');
    openDialog();
});

//选择

/*var disease = [];
$('input[name=".inputs"]:checked').each(function(){
    disease.push(datas.data('index'));
    console.log(datas.data('index'))
});
localStorage.setItem('yaodan2',JSON.stringify(disease));*/

/*//修改
 $(tableBody).on('click','.xgBtn',function(){
 //        console.log(this)
 //在数组中删除数据
 console.log(typeof datas[0].name)

 var mc=prompt('请输入修改后药品名称');
 //datas[1].name.replace(datas[1].name,mc)
 datas[0].name=datas[0].name.replace(datas[0].name,mc)
 console.log(datas)
 //渲染页面。渲染分页
 initTable();

 });*/
//修改
$("tbody").on("click",".xgBtn",function() {
    //console.log("点击了修改事件");
    delAlert();
    //要修改的数据显示在模态框内
    //console.log($(this).data("index"));//这里的this指向#modBtn,index代表当前按钮的下标
    $("#mod1").val(localyaopin[$(this).data("index")].saleId);
    $("#mod2").val(localyaopin[$(this).data("index")].id);
    $("#mod3").val(localyaopin[$(this).data("index")].name);
    $("#mod4").val(localyaopin[$(this).data("index")].sale);
    $("#mod5").val(localyaopin[$(this).data("index")].guiGe);
    $("#mod6").val(localyaopin[$(this).data("index")].danWei);
    $("#mod7").val(localyaopin[$(this).data("index")].si);
    $("#mod8").val(localyaopin[$(this).data("index")].numKF);
    $("#mod9").val(localyaopin[$(this).data("index")].xiaoJi);
    $("#mod10").val(localyaopin[$(this).data("index")].riqi);
    newMod = $(this).data("index");
});

//确定修改的函数
function mod() {
    //console.log($('.xgBtn').data("index")) ;
    localyaopin[newMod].saleId = $("#mod1").val();
    localyaopin[newMod].id = $("#mod2").val();
    localyaopin[newMod].name = $("#mod3").val();
    localyaopin[newMod].sale = $("#mod4").val();
    localyaopin[newMod].guiGe = $("#mod5").val();
    localyaopin[newMod].danWei = $("#mod6").val();
    localyaopin[newMod].si = $("#mod7").val();
    localyaopin[newMod].numKF = $("#mod8").val();
    localyaopin[newMod].xiaoJi = $("#mod9").val();
    localyaopin[newMod].riqi = $("#mod10").val();
    localStorage.setItem('yaopin',JSON.stringify(localyaopin));
    initTable();

}


//提交药单
var newArr1 =[];
$(tableBody).on('change','.inputs',function() {

    //console.log(localyaopin[$(this).data('index')])
    newArr1.push(localyaopin[$(this).data('index')]);
    localStorage.setItem('dingdan',JSON.stringify(newArr1));
});
$('#btn2').click(function() {
    dingdan = JSON.parse(localStorage.getItem('dingdan'));
    //console.log(dingdan);

});
/*var a=document.getElementsByClassName('a1');
 var textarea=document.getElementById('textarea');
 a.onclick=function(){

 }*/


/*
//获取时间值
$("#moviedate").change(function(){
    $("#moviedate").attr("value",$(this).val()); //赋值
});
console.log($('#moviedate').val());
localyaopin.riqi.val($('#moviedate').val());*/
/*
$(tableBody).on('input','.dates',function(){

    localyaopin.splice($(this).data('index').riqi,1,$(this).val());

   //修改
   // allData
   // $(this).data('index')
    //console.log($(this).val())
    //setItem
});*/
