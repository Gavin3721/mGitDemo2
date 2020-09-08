function EventAction() {
    //添加绑定事件
    this.addEvent = function (dom, eventNm, fun) {
        if (document.addEventListener) {
            dom.addEventListener(eventNm, fun, false);
        } else if (document.attachEvent) {
            dom.attachEvent("on" + eventNm, fun);
        } else {
            dom["on" + eventNm] = fun;
        }
    }

    //移除绑定的事件
    this.removeEvent = function (dom, eventNm, fun) {
        if (document.removeEventListener) {
            dom.removeEventListener(eventNm, fun, false);
        } else if (document.detachEvent) {
            dom.detachEvent("on" + eventNm, fun);
        } else {
            dom["on" + eventNm] = null;
        }
    }

    //获取事件目标
    this.getTarget = function (e) {
        return e.target || e.srcElement;
    }

    //获取事件
    this.getEvent = function (e) {
        return window.event || e;

    }
}