/**
 * Created by Administrator on 2020/8/7.
 */
var newMedicine=[
    {
        saleId:'1111',//订单编号
        date:'2020-08-05',//出库时间
        name:'西瓜霜',
        id:'011',     //编号
        saleSi:'1',      //出库数量
        sale:'9',     //售价
        total: '9'     //总价
    },
    {
        saleId:'2222',//订单编号
        date:'2020-08-03',//出库时间
        name:'金嗓子喉片',
        id:'022',     //编号
        saleSi:'1',      //出库数量
        sale:'9',
        total:'9'
    },
    {
        saleId:'3333',//订单编号
        date:'2020-08-02',//出库时间
        name:'999感冒灵',
        id:'033',     //编号
        saleSi:'1',      //出库数量
        sale:'18',
        total:'18'
    },
    {
        saleId:'4444',//订单编号
        date:'2020-08-04',//出库时间
        name:'西瓜霜',
        id:'011',     //编号
        saleSi:'1',      //出库数量
        sale:'9',
        total:'9'
    },
    {
        saleId:'5555',//订单编号
        date:'2020-08-02',//出库时间
        name:'999感冒灵',
        id:'033',     //编号
        saleSi:'1',      //出库数量
        sale:'18',
        total:'18'

    },
    {
        saleId:'6666',//订单编号
        date:'2020-08-08',//出库时间
        name:'西瓜霜',
        id:'011',     //编号
        saleSi:'1',      //出库数量
        sale:'9',
        total:'9'
    },
    {
        saleId:'5555',//订单编号
        date:'2020-08-05',//出库时间
        name:'维C银翘片',
        id:'066',     //编号
        saleSi:'1',      //出库数量
        sale:'13',
        total:'13'
    },
    {
        saleId:'3333',//订单编号
        date:'2020-8-01',//出库时间
        name:'三九胃泰',
        id:'044',     //编号
        saleSi:'1',      //出库数量
        sale:'26',
        total:'26'
    }
];
var newMedicine1=[];

var inBox=document.querySelector('#inBox');
var inBox2=document.querySelector('#inBox2');
var pageDate=[];
initTable();
function initTable(){//进入页面的初始状态，初始化表格
    if(localStorage.getItem('newMedicines')==null){
        localStorage.setItem('newMedicines',JSON.stringify(newMedicine));
        newMedicine1 = JSON.parse(localStorage.getItem('newMedicines'));
    }else{
        newMedicine1 = JSON.parse(localStorage.getItem('newMedicines'));
    }
    fenYe(newMedicine1,1,7);
//    //pageData
////        渲染页面数据
    xuanran(pageDate,1,7);
//    //        渲染分页
    paging(newMedicine1.length,7);
    //console.log(newMedicine1);
}
//数据渲染
function xuanran(nmedicineArr,pageIndex,num){
    //medicineArr是药品的形参 不能和实参一样
    var str='';
    for(var i=0;i<nmedicineArr.length;i++){
        str += '<tr>'
        + '<td>'+nmedicineArr[i].saleId+'</td>'
        + '<td>'+nmedicineArr[i].date+'</td>'
        + '<td>'+nmedicineArr[i].name+'</td>'
        + '<td>'+nmedicineArr[i].id+'</td>'
        + '<td>'+nmedicineArr[i].saleSi+'</td>'
        + '<td>'+nmedicineArr[i].sale+'</td>'
        + '<td>'+nmedicineArr[i].total+'</td>'
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
    fenYe(newMedicine1,$(this).html(),7);
    xuanran(pageDate,$(this).html(),7);
    page=$(this).text();//当前页数的值
    //console.log($(this));
    $(this).addClass('li1').siblings('li').removeClass('li1')
});
//查询药品信息
var cxMz=$('#cxmz');
$('#chaxun').click(function(){
    var newArr=[];
    for(i=0;i<newMedicine1.length;i++){
        if(newMedicine1[i].saleId.indexOf(cxMz.val()) > -1){
            newArr.push(newMedicine1[i]);
        }
    }
    //新数据分页
    fenYe(newArr,1,7);
    //        渲染页面数据
    xuanran(pageDate,$(this).html(),7);
    //        渲染新分页下标
    paging(newArr.length,7);
    cxMz.val('');
});
//日期查询
 $('#chaXuna').click(function(){
     var arr1=[];
     var odate=new Date($('#input1').val());
     var odate1=new Date($('#input2').val());
     $.each(newMedicine,function(i,v){
         var  odate2=new Date(v.date);
         if(odate2.getTime()>=odate.getTime()&&odate2.getTime()<= odate1.getTime()){
             arr1.push(v)
         }
     });
     xuanran(arr1,1,7);
     paging(arr1.length,7);
 });
