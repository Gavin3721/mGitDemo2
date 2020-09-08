/**
 * 获取当前时间
 */
function getMTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;//0-11
    var day = date.getDate();//1-31
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}