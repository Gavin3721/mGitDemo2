//数据中转数组
var deptInfoArr = [],//所有部门信息
    userInfoArr = [],//所有员工信息（包括在职和离职员工）
    yeWuMoKuaiArr = [],//所有模块信息记录
    roleInfoArr = [];//所有角色信息记录


//初始化本地存储数据
function initLocalStorageData() {
    /* localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArrData));
    localStorage.setItem("userInfoArr", JSON.stringify(userInfoArrData));
    localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArrData));
    localStorage.setItem("roleInfoArr", JSON.stringify(roleInfoArrData)); */

    if (localStorage.getItem("deptInfoArr") == null) {
        localStorage.setItem("deptInfoArr", JSON.stringify(deptInfoArrData));
    }
    if (localStorage.getItem("userInfoArr") == null) {
        localStorage.setItem("userInfoArr", JSON.stringify(userInfoArrData));
    }
    if (localStorage.getItem("yeWuMoKuaiArr") == null) {
        localStorage.setItem("yeWuMoKuaiArr", JSON.stringify(yeWuMoKuaiArrData));
    }
    if (localStorage.getItem("roleInfoArr") == null) {
        localStorage.setItem("roleInfoArr", JSON.stringify(roleInfoArrData));
    }
    deptInfoArr = JSON.parse(localStorage.getItem("deptInfoArr"));
    userInfoArr = JSON.parse(localStorage.getItem("userInfoArr"));
    yeWuMoKuaiArr = JSON.parse(localStorage.getItem("yeWuMoKuaiArr"));
    roleInfoArr = JSON.parse(localStorage.getItem("roleInfoArr"));
}

//-------------------------------------------------

//--这是部门信息临时的假数据--
var deptInfoArrData = [
    {
        "deptId": "010",//部门id
        "deptNm": "行政部",//部门名称
        "abbreviation": "XZ",//英文简称
        "deptGrade": "1",//部门等级，数字越小等级越高
        "zhiNeng": "管理层",//部门职能
        "details": "企业领导，董事会成员",//备注信息
        "createDate": "2001-02-03"//创建时间
    },
    {
        "deptId": "011",
        "deptNm": "挂号部",
        "abbreviation": "GH",
        "deptGrade": "2",
        "zhiNeng": "挂号业务",
        "details": "",
        "createDate": "2001-02-03"
    },
    {
        "deptId": "012",
        "deptNm": "门诊部",
        "abbreviation": "MZ",
        "deptGrade": "3",
        "zhiNeng": "为患者提供就诊",
        "details": "所有医生均属该部",
        "createDate": "2001-02-03"
    },
    {
        "deptId": "013",
        "deptNm": "后勤部",
        "abbreviation": "HQ",
        "deptGrade": "4",
        "zhiNeng": "管理医院后勤",
        "details": "药物及医疗器械的后勤购入",
        "createDate": "2001-02-03"
    },
    {
        "deptId": "014",
        "deptNm": "财务部",
        "abbreviation": "CW",
        "deptGrade": "5",
        "zhiNeng": "核算财务",
        "details": "负责企业的各项收入支出",
        "createDate": "2001-02-03"
    },
    {
        "deptId": "015",
        "deptNm": "住院部",
        "abbreviation": "ZY",
        "deptGrade": "6",
        "zhiNeng": "住院事项",
        "details": "为住院患者提供服务",
        "createDate": "2001-02-03"
    },
    {
        "deptId": "016",
        "deptNm": "运营部",
        "abbreviation": "YY",
        "deptGrade": "7",
        "zhiNeng": "业务管理",
        "details": "企业运营的工作",
        "createDate": "2001-02-03"
    }
];

//--这是员工信息临时的假数据--
var userInfoArrData = [
    {
        "userId": "000111",//员工编号，超级管理员固定写死，别的地方过滤掉
        "account": "admin",//登录账户名，唯一
        "password": "123123",//登录密码
        "picture": "25.png",//员工头像
        "userNm": "超级管理员",//员工姓名
        "userSex": "男",//性别
        "userAge": "26",//年龄
        "cardNum": "",//身份证号
        "userPhone": "13000122313",//手机号
        "email": "11112222@163.com",//邮箱地址
        "bloodType": "O",//血型
        "marriage": "未婚",//婚姻
        "education": "",//教育背景
        "country": "",//国籍
        "nation": "汉",//民族
        "nativePlace": "四川省",//籍贯
        "address": "成都市",//家庭住址
        "deptIds": ["0000"],//所属部门id，/* 一个人可分属多个部门 */
        "zhiWei": "",//职位
        "wages": "13000",//工资
        "userGrade": "0",//在部门的等级，数字越小职称越高
        "entryDate": "2002-05-14",//入职日期
        "quitDate": "",//离职日期
        "workState": "1",//在职状态，1为在职，0为离职
        "details": "这个是超级管理员",//备注
        "quanxian": ["10", "11"]//权限角色
    },
    {
        "userId": "111111",
        "account": "zhangsan",
        "password": "123123",
        "picture": "408.png",
        "userNm": "张三",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "513025197703287634",
        "userPhone": "13000122313",
        "email": "234234@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["010"],
        "zhiWei": "院长",
        "wages": "8000",
        "userGrade": "1",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "这里的人，都得听我的",
        "quanxian": ["10", "11"]
    },
    {
        "userId": "111112",
        "account": "xiaoyong",
        "password": "123123",
        "picture": "409.png",
        "userNm": "小勇",
        "userSex": "男",
        "userAge": "28",
        "cardNum": "513025198405227532",
        "userPhone": "15803428801",
        "email": "234134345@qq.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["011"],
        "zhiWei": "挂号专员",
        "wages": "6000",
        "userGrade": "2",
        "entryDate": "2009-05-12",
        "quitDate": "",
        "workState": "1",
        "details": "我的服务质量一流",
        "quanxian": ["11", "17"]
    },
    {
        "userId": "111113",
        "account": "xiaotong",
        "password": "123123",
        "picture": "",
        "userNm": "小潼",
        "userSex": "男",
        "userAge": "28",
        "cardNum": "5130251992405213455",
        "userPhone": "15803428801",
        "email": "5555555@qq.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["012"],
        "zhiWei": "外壳主治医师",
        "wages": "6000",
        "userGrade": "3",
        "entryDate": "2009-05-12",
        "quitDate": "",
        "workState": "1",
        "details": "这里的医生，属我最666",
        "quanxian": ["13"]
    },
    {
        "userId": "111114",
        "account": "xiaoxue",
        "password": "123123",
        "picture": "",
        "userNm": "小雪",
        "userSex": "女",
        "userAge": "32",
        "cardNum": "2130251982405213455",
        "userPhone": "15803428801",
        "email": "553455@qq.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["013"],
        "zhiWei": "库房负责人",
        "wages": "6000",
        "userGrade": "4",
        "entryDate": "2009-05-12",
        "quitDate": "",
        "workState": "1",
        "details": "忙来忙去，一堆破事，唉",
        "quanxian": ["18"]
    },
    {
        "userId": "111115",
        "account": "xiaolan",
        "password": "123123",
        "picture": "",
        "userNm": "小兰",
        "userSex": "女",
        "userAge": "28",
        "cardNum": "433024199205213455",
        "userPhone": "15803428801",
        "email": "553455@qq.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["013"],
        "zhiWei": "采购专员",
        "wages": "6000",
        "userGrade": "5",
        "entryDate": "2009-05-12",
        "quitDate": "",
        "workState": "1",
        "details": "我是最忙的，呵呵",
        "quanxian": ["15"]
    },
    {
        "userId": "111116",
        "account": "xiaoqiang",
        "password": "123123",
        "picture": "",
        "userNm": "小强",
        "userSex": "男",
        "userAge": "34",
        "cardNum": "423024199106213545",
        "userPhone": "15803428801",
        "email": "553455@qq.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["014"],
        "zhiWei": "后勤专员",
        "wages": "6000",
        "userGrade": "6",
        "entryDate": "2009-05-12",
        "quitDate": "",
        "workState": "1",
        "details": "有一种强，就是在说我~",
        "quanxian": ["12", "14"]
    },
    {
        "userId": "111117",
        "account": "xiaoxing",
        "password": "123123",
        "picture": "",
        "userNm": "小鑫",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "513025197503287634",
        "userPhone": "13600222343",
        "email": "wwwrrrwe@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "内江市",
        "deptIds": ["016"],
        "zhiWei": "精神病医生",
        "wages": "8000",
        "userGrade": "12",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "一个他们不敢用的精神病医生",
        "quanxian": ["21"]
    },
    {
        "userId": "111118",
        "account": "jerry",
        "password": "123123",
        "picture": "408.png",
        "userNm": "杰瑞",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "513025197703287634",
        "userPhone": "13000122313",
        "email": "234234@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["012"],
        "zhiWei": "内科医生",
        "wages": "8000",
        "userGrade": "8",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "XXXXXXXX",
        "quanxian": ["19"]
    },
    {
        "userId": "111119",
        "account": "alice",
        "password": "123123",
        "picture": "408.png",
        "userNm": "爱丽丝",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "513025197703287634",
        "userPhone": "13000122313",
        "email": "234234@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["012"],
        "zhiWei": "骨科医生",
        "wages": "8000",
        "userGrade": "9",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "XXXXXXXX",
        "quanxian": []
    },
    {
        "userId": "111120",
        "account": "robert",
        "password": "123123",
        "picture": "408.png",
        "userNm": "罗伯特",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "513025197703287634",
        "userPhone": "13000122313",
        "email": "234234@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["012"],
        "zhiWei": "骨科医生",
        "wages": "8000",
        "userGrade": "10",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "XXXXXXXX",
        "quanxian": []
    },
    {
        "userId": "111121",
        "account": "bob",
        "password": "123123",
        "picture": "408.png",
        "userNm": "鲍勃",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "513025197703287634",
        "userPhone": "13000122313",
        "email": "234234@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "中国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["012"],
        "zhiWei": "外壳医生",
        "wages": "8000",
        "userGrade": "11",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "XXXXXXXX",
        "quanxian": []
    },
    {
        "userId": "111122",
        "account": "tom",
        "password": "123123",
        "picture": "408.png",
        "userNm": "汤姆",
        "userSex": "男",
        "userAge": "25",
        "cardNum": "233025197603287334",
        "userPhone": "13000122313",
        "email": "234234@163.com",
        "bloodType": "O",
        "marriage": "未婚",
        "education": "本科",
        "country": "美国",
        "nation": "汉",
        "nativePlace": "四川省",
        "address": "成都市",
        "deptIds": ["012"],
        "zhiWei": "精神病医生",
        "wages": "8000",
        "userGrade": "12",
        "entryDate": "2008-08-08",
        "quitDate": "",
        "workState": "1",
        "details": "XXXXXXXX",
        "quanxian": []
    }
];

//--这是模块信息临时的假数据--
var yeWuMoKuaiArrData = [
    {
        "modelId": "111",//模块id
        "modelNm": "用户管理",//模块名
        "isUse": "1",//模块是否启用，1：启用，0：停止
        "modelGrade": "1",//模块等级
        "createTime": "2020-08-5 16:05:23",//创建时间
        "details": "xxxxxxx",//备注
        "itemArr": [
            {
                "itemId": "111_1",//子项id
                "itemNm": "部门管理",//子项名称
                "isUse": "1",//模块是否启用，1：启用，0：停止
                "createTime": "2020-08-5 16:05:23",//创建时间
                "url": "pages/common/deptManage.html"//页面url
            },
            {
                "itemId": "111_2",
                "itemNm": "员工管理",
                "isUse": "0",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/common/staffManage.html"
            }
        ]//子项列表
    },
    {
        "modelId": "112",
        "modelNm": "权限管理",
        "isUse": "1",
        "modelGrade": "2",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "112_1",
                "itemNm": "模块管理",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/common/ywmkManage.html"
            },
            {
                "itemId": "112_2",
                "itemNm": "角色管理",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/common/roleManage.html"
            },
            {
                "itemId": "112_3",
                "itemNm": "权限配置",
                "isUse": "0",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/common/quanXianManage.html"
            }
        ]
    },
    {
        "modelId": "113",
        "modelNm": "患者挂号",
        "isUse": "1",
        "modelGrade": "3",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "113_1",
                "itemNm": "患者挂号",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/huanzhe/guahao.html"
            },
            {
                "itemId": "113_2",
                "itemNm": "患者列表",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/huanzhe/list.html"
            }
        ]
    },
    {
        "modelId": "114",
        "modelNm": "医生诊断",
        "isUse": "1",
        "modelGrade": "4",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "114_1",
                "itemNm": "患者信息",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/doctor/huanzhexinxi.html"
            },
            {
                "itemId": "114_2",
                "itemNm": "处方药品",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/doctor/chufangyaopin.html"
            }
        ]
    },
    {
        "modelId": "115",
        "modelNm": "药库管理",
        "isUse": "1",
        "modelGrade": "5",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "115_1",
                "itemNm": "药品订单信息",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/yaoku/yk_salemedicine.html"
            },
            {
                "itemId": "115_2",
                "itemNm": "药品信息库",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/yaoku/yk_makemidicine.html"
            }
        ]
    },
    {
        "modelId": "116",
        "modelNm": "采购管理",
        "isUse": "1",
        "modelGrade": "6",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "116_1",
                "itemNm": "采购普通员工",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/cg/cg-Medicine.html"
            },
            {
                "itemId": "116_2",
                "itemNm": "采购审核员工",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/cg/cgsh-Medicine.html"
            }
        ]
    },
    {
        "modelId": "117",
        "modelNm": "医生诊断",
        "isUse": "1",
        "modelGrade": "7",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "117_1",
                "itemNm": "患者信息",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/huanzhexinxi.html"
            },
            {
                "itemId": "117_2",
                "itemNm": "处方药品",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/chufangyaopin.html"
            }
        ]
    },
    {
        "modelId": "118",
        "modelNm": "医院收入",
        "isUse": "1",
        "modelGrade": "8",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "118_1",
                "itemNm": "挂号费用",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/挂号.html"
            },
            {
                "itemId": "118_2",
                "itemNm": "诊断费用",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/药库.html"
            }
        ]
    },
    {
        "modelId": "119",
        "modelNm": "医院支出",
        "isUse": "1",
        "modelGrade": "9",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "119_1",
                "itemNm": "药品购买",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/买东西.html"
            }
        ]
    },
    {
        "modelId": "120",
        "modelNm": "财务统计",
        "isUse": "1",
        "modelGrade": "10",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "120_1",
                "itemNm": "财务统计",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/今日收入统计.html"
            }
        ]
    },
    {
        "modelId": "121",
        "modelNm": "企业文化",
        "isUse": "1",
        "modelGrade": "11",
        "createTime": "2020-08-5 16:05:23",
        "details": "xxxxxxx",
        "itemArr": [
            {
                "itemId": "121_1",
                "itemNm": "优秀员工展示",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/caiwu/优秀员工展示.html"
            }
        ]
    },
    {
        "modelId": "122",
        "modelNm": "科室管理",
        "isUse": "1",
        "modelGrade": "12",
        "createTime": "2020-08-5 16:05:23",
        "details": "科室信息",
        "itemArr": [
            {
                "itemId": "122_1",
                "itemNm": "科室管理",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/keshi/day1.html"
            },
            {
                "itemId": "122_2",
                "itemNm": "医生管理",
                "isUse": "1",
                "createTime": "2020-08-5 16:05:23",
                "url": "pages/keshi/day2.html"
            }
        ]
    }
];

//--这是角色信息的假数据--
var roleInfoArrData = [
    {
        "roleId": "10",//角色编号
        "roleNm": "超级管理员",//角色名称
        "creTime": "2020-08-11",//创建时间
        "details": "只有admin一个用户",//备注
        "range": ["111_1", "111_2", "112_1", "112_2", "112_3"]//查看范围
    },
    {
        "roleId": "11",
        "roleNm": "管理员",
        "creTime": "2020-08-11",
        "details": "你们都要听我的",
        "range": ["111_1", "111_2"]
    },
    {
        "roleId": "12",
        "roleNm": "部门领导",
        "creTime": "2020-08-11",
        "details": "我说这话不是在针对谁，而是在座的各位都是如此~",
        "range": ["112_1"]
    },
    {
        "roleId": "13",
        "roleNm": "普通员工",
        "creTime": "2020-08-11",
        "details": "我只是一个小小的人儿啊",
        "range": []
    },
    {
        "roleId": "14",
        "roleNm": "门诊医生",
        "creTime": "2020-08-11",
        "details": "看精神病，我最在行",
        "range": []
    },
    {
        "roleId": "15",
        "roleNm": "财务员",
        "creTime": "2020-08-11",
        "details": "有一种强，就是在说我",
        "range": []
    },
    {
        "roleId": "16",
        "roleNm": "采购员",
        "creTime": "2020-08-11",
        "details": "忙来忙去，一堆破事，唉~",
        "range": []
    },
    {
        "roleId": "17",
        "roleNm": "信息录入员",
        "creTime": "2020-08-11",
        "details": "没别的，该干啥就干啥",
        "range": []
    },
    {
        "roleId": "18",
        "roleNm": "挂号专员",
        "creTime": "2020-08-11",
        "details": "来向我报道吧，这里欢迎你",
        "range": []
    },
    {
        "roleId": "19",
        "roleNm": "药库操作员",
        "creTime": "2020-08-11",
        "details": "孩纸，你该吃药了",
        "range": []
    },
    {
        "roleId": "20",
        "roleNm": "住院医生",
        "creTime": "2020-08-11",
        "details": "来了你就别想走",
        "range": []
    },
    {
        "roleId": "21",
        "roleNm": "科室管理",
        "creTime": "2020-08-11",
        "details": "你在哪，我来定",
        "range": []
    }
];