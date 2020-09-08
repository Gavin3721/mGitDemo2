//患者基本信息
let huanZhe = [
    {
        idCard: '513021514552515151',
        name:'小三',
        sex: '男',
        age: '21',
        blood: 'O型',
        tel: '123456789'
    },
    {
        idCard: '513021514552087012',
        name:'小四',
        sex: '男',
        age: '21',
        blood: 'A型',
        tel: '123456789'
    },
    {
        idCard: '513021514552156147',
        name:'小四',
        sex: '女',
        age: '21',
        blood: 'B型',
        tel: '123456789'
    },
    {
        idCard: '513021514552515152',
        name:'小五',
        sex: '男',
        age: '21',
        blood: 'O型',
        tel: '123456789'
    },
]

//挂号患者信息
let guaHao = [
    {
        id: '1',
        idCard: '513721188511293399',
        name: '猪八戒',
        charge: '20',
        doctor:'张三',
        keshi: '内科',
        type: '普通医生',
        date: '2020-8-4',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id:'2',
        idCard: '513721188111293399',
        name: '孙悟空',
        charge: '10',
        doctor:'王麻子',
        keshi: '儿童科',
        type: '实习医生',
        date: '2020-8-4',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '3',
        idCard: '513721188211293399',
        name: "唐僧",
        charge: '30',
        doctor:'李四',
        keshi: '外科',
        type: '专家医生',
        date: '2020-8-5',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '4',
        idCard: '513721188311293399',
        name: '沙和尚',
        charge: '10',
        doctor:'齐朝鑫',
        keshi: '泌尿科',
        type: '实习医生',
        date: '2020-8-4',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '5',
        idCard: '513721188411293399',
        name: '兰馨',
        charge: '30',
        doctor:'康丰强',
        keshi: '内科',
        type: '专家医生',
        date: '2020-8-3',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '6',
        idCard: '513721188611293399',
        name: '黄雪',
        charge: '20',
        doctor:'余潼',
        keshi: '泌尿科',
        type: '普通医生',
        date: '2020-8-3',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '7',
        idCard: '513721188711293399',
        name: '蔡徐坤',
        charge: '20',
        doctor:'余潼',
        keshi: '泌尿科',
        type: '普通医生',
        date: '2020-8-2',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '8',
        idCard: '513721188811293399',
        name: '李光洙',
        charge: '20',
        doctor:'余潼',
        keshi: '泌尿科',
        type: '普通医生',
        date: '2020-8-1',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '9',
        idCard: '513721188911293399',
        name: '嫦娥',
        charge: '20',
        doctor:'余潼',
        keshi: '泌尿科',
        type: '普通医生',
        date: '2020-8-1',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    },
    {
        id: '10',
        idCard: '513721199011293399',
        name: '后裔',
        charge: '20',
        doctor:'余潼',
        keshi: '泌尿科',
        type: '普通医生',
        date: '2020-8-1',
        tel: '123456',
        age: '15',
        hun: '是',
        pingying: 'xxx',
        sex: '男',
        blood: 'A型'
    }
]

//医生信息
let keShi = [
    {
        id: '1',
        name : '张三',
        km: '内科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '2',
        name : '李四',
        km: '外科',
        type: '专家医生',
        charge: '30'
    },
    {
        id: '3',
        name : '王麻子',
        km: '皮肤科',
        type: '实习医生',
        charge: '10'
    },

    {
        id: '4',
        name : '张三',
        km: '内科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '6',
        name : '王八蛋',
        km: '外科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '7',
        name : '猪八戒',
        km: '内科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '8',
        name : '猪八戒',
        km: '皮肤科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '9',
        name : '猪八戒',
        km: '皮肤科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '10',
        name : '猪八戒',
        km: '皮肤科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '11',
        name : '猪八戒',
        km: '内科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '12',
        name : '猪八戒',
        km: '口腔科',
        type: '普通医生',
        charge: '20'
    },
 
    {
        id: '13',
        name : '猪八戒',
        km: '内科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '15',
        name : '猪八戒',
        km: '口腔科',
        type: '普通医生',
        charge: '20'
    },
    {  
        id: '16',
        name : '猪八戒',
        km: '内科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '17',
        name : '猪八戒',
        km: '外科',
        type: '普通医生',
        charge: '20'
    },
    {
        id: '18',
        name : '猪八戒',
        km: '口腔科',
        type: '普通医生',
        charge: '20'
    },
]