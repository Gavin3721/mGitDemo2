/**
 * Created by xsy on 2016/7/28.
 */
var leftBox = document.getElementById("leftBox");
var righBox = document.getElementById("righBox");
var contenxt = document.getElementById("contenttext");
var div4 = document.getElementById("div4");
/* var imgArr = [];//图片数组
var urlArr = [];//点击图片打开的页面数组*/
var txtArr = [];
var currentNo = 0;//当前
var prevNo = 0;//上一次
var i = 1;
var timer;
function init() {
    leftBox.innerHTML = "<img src='" + imgArr[0] + "' data-index='0'/>";
    righBox.innerHTML = "<img src='" + imgArr[1] + "' data-index='1'/>";
    contenxt.innerHTML = "<div id='div1'>" + txtArr[0] + "</div>";
    leftBox.style.left = "0px";
    righBox.style.left = "1349px";
    setTimeout(function () {
        contenxt.style.bottom = "0px";
    }, 2500)

    //添加点击轮播图打开对应的页面链接
    $("#banner").on("click", "img", function () {
        var index = $(this).data("index");
        window.open(urlArr[index]);
    });
}
init();/*初始化*/
function moveImg(pos, flag) {
    if (flag == true) {/*单独给点击时加给一个状态，不然每次自动执行就清除掉了*/
        clearInterval(timer)
    }
    leftBox.style.left = "-1349px";
    righBox.style.left = "0px";
    leftBox.style.webkitTransition = "all 1.8s linear";
    righBox.style.webkitTransition = "all 1.4s linear";
    leftBox.style.zIndex = 50;
    righBox.style.zIndex = 10;
    currentNo = pos;
    attchImg();
    prevNo = currentNo;/*保存为上一个点击的数字  */
    contenxt.style.bottom = "-400px";
    setTimeout(resetPosition, 2000)
}
/*重置div里面内容*/
function resetPosition() {
    leftBox.style.webkitTransition = "";
    righBox.style.webkitTransition = "";
    leftBox.style.left = "0px";
    righBox.style.left = "1349px";
    attchImg();
    contenxt.innerHTML = "<div id='div1'>" + txtArr[currentNo] + "</div>";
    contenxt.style.bottom = "0px";
}
/*改变图片路径*/
function attchImg() {
    leftBox.innerHTML = "<img src='" + imgArr[prevNo] + "' data-index='" + prevNo + "'/>";
    righBox.innerHTML = "<img src='" + imgArr[currentNo] + "' data-index='" + currentNo + "'/>";/*2 2*/
}
timer = setInterval(function () {
    moveImg(i);
    i++;
    if (i >= 3) {
        i = 0;
    }
}, 4000);

