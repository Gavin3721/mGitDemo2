/**
 * Created by Administrator on 2016/7/30.
 */
var detailS = document.getElementById("detailS");
var detailLi = detailS.getElementsByTagName("li");
var detailSpan = detailLi[0].getElementsByTagName("span");
//detailLi[0].addEventListener("click",detailBack,true);
scrollListen();
//setInterval(scrollListen,50);
//function detailBack(){
//    if(detailS.id=="detailS"||detailS.id=="detailS"&&detailS.className=="detailB"){
//        up();
//    }else if(detailS.className=="detailS"&&detailS.id==""){
//        down();
//    }
//
//}
//function up(){
//        detailS.className="detailS";
//        detailS.id="";
//        detailLi[0].onclick=down;
//}
//
function down() {
    detailS.id = "detailS";
    detailS.className = "detailB";
}
function black() { }
function scrollListen() {
    window.onscroll = function () {
        if (document.body.scrollTop <= 2200) {
            down();
            detailLi[0].innerHTML = "<span>&#xe60e;</span>详细特征"
            //detailLi[0].addEventListener("click",detailBack,true);
        } else if (document.body.scrollTop > 2200) {
            detailS.className = "detailS";
            detailS.id = "";
            detailLi[0].innerHTML = "<span id='spanF'>&#xe62b;</span><span id='spanX'>详细特征</span>";
        }
    }
}

//gavin by add by 2020/08/29 start
var layer = layui.layer;

$("#buyCart").click(function () {
    var rid = $(this).data("rid");
    $.ajax({
        async: false,
        cache: false,
        url: '/shopcart',
        type: 'POST',
        data: {
            'rid': rid
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 201) {
                layer.msg(data.message);
            } else {
                if (data.data.affectedRows > 0) {
                    layer.msg("添加成功");
                } else {
                    layer.msg("添加失败");
                }
            }
        },
        error: function (data) {
        }
    });


});

//end


