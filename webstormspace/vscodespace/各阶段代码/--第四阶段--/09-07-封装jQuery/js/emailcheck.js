$(document).ready(function () {
    //默认给添几个
    var tempStr = '123123@11.com,123@qq.com,123123,345123345@ss.com,4433qqqq';
    $("#email").val(tempStr);

    $("#checkBtn").click(function () {
        let emailArr = $("#email").val().split(",");
        let checkStr = $("#emailTxt").val();
        let resultArr = checkEmailArr(emailArr, checkStr);
        $("#showResult").html(resultArr.join("; "));
    });

});

//检查符合条件的邮箱
function checkEmailArr(arr, str) {
    let resultArr = [];
    arr.forEach(function (item, index) {
        let data = new regValitor('email', item);
        if (data.result) {
            let index = item.indexOf(str), count = str.length;
            if (index > -1) {
                let str = "<span class='redSpan'>" + item.substr(index, count) + "</span>";
                str = item.substring(0, index) + "" + str + "" + item.substring(index + count, item.length);
                resultArr.push(str);
            }
        }
    });
    return resultArr;
}

//验证邮箱正则表达式
let regValitor = function (type, value) {
    function factory() { }
    factory.prototype = {
        email(value) {
            let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(value);
        }
    }
    let obj = new factory();
    let _result = obj[type](value);
    retu