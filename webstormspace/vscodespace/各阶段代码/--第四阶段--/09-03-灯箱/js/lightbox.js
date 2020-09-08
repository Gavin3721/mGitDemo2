var MDX = (function () {
    var currentIndex = 0;//当前打开的图片索引
    var figureArr = $("figure img");//所有图片集合

    //初始化
    function init() {
        var zheZhaoStr = `
        <div id="_zhezhao">
            <div id="_largeimg">
                <img id="_showimg" src="img/1.jpg" />
                <img id="_closeimg" src="img/close.png" />
                <img id="_tonext" src="img/toNext.png" />
                <img id="_topre" src="img/toPre.png" />
            </div>
        </div>`;
        $("body").append(zheZhaoStr);
        $.each(figureArr, function (index, items) {
            $(items).attr("data-index", index);
        });
    }

    //打开大图
    function openImg(obj) {
        currentIndex = $(obj).prev().data("index");
        $("#_showimg").attr("src", $(figureArr[currentIndex]).attr("src"));
        $("#_zhezhao").css("display", "block");
    }

    //关闭大图
    function closeImg() { $("#_zhezhao").css("display", "none"); }

    //下一张图片
    function toNext() {
        currentIndex += 1;
        currentIndex = currentIndex == figureArr.length ? 0 : currentIndex;
        var src = $(figureArr[currentIndex]).attr("src");
        $("#_showimg").attr("src", src);
    }

    //上一张图片
    function toPre() {
        currentIndex -= 1;
        currentIndex = currentIndex == -1 ? (figureArr.length - 1) : currentIndex;
        var src = $(figureArr[currentIndex]).attr("src");
        $("#_showimg").attr("src", src);
    }

    init();
    $("figure figcaption").click(function () { openImg(this) });
    $("#_closeimg").click(function () { closeImg(); });
    $("#_tonext").click(function () { toNext(); });
    $("#_topre").click(function () { toPre(); });

    //添加键盘响应事件
    $(window).keyup(function (e) {
        switch (e.keyCode) {
            case 37:
                toPre();
                break;
            case 39:
                toNext();
                break;
        }
    });

    return { currentIndex: currentIndex, openImg: openImg, closeImg: closeImg, toNext: toNext, toPre: toPre };
})();