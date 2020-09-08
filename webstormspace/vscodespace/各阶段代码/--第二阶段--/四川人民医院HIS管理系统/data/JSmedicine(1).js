/**
 * Created by Administrator on 2020/8/4.
 */
//药品信息
var medicine=[
    {
        name:'西瓜霜',
        bid:'6',     //进价
        sale:'9',    //售价
        id:'01',     //编号
        si:'11'      //库存
    },
    {
        name:'金嗓子喉片',
        bid:'5',     //进价
        sale:'9',    //售价
        id:'02',     //编号
        si:'30'      //库存
    },
    {
        name:'999感冒灵',
        bid:'12',     //进价
        sale:'18',    //售价
        id:'03',     //编号
        si:'12'      //库存
    },
    {
        name:'三九胃泰',
        bid:'13',     //进价
        sale:'26',    //售价
        id:'04',     //编号
        si:'8'      //库存
    },
    {
        name:'碧生常润茶',
        bid:'18',     //进价
        sale:'32',    //售价
        id:'05',     //编号
        si:'5'      //库存
    },
    {
        name:'维C银翘片',
        bid:'5',     //进价
        sale:'13',    //售价
        id:'06',     //编号
        si:'6'      //库存
    }
];
//本地储存
var medicine1=[];

var inBox=document.querySelector('#inBox');
var inBox2=document.querySelector('#inBox2');
var pageDate=[];
//初始化
//$('#haha').click(function() {
//    localStorage.setItem('medicines',JSON.stringify(medicine));
//    initTable();
//});

//localStorage.setItem('medicines',JSON.stringify(medicine));
initTable();
function initTable(){//进入页面的初始状态，初始化表格
    if(localStorage.getItem('medicines')==null){
        localStorage.setItem('medicines',JSON.stringify(medicine));
        medicine1 = JSON.parse(localStorage.getItem('medicines'));
    }else{
        medicine1 = JSON.parse(localStorage.getItem('medicines'));
    }
    //medicine1=JSON.parse(localStorage.getItem('medicines'));//将本地数据加入新数组里 初始化页面
    //medicine1=JSON.parse(medicine1);// json转对象
//    //默认获取第一页的数据
    fenYe(medicine1,1,3);
//    //pageData
////        渲染页面数据
    xuanran(pageDate);
//    //        渲染分页
    paging(medicine1.length,3);
    console.log(medicine1);
}

//initTable();


//数据渲染
function xuanran(medicineArr){
    //medicineArr是药品的形参 不能和实参一样
    var str='';
    for(var i=0;i<medicineArr.length;i++){
        str += '<tr>'
        + '<td>'+medicineArr[i].name+'</td>'
        + '<td>'+medicineArr[i].bid+'</td>'
        + '<td>'+medicineArr[i].sale+'</td>'
        + '<td>'+medicineArr[i].id+'</td>'
        + '<td>'+medicineArr[i].si+'</td>'
        + '<td><a id="del" href="javascript:;" data-index="'+i+'">删除</a>&nbsp; &nbsp;<a id="xiuGai" data-index="'+i+'" href="javascript:;">修改</a></td>'
        +'</tr>'
    }
    inBox.innerHTML = str;
}
//分页下标
function paging(zongshu,num){
    var yeShu=Math.ceil(zongshu/num); //页数是总的信息数除以每页的信息条数
    var lis='';
    for(var i=1;i<=yeShu;i++){
        if(i==1){
            lis += '<li class="li1">'+i+'</li>'
        }else{
            lis += '<li>'+i+'</li>'
        }

    }
    inBox2.innerHTML = lis;
}
//分页
function fenYe(arr,index,num){
    //index 行数序列
    //arr是药品的形参
    pageDate = arr.slice((index-1)*num,index * num);//每页显示信息条数
    //console.log(pageDate)
}
//分页点击事件
$('#inBox2').on('click','li',function(){
    //console.log($(this).t);
    fenYe(medicine,$(this).html(),3);
    xuanran(pageDate);
    page=$(this).text();//当前页数的值
    //console.log($(this));
    $(this).addClass('li1').siblings('li').removeClass('li1')
});

//添加药品信息
var addBtn=$('#add');
var mc=$('#mc');
var jinJia=$('#jinjia');
var maiJia=$('#maijia');
var bianHao=$('#bianhao');
var kuCun=$('#kucun');
   addBtn.click(function(){
       medicine1.unshift({
           name:mc.val(),
           bid:jinJia.val(),
           sale:maiJia.val(),
           id:bianHao.val(),
           si:kuCun.val()
       });
       console.log(medicine1);
       localStorage.setItem('medicines',JSON.stringify(medicine1));
       mc.val('');
       jinJia.val('');
       maiJia.val('');
       bianHao.val('');
       kuCun.val('');

       initTable();

   });
//重置药品信息
var czBtn=$('#chongzhi');
    czBtn.click(function () {
         mc.val('');
         jinJia.val('');
         maiJia.val('');
         bianHao.val('');
         kuCun.val('');
    });
//查询药品信息
var cxMz=$('#cxmz');
$('#chaxun').click(function(){
    console.log('hahha');
    var newArr=[];
    for(i=0;i<medicine1.length;i++){
    //||medicine[i].id.indexOf(cxBh.val()) > -1
        if(medicine1[i].name.indexOf(cxMz.val()) > -1){
            newArr.push(medicine1[i]);
        }
    }
    //console.log(cxBh.val());
    //console.log(newArr);
    //新数据分页
    fenYe(newArr,1,3);
////        渲染页面数据
    xuanran(pageDate);
//    //        渲染新分页下标
    paging(newArr.length,3);
    cxMz.val('');
});
//删除药品信息
$('#inBox').on('click','#del',function(){
    //console.log($(this));
    //console.log($(this).data('index'));
    //var zxiabiao=
    //console.log(page);
    console.log(medicine1);
    medicine1.splice($(this).data('index'),1);
    localStorage.setItem('medicines',JSON.stringify(medicine1));
    initTable();
});
//修改药品信息
//模态框结构函数
function openDialog() {
        fyAlert.alert({
            title: "药品信息",
        drag: true,
        shadowClose: false,
        content: '<form action="">'
        + '<p>产品名称: <input id="input1" type="text"/></p>'
        + '<p>产品进价: <input id="input2" type="text"/></p>'
        + '<p>产品售价: <input id="input3" type="text"/></p>'
        + '<p>产品编号: <input id="input4" type="text"/></p>'
        + '<p>产品库存: <input id="input5" type="text"/></p>'
        + '</form>',
        btns: {
            '修 改': function (obj) {
                xiugai();
                obj.destory();

            },
            '取 消': function (obj) {
                obj.destory();
            }
        }
    });
}
//点击修改出现对应内容
$(inBox).on('click','#xiuGai',function() {
    openDialog();
    //数据出现在模态框对应input里
    //console.log(medicine[$(this).data('index')]);
    $('#input1').val(medicine1[$(this).data('index')].name);
    $('#input2').val(medicine1[$(this).data('index')].bid);
    $('#input3').val(medicine1[$(this).data('index')].sale);
    $('#input4').val(medicine1[$(this).data('index')].id);
    $('#input5').val(medicine1[$(this).data('index')].si);
    biaoji = $(this).data('index');
    console.log(biaoji);
});
//点击修改按钮对应页面内容修改
function xiugai(){
    //console.log($('#xiuGai').data('index'));
    medicine1[biaoji].name=$('#input1').val();
    medicine1[biaoji].bid=$('#input2').val();
    medicine1[biaoji].sale=$('#input3').val();
    medicine1[biaoji].id=$('#input4').val();
    medicine1[biaoji].si=$('#input5').val();
    //console.log(medicine);
    initTable()
};


