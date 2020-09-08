/* 自封装jQuery -- create by zhang 2020-09-07 */
(function () {
    let jQuery = function (selector) {
        let arr;
        if (typeof selector == 'string') {
            arr = document.querySelectorAll(selector);
        }

        //window加载完毕
        function _ready(fun) {
            window.onload = fun();
        }

        //添加点击事件
        function _addClickEvent(fun) {
            for (let i = 0; i < arr.length; i++) {
                arr[i].onclick = fun;
            }
        }

        //设置或获取节点样式
        function _css(styleOrNm, value) {
            if (value) {
                //添加css
                for (let i = 0; i < arr.length; i++) { arr[i].style[styleOrNm] = value; }
            } else {
                if (typeof styleOrNm == 'object') {
                    //添加css：样式以对象形式传入
                    for (let key in styleOrNm) {
                        for (let i = 0; i < arr.length; i++) {
                            arr[i].style[key] = styleOrNm[key];
                        }
                    }
                } else {
                    //获取css
                    return arr[0].style[styleOrNm];
                }
            }
        }

        //获取节点的html内容
        function _html(html) {
            if (html) {
                arr[0].innerHTML = html;
            } else {
                return arr[0].innerHTML;
            }
        }

        //获取节点的文本内容
        function _text(text) {
            if (text) {
                arr[0].innerText = text;
            } else {
                return arr[0].innerText;
            }
        }

        //获取控件的值
        function _val(val) {
            if (val) {
                arr[0].value = val;
            } else {
                return arr[0].value;
            }
        }

        //获取或设置节点的属性
        function _attr(attrOrNm, value) {
            if (value) {
                //添加attr
                for (let i = 0; i < arr.length; i++) { arr[i].setAttribute(attrOrNm, value); }
            } else {
                if (typeof attrOrNm == 'object') {
                    //添加attr：属性以对象形式传入
                    for (let key in attrOrNm) {
                        for (let i = 0; i < arr.length; i++) {
                            arr[i].setAttribute(key, attrOrNm[key]);
                        }
                    }
                } else {
                    //获取attr
                    return arr[0].getAttribute(attrOrNm);
                }
            }
        }

        //创建xhr对象
        function createXHR() {
            let xhr;
            if (XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xhr;
        }

        //将ajax传来的参数格式化
        function getParamStr(param) {
            let arr = [];
            for (let key in param) {
                arr.push(key + "=" + obj[key]);
            }
            return arr.join('&');
        }

        //ajax
        function _mAjax(obj) {
            obj.method = obj.method || 'get';
            let xhr = createXHR();
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

        return { ready: _ready, click: _addClickEvent, css: _css, html: _html, text: _text, val: _val, attr: _attr, mAjax: _mAjax };
    }
    window.$ = window.Jquery = jQuery;
})();