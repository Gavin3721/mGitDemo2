userCREATE DATABASE shop;
USE shop;


-- 用户表（User）
CREATE TABLE USER
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- id编号
    username VARCHAR(50) NOT NULL,-- 用户名
    pwd VARCHAR(50) NOT NULL,-- 密码
    headimage VARCHAR(50) DEFAULT 'img/defbannerault.jpg' NOT NULL,-- 头像
    email VARCHAR(50),-- 邮箱
    usersign VARCHAR(100),-- 用户签名
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTshopAMP NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态：1有效，0无效
    delstate INT DEFAULT 1 NOT NULL -- 是否shop删除：1未删除，0已删除
);


-- alter table 表名 change 旧列名 新列名 新的列的数据类型 [新的列的约束]


-- 广告表（Banner）
CREATE TABLE Banner
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- ID号bannerbanner
    title VARCHAR(50) NOT NULL,-- 广告标题
    keyname VARCHAR(50) NOT NULL,-- 关键字，区分buseranner的显示位置
    imagepath VARCHAR(50) NOT NULL,-- 广告路径
    url VARCHAR(50),-- 广告对应链接
    remark VARCHAR(50),-- 备注
    createtime TIMESTAMP DEFAULT cubannerbannerrrent_timestamp NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态：1有效，0无效
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);

-- 商品表（Product）
CREATE TABLE Product
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- ID号
    title VARCHAR(100) NOT NULL,-- 商品名称
    brand VARCHAR(50) NOT NULL,-- 品牌
    summary VARCHAR(255),-- 商品简介
    feng VARCHAR(50) NOT NULL,-- 商品封面的路径
    detail TEXT NOT NULL,-- 商品详情
    isbao INT DEFAULT 1 NOT NULL,-- 1：包邮，0：不包邮
    catoryid INT NOT NULL,-- 所属系列id
    createtime TIMESTAMP defaulcategorybannerbannerbannert CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态，1：有效，0：无效
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);

-- 商品规则表（ProductRule）
CREATE TABLE productrule
(
    rid INT PRIMARY KEY AUTO_INCREMENT,-- id号
    productid INT NOT NULL,-- 商品id，是商品表的外键
    pcount INT NOT NULL,-- 商品数量
    color VARCHAR(50) NOT NULL,-- 颜色
    size VARCHAR(50) NOT NULL,-- 商品尺寸
    yuanprice DECIMAL NOT NULL,-- 商品原价
    price DECIMAL NOT NULL,-- 最终卖价
    img1 VARCHAR(50),-- 细节图1
    img2 VARCHAR(50),-- 细节图2
    img3 VARCHAR(50),-- 细节图3
    img4 VARCHAR(50),-- 细节图4
    isdefault INT DEFAULT 0 NOT NULL,-- 是否商品的默认规格，1：默认，0：非默认
    isnew INT DEFAULT 0 NOT NULL,-- 是否新品，1：新品，0：非新品
    issale INT DEFAULT 0 NOT NULL,-- 是否热销，1：热销，0：非热销
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态，1：有效，0：无效
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);

-- 系列表（Category）
CREATE TABLE Category
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- ID号
    categoryname VARCHAR(50) NOT NULL,-- 系列名称
    summary VARCHAR(255),-- 系列介绍
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态，1：有效，0：无效
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);

-- 购物车（ShopCart）
CREATE TABLE ShopCart
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- id号
    userid INT NOT NULL,-- 用户id
    ruleid INT NOT NULL,-- 规格id
    num INT DEFAULT 1 NOT NULL,-- 数量
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态，1：有效，0：无效
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);


-- 订单表（Orders）
CREATE TABLE Orders
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- id号
    userid INT NOT NULL,-- 用户id
    addressid INT NOT NULL,-- 地址id
    remark VARCHAR(255),-- 备注
    total DECIMAL NOT NULL,-- 订单总金额
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    orderstate INT NOT NULL,-- 订单状态，1：待发货，2：待付款，3：已发货，4：已关闭，5：已完成
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);

-- 订单详情表（OrderDetail）
CREATE TABLE OrderDetail
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- Id号
    orderid INT NOT NULL,-- 订单表id
    ruleid INT NOT NULL,-- 规格id
    num INT NOT NULL,-- 数量
    price DECIMAL NOT NULL,-- 商品的价格
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);

-- 地址表（Address）
CREATE TABLE Address
(
    id INT PRIMARY KEY AUTO_INCREMENT,-- id号
    userid INT NOT NULL,-- 用户id
    shen VARCHAR(50) NOT NULL,-- 省
    shi VARCHAR(50) NOT NULL,-- 市
    qu VARCHAR(50) NOT NULL,-- 区
    jie VARCHAR(50) NOT NULL,-- 街道
    phone VARCHAR(20) NOT NULL,-- 收货人电话
    shouname VARCHAR(50) NOT NULL,-- 收货人姓名
    isdefault INT DEFAULT 0,-- 是否默认，1：默认，0：不默认
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,-- 创建时间
    state INT DEFAULT 1 NOT NULL,-- 状态，1：有效，0：无效
    delstate INT DEFAULT 1 NOT NULL -- 是否删除，1：未删除，0：已删除
);


