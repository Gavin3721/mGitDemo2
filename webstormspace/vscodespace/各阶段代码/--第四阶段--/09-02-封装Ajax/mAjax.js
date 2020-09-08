window.onload = function () {
    document.getElementById('testBtn').onclick = function () {
        //使用
        mAjax({
            method: 'get',
            api: 'xxxx',
            paramStr: 'xxxx',
            callback: function (data) {
                console.log(data);
            }
        });
    };
};

//封装ajax
function mAjax(obj) {
    let method = obj.method || 'get';//默认值为get
    let api = obj.api;
    let paramStr = obj.paramStr;
    let callback = obj.callback;

    //1、xhr对象
    let xhr;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2、open设置请求
    if (method.toLowerCase() == "get") {
        xhr.open("get", api + "?" + paramStr, true);
        //3、发送请求
        xhr.send();
    } else {
        xhr.open("post", api, true);
        //post请求下需要配置请求头信息
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //post请求下，要传递的参数放这
        xhr.send(paramStr);
    }

    //4、设置事件，接收响应的数据
    xhr.onreadystatechange = function () {
        /* 0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪 */
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    }
}
