var layer = layui.layer;

$(document).ready(function () {
    $('#checkAll').click(function () {
        $('#content input:gt(0)').prop('checked', $(this).prop('checked'));
        getZongHeji();
    });

    $('#content input:gt(0)').click(function () {
        if ($("#content input:gt(0)").length == $("#content input:gt(0):checked").length) {
            $('#checkAll').prop('checked', true)
        } else {
            $('#checkAll').prop('checked', false)
        }
        getZongHeji();
    });

    //生成订单
    $("#contentBottomTwo").click(function () {
        var zongheji = $("#zongheji").text();
        if (zongheji == '0.00') {
            layer.msg('请选择至少一种商品');
            return false;
        }
        var arr = $("#content input:gt(0):checked");
        var sidArr = [];
        for (var i = 0; i < arr.length; i++) {
            var sid = $(arr[i]).data("sid");
            sidArr.push(sid);
        }
        var sidStr = sidArr.join(",");
        $.ajax({
            async: false,
            cache: false,
            url: '/buildOrder',
            type: 'POST',
            data: {
                'sidStr': sidStr,
                'total': zongheji
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 201) {
                    layer.msg(data.message);
                } else {
                    if (data.code == 200) {
                        layer.msg("订单生成成功");
                        location.href = "/order.html";
                    } else {
                        layer.msg("订单生成失败");
                    }
                }
            },
            error: function (data) {
            }
        });
    });
});

//计算选中的总合计
function getZongHeji() {
    var arr = $("#content input:gt(0):checked");
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        var sid = $(arr[i]).data("sid");
        var xiaoJi = $("#pc_" + sid).text();
        sum += parseFloat(xiaoJi);
    }
    if (sum == 0) {
        sum = "0.00";//sum.toFixed(2);//保留两位小数
    }
    $("#zongheji").text(sum);
}