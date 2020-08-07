# 7、stream-日志

access log ：访问日志

stream（流）的读写速度比较快，如：观看视频时不用全部缓存就能观看，比起io节约资源

> ​	不选择数据库存储日志原因，文件大，不存在明显的表结构，文本的读取不像数据库文件需要环境支持（指mysql客户端）

![stream拷贝文件](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200806130130368.png)

![stream读取文件](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200806130212782.png)

## 日志环境问题

根据进程中输入的env判断环境，开发环境打印到控制台，生产环境写入到文件

## 拆分日志

> 按时间拆分，按天，按月等

实现方式：Linux的crontab（定时任务）

`*****command`

`*`的含义从左至右：分钟、小时、日期、月份、星期

**在Windows环境下可以用git安装的bash来执行shell**

```shell
#!/bin/sh
#首行代码是标明文件是shell脚本，在linux中是没有文件类型概念的
cd F:/Code/vscode/FrontEndCodeDemo/04NodePrime/04BlogDEMO/04blog1/logs
# 拷贝并重命名
# $(data +%Y-%m-%d-%H) 获取当前时间精确到小时
cp access.log $(date +%Y-%m-%d).access.log
# 清空原文件
echo "">access.log

# 日志脚本地址
# cd F:/Code/vscode/FrontEndCodeDemo/04Node/04BlogDEMO/04blog1/src/utils/copy.sh
```

运行：`sh 文件名.sh`

`crontab` 命令gitbash就没有提供了

> 命令含义：在每天的0小时就执行copy.sh脚本

```
* 0 * * * sh F:/Code/vscode/FrontEndCodeDemo/04NodePrime/04BlogDEMO/04blog1/src/utils/copy.sh
```

`crontab -l`:查看设置了什么任务

## 日志分析

> 按行分析

nodejs stream 的readline

# 安全

## sql注入：

> 窃取、删除、修改数据库内容

​	post请求内容拼接成一段sql片段，达到操作数据库的效果

```mysql
select username,realname from users where username='zoulam' and password='123'

#sql 注入代码
#登录
select username,realname from users where username='zoulam' -- and password='1'

#删除数据库
select username,realname from users where username='zoulam'; delete from users; -- and password='123'
```

​		即只要输入帐号`zoulam' -- ` 不用使用正确密码就能登录

​		`'; delete from users; --`删除users表

### 解决方式

​	mysql的escape函数处理输入内容即可

```javascript
   // mysql.escape
    username = escape(username)
    password = escape(password)
// sql语句不用引号
// select username,realname from users where username='${username}' and password='${password}'
select username,realname from users where username=${username} and password=${password}
```

```mysql
select username,realname from users where username='zoulam' -- and password='1'
# escape后,进行转义
select username,realname from users where username='zoulam\' -- 'and password='1'
```

## xss攻击：

> 解决范围：只要是用户输入的内容都需要小心这点

> 窃取前端cookie，在**展示**页面中加入js代码，以获取网页信息,
>
> ​	危险：别人访问它的页面时它可以获取（其他）用户信息
>
> 解决方案转义生成js的特殊字符

```javascript
<script>alert(document.cookie)</script>
处理后
&lt;script &gt;alert(document.cookie)&lt; script&gt;
```

### 解决方式

`npm i xss --save`

```javascript
const xss = require('xss');
const title = xss(blogData.title);
```



## 密码加密（crypto）：

使用密文转义等方式加密

### md5加密

```javascript
const crypto = require('crypto');

// 密钥
const SECRET_KEY = 'WCcbN_123#C'

// md5加密

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str);
}

console.log(genPassword(123));//5a22e96006cb2ecf8145a58481ab0ae6
console.log(genPassword(456));//f988b842a534743d498c0734dec6e514
console.log(genPassword(123));//5a22e96006cb2ecf8145a58481ab0ae6
console.log('5a22e96006cb2ecf8145a58481ab0ae6'.length);//32

module.exports = {
    genPassword
}
```



## ddos攻击：

硬件支持（封禁ip）、或者云服务商提供支持（略）

# express

`npm i express-generator -g`

`express [project-name]`

创建完成之后就进入该目录

`npm install & npm run start` 或者`SET DEBUG=[project-name]:* & npm start`

`npm i nodemon cross-env --save-dev`

```
前端部分文件：
    public ---静态文件
    views---html模板
```

## app.js文件分析

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');// 日志处理

// 两个路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 初始化app
var app = express();

// view engine setup（视图引擎设置，属于前端部分）
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// 处理日志，需要自行配置
app.use(logger('dev'));
// 处理post传入【数据类型为application/json】的数据，在router中req.body中直接查看
app.use(express.json());
// 效果同上，不过处理的数据类型是：x-www-form-urlencoded(表单数据)
app.use(express.urlencoded({ extended: false }));
// 解析cookie,经过处理之后就能在Router中使用req.cookies访问。
app.use(cookieParser());
// 静态文件处理，这是前后端不分离的处理方式
// app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 对错误页处理（客户端）
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 500错误页（服务端）
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  /**
   * 环境是dev则返回错误，
   * 否则（生产环境）返回空对象，
   * 当然也可以返回错误，说不定用户会帮你解决
  */
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

## 路由

> express中间件解析json和x-www-form-urlencoded(表单数据）

```JavaScript
router.get('/detail', function (req, res, next) {
    // （因为http不支持json文本）自动转义json成为string，并且给定响应的文件类型
    res.json({
        errno: 0,
        data: {
            luluxi:'cat'
        }
    })
});

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    res.json({
        errno: 0,
        data: {
            username,
            password
        }
    })
});
```



## 好用的插件

opn 打开浏览器页面

## 中间件

app.use

next 参数

# 8、PM2部署