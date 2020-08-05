# 1、http请求

从浏览器输入一个URL到加载处页面，这个过程中发生了什么？

​	1、**（浏览器）**DNS解析【域名=>ip地址】，建立TCP连接【三次握手】，【处理本地缓存】，发送http请求

​	2、**（服务端）**server端接收到请求，处理并返回

​	3、**（客户端）**客户端接收到返回的数据，进行处理（渲染页面、执行js）

常见`request.body`文本类型

![文本类型](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200803230103168.png)

query 

​	（请求参数【string类型】）： a.html**?username=zoulam&password=123456**

​	[vueRouter的query和params](https://segmentfault.com/a/1190000012735168)

hash

​	(网页的锚点，定位网页位置【string类型】)：a.html**#12**

Form Data

​	当发起一次POST请求时，若未指定content-type，则默认content-type为application/x-www-form-urlencoded。即参数会以Form Data的形式进行传递，不会显式出现在请求url中。

Request Payload

​	当发起一次POST请求时，若content-type为application/json，则参数会以Request Payload的形式进行传递（显然的，数据格式为JSON），不会显式出现在请求url中。

## 	环境

```bash
nodemon #实时监控代码变化并运行
cross-env#设置环境变量
```

## 配置npm script

```json
    "dev":"cross-env NODE_ENV=dev nodemon ./bin/www.js", //打印日志在控制台
    "live":"cross-env NODE_ENV=production nodemon ./bin/www.js"//打印日志到文件
```

## 文件解构

```
-bin
	www.js :创建服务器逻辑（createServer）
-controller
	返回数据
-model：
	处理数据，返回操作状态给前端，监控操作的正确性
	正确返回 errno:0 错误返回 errno:-1
-router：路由管理，处理各种请求
	
-app.js：http设置的js文件：如设置query解析方式，响应头的文件格式，路由处理，返回对象给www.js……
	
```

## jsonAPI

```javascript
JSON.stringify(jsondata)// json=>string
 JSON.parse(jsondata)// json=>object
```

## callback hell

解决方式

yield（不常用）

promise then :适合同类型（重复性）异步操作

koa2

async await：合适不同类型（非重复性）的异步操作

## 模拟测试请求

postman

## API和router

> api：
>
> ​	前端和后端，不同端（子系统）之间对接的术语（语义：应用程序接口），包含以下内容
>
> ​		url（路由）：`/api/blog/list`  GET请求
>
> ​		输入
>
> ​		输出
>
> router
>
> ​	api的一部分，在后端代码中是一个文件夹的形式，是一个架构的分层（模块）

# 常见错误

1、当数据类型为object时不小心拼接了，就会造成无法输出实体内容，而是`[object, object]`

# 2、路由管理

# 3、mysql连接和增删查改操作

## workbench

字体设置`edit-->preferences-->Fonts&colors——>Fonts`

上方的圆筒是创建数据库（create schema）

create table：创建表

alte table：修改表

drop table：删除表

## 保证主键唯一的方案

[参考](https://zhuanlan.zhihu.com/p/140078865)

## other语句

```mysql
#查询版本
select version();
```



## 建表

[数据类型](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

主键：不能重复

AI（auto increment）：自增，即使被删除了的字段依然会占用，即可能不是从1开始

<img src="https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200804105734623.png" alt="表设计" style="zoom:50%;" />

LONGTEXT:不限制长度，限制文件大小**4G**以内

BIGINT：更大范围的整型，因为此处的时间精确到毫秒，作为整数超出int范围了

<img src="https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200804105923855.png" alt="表设计" style="zoom:50%;" />

## 增删查改语句

### 插入（新增）

```mysql
show databases;

#进入数据库,当表中的的键名与关键字冲突时使用``包裹
use myblog;
insert into users(username,`password`,realname) values('zoulam','123','祖拉木');
insert into users(username,`password`,realname) values('luluxi','123','露露');
```

### 查询

```mysql
#查询users表
select * from users;
#只查询users表中的id,username 列
select id,username from users;

#条件查询
#and
select * from users where username='luluxi' and `password`='123';
#or
select * from users where username='luluxi' or `password`='123';

#模糊查询
select * from users where username like '%lu%';

#顺序 此处的password可以不用加``
select * from users where password like '%1%' order by id;
#倒序
select * from users where password like '%1%' order by id desc;
```

### 更新

```mysql
#降低数据库的安全等级，不然无法进行修改，慎用
#SET SQL_SAFE_UPDATES=0;

#更新
#不带where就是修改全部
#update users set realname='张三';

update users set realname='张三' where username ='luluxi';
select * from users;
```



### 删除和软删除

> 软删除：
>
> ​	1、通过给表加入`INT`类型的`state`字段，并给予默认值`'1'`
>
> ​	2、通过将`state`字段修改成`'0'`达到软删除的目的
>
> ​	3、后续恢复只需要将`state`修改成默认值即可

```mysql
#不加条件就是删除表中全部内容
delete from users where username ='zoulam';
delete from users where username ='luluxi';

select * from users where state='1';

#用update'删除'表中内容
#并没有在表的实体中真正删除，只是改变了该数据的状态
#后续使用加入,就可以加入state参数过滤
#恢复的时候只要将状态修改获取即可
update users set state='0' where username ='luluxi';
select * from users where state='1';
#不等于
select * from users where state<>'0';
#恢复
update users set state='1' where username ='luluxi';
```

## 常见问题

**在过去的版本**一个中文需要2个`varchar()`，而1个`nvarchar()`就可以存储一个中文

如：`varchar(6)`只能存储3个中文，在5.0之后的版本可以存储6个中文或者6个英文字符

### 需要重置自增内容

[StackOverflow解决方案](https://stackoverflow.com/questions/8923114/how-to-reset-auto-increment-in-mysql)

```mysql
ALTER TABLE blogs AUTO_INCREMENT = 1;
```

## 连接

安装mysql连接库

`npm i mysql --save`

```javascript
const mysql = require('mysql');

// 创建连接数据库对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
});

// 开始连接
con.connect();


// 执行sql语句

const databaseOperation = (sql) => {
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}

// mysql的操作是异步的
const sql1 = 'select * from users;';
databaseOperation(sql1);

const sql2 = 'select username, password from users;';
databaseOperation(sql2);

const sql3 = `update users set realname='露露1' where username='luluxi';`;
//可以根据这两项（affectedRows: 1,  changedRows: 1）的值对数据操作结果进行正确性判断
databaseOperation(sql3);


const sql4 = "insert into users(username,`password`,realname) values('zhangsan','123','张三');";
//  affectedRows: 1,  changedRows: 0， insertId: 8,
databaseOperation(sql4);

//关闭连接
con.end();
```

![输出结果](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200804130455979.png)

## 封装成工具

将配置写入js文件中对象，用process监听命令传入的参数值，用以读取不同的配置，再将配置以对象的形式传入mysql中，将mysql操作用promise封装成exec函数导出到controller中使用，controller的方法再打包到router中进行与http交互，并通过model层中的class判断操作的状态。

# 4、cookie、session

## cookie

​	一条cookie最大是5kb，可以设置清理时间（即有效时间:`Expires/Max-Age`）

​	跨域不共享（被隔离）

​	以键值对形式存储：`k1=v1;k2=v2;k3=v3`

​		

​	每次发送http请求，会将**请求域**中的cookie发送给server端

​	server可以修改cookie并返回给浏览器

​	浏览器也可以修改cookie，但可以加以限制

> 下方的示例中蓝色线条代表的意思是taobao网页中加载了百度的一些服务，存储了对应的cookie，但不能将自己红色的线指向百度。

![跨域cookie](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200804204721793.png)

```javascript
document.cookie//查询cookie
document.cookie = 'k1=100;'//添加cookie，内容：k1=100;
```

### foreach、存储对象

```javascript
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));// 对数组中的每一个element执行一次function内的语句

let obj = {}

obj.a = 5;
obj[a] = 6;
```

### cookie操作

```javascript
// 获取cookie的过期时间
const getCookieExpries = () => {
    const d = new Date();
    //设置cookie一天失效到毫秒
    // GMT与北京时间相差8个小时
    d.setTime(d.getTime() + ((24 + 8) * 60 * 60 * 1000));
    console.log('GMT: ', d.toGMTString());
    return d.toGMTString()
}


                // 操作cookie
                // 生效范围：path=/
                // 只允许通过http协议修改：httpOnly
                res.setHeader('Set-Cookie', `username=${value.username}; path=/; httpOnly; expires=${getCookieExpries()}`)
```

### cookie的缺陷

> 1、可以通过浏览器直接查看，暴露用户信息，不安全（即应该存放密文，或者数据库生成的id）
>
> 2、cookie存储容量小

## Session

> 存储在服务器，存储关键信息，存储容量没有限制，安全可靠（让密文信息不会暴露到cookie）



> 主体逻辑：
>
> ​	从cookie中取出`userid`并让session接收，取出`userid`中对应的账号密码，达到验证登录的效果。
>
> 代码逻辑：
>
> ​	有两个内容需要创建： `req.cookie.userid`  和`SESSION_DATA[userId]`
>
> ​			两者以 `userid = userId` 的形式存储
>
> ​		
>
> | 情况                                                         | 处理                                                      |
> | ------------------------------------------------------------ | --------------------------------------------------------- |
> | `req.cookie.userid`存在 `SESSION_DATA[userId]` 存在          | 不做任何处理，将`SESSION_DATA[userId]`存储到session实体中 |
> | `req.cookie.userid`**不**存在 `SESSION_DATA[userId]` 存在    | `needSetCookie = false` 在下方生成`cookie.userid`         |
> | `req.cookie.userid`存在 `SESSION_DATA[userId]` **不**存在    | 生成`userId`                                              |
> | `req.cookie.userid`**不**存在 `SESSION_DATA[userId]` **不**存在 |                                                           |
>
> 

```javascript
// app.js
// session数据
const SESSION_DATA = {}



 // 解析session 取出cookie中的userid
// 当cookie中不存在cookie时将needSetCookie设置为true
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};//不存在就初始化成对象
        }
                // 还有一种情况就是cookie中存在userId，SESSION_DATA[userId]也不是空对象，这种情况是不哟个做出任何处理的
    } else {
        
        // 创建随机id
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {};//不存在就初始化成对象
    }
    req.session = SESSION_DATA[userId];//存储到req.session


    if (needSetCookie) {
        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpries()}`)
    }

// 将登录的密文信息存储到cookie
                req.session.username = value.username
                req.session.realName = value.realName
```

## redis-session

### 进程和线程

> 看了一遍排在前面的答案，类似”**进程是资源分配的最小单位，线程是CPU调度的最小单位“**这样的回答感觉太抽象，都不太容易让人理解。
>
> ​	*进程是一个软件（程序）的运行时，线程是进程的一个任务*
>
> 做个简单的比喻：进程=火车，线程=车厢
>
> - 线程在进程下行进（单纯的车厢无法运行）
>
> - 一个进程可以包含多个线程（一辆火车可以有多个车厢）
>
> - 不同进程间数据很难共享（一辆火车上的乘客很难换到另外一辆火车，比如站点换乘）
>
> - 同一进程下不同线程间数据很易共享（A车厢换到B车厢很容易）
>
> - 进程要比线程消耗更多的计算机资源（采用多列火车相比多个车厢更耗资源）
>
> - 进程间不会相互影响，一个线程挂掉将导致整个进程挂掉（一列火车不会影响到另外一列火车，但是如果一列火车上中间的一节车厢着火了，将影响到所有车厢）
>
>     **注：**Java的多线程之间是不影响的
>
> - 进程可以拓展到多机，进程最多适合多核（不同火车可以开在多个轨道上，同一火车的车厢不能在行进的不同的轨道上）
>
>     **注：**多进程和多线程都是充分利用多核CPU的，显然线程更多，对多核CPU使用更充分
>
> - 进程使用的内存地址可以上锁，即一个线程使用某些共享内存时，其他线程必须等它结束，才能使用这一块内存。（比如火车上的洗手间）－"互斥锁"
>
> - 进程使用的内存地址可以限定使用量（比如火车上的餐厅，最多只允许多少人进入，如果满了需要在门口等，等有人出来了才能进去）－“信号量”
>
> 作者：biaodianfu
> 链接：https://www.zhihu.com/question/25532384/answer/411179772
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。







> ​	过多的session会让进程内存爆掉，而且实际项目中的运行方式是多进程（**用户访问是根据进程的空闲程度分配的**）的形式，即可能会造成需要存储多份session的可能，为了解决这个问题，应该将session存入redis。

mysql：访问慢（硬盘数据库）、便宜

redis：访问快（内存数据库）、昂贵

> 所以选用Redis存储
>
> ​	session的访问频繁，对性能要求高；
>
> ​	且不担心丢失（断电丢失），存储的都是临时信息，丢失了重新输入即可；
>
> ​	**注：**redis数据库可以通过配置之后断电不丢失数据，但是数据恢复很麻烦
>
> ​	数据量小，占用空间小。

### 安装

[菜鸟教程](https://www.runoob.com/redis/redis-install.html)

### redis操作

```bash
redis-server.exe #启动服务 exe的文件名可以不用打
redis-cli.exe#进入线程
redis-cli.exe -h 127.0.0.1 -p 6379#进入线程，如果修改了默认进程可以从启动服务的地方看到
set name zoulam #设置键值对
get name #取出值
key *#查看所有键名
del name#删除
```

### nodejs操作redis

```
npm i redis --save
```



## 6、nginx

> 前后端联调、反向代理

# 7、stream

# 8、PM2部署