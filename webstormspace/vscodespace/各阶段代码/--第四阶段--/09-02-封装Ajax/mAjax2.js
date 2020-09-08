var $ = (function () {
    function createXHR() {
        var xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }

    function getParamStr(param) {
        var arr = [];
        for (var key in param) {
            arr.push(key + "=" + obj[key]);
        }
        return arr.join('&');
    }

    function mAjax(obj) {
        obj.method = obj.method || 'get';
        var xhr = createXHR();
        obj.paramStr = getParamStr(obj.paramStr);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    obj.success(xhr.responseText);
                } else {
                    obj.fail(xhr.error);
                }
            }
        }
        if (method.toLowerCase() == "get") {
            xhr.open("get", obj.url + "?" + obj.paramStr, obj.async);
            xhr.send();
        } else {
            xhr.open("post", obj.url, obj.async);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(obj.paramStr);
        }
    }
    return mAjax;
})();