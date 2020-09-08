window.onload = function () {
    imgLocation();

    var imgData = { "data": [{ "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }, { "src": "6.jpg" }, { "src": "7.jpg" }, { "src": "8.jpg" }, { "src": "9.jpg" }] };

    window.onscroll = function () {
        //滚动到最后的时候进行自动加载
        if (checkFlag()) {
            var containerBox = document.getElementById("container");
            for (var i = 0; i < imgData.data.length; i++) {
                var divStr = "<div class='box'><div><img src='images/" + imgData.data[i].src + "'></div></div>";
                //DOMParser可以将Html文本转换为Node节点
                containerBox.innerHTML += divStr;
            }
            imgLocation();
        }
    }
};

function checkFlag() {
    var containerBox = document.getElementById("container");
    var contentArr = containerBox.getElementsByClassName("box");
    var lastContentHeight = contentArr[contentArr.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //clientHeight：不包含border，offsetHeight：包含border
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    /* console.log("lastContentHeight_" + lastContentHeight);
    console.log("scrollTop_" + scrollTop);
    console.log("pageHeight_" + pageHeight); */
    if (lastContentHeight < scrollTop + pageHeight) {
        return true;
    }
}


function imgLocation() {
    var cparent = document.getElementById("container");
    var contentArr = cparent.getElementsByClassName("box");
    var imgWidth = contentArr[0].offsetWidth;
    var cols = Math.floor(document.documentElement.offsetWidth / imgWidth);
    //cssText本质就是设置HTML元素的style属性值
    cparent.style.cssText = "width:" + cols * imgWidth + "px;margin:0 auto;";

    var boxHeightArr = [];
    for (var i = 0; i < contentArr.length; i++) {
        if (i < cols) {
            boxHeightArr[i] = contentArr[i].offsetHeight;
        } else {
            //Math.min.apply(null, boxHeightArr)可取出数组中的最小值，最大值同理
            var minHeight = Math.min.apply(null, boxHeightArr);
            var minIndex = getMinBoxIndex(boxHeightArr, minHeight);
            contentArr[i].style.position = "absolute";
            contentArr[i].style.top = minHeight + "px";
            contentArr[i].style.left = contentArr[minIndex].offsetLeft + "px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + contentArr[i].offsetHeight;
        }
    }
}

function getMinBoxIndex(boxHeigthArr, minHeight) {
    for (var i in boxHeigthArr) {
        if (boxHeigthArr[i] == minHeight) {
            return i;
        }
    }
}

