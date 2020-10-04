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

> app.use
>
> next 参数

```javascript
const express = require('express');

// 本次http请求的实例
const app = express();

app.use((req, res, next) => {
    console.log('请求开始……', req.method, req.url);
    next()
})

app.use((req, res, next) => {
    // 假设在这里处理cookie
    req.cookie = {
        userId: 'abc123'
    }
    next()
})

app.use((req, res, next) => {
    // 假设在这里处理post data
    // 异步
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
})

/**
 * 中间件处理的层级（还有其他不常用的组合未列出）
 *  所有页面                                                    app.use(()=>{next()})
 *      根路由                                                  app.use('/root',()=>{next()})
 *          根路由的指定请求(此处的实例是get请求)                 app.get('/root',()=>{next()})
 *              指定路由的指定请求                               app.get('/root/user/login',()=>{})
 *
 *  use（不含路由）的中间件
 *  顺序调用，用next()逐个向下，没有next则停止不再访问下一个中间件
 *
 *  use（根路由）的中间件
 *  路由命中则访问，没命中则不访问
 *
 * http请求名：get、post
 * 请求需要满足router相同、请求方法相同才能访问
*/
app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由');
    next()
})

app.get('/api', (req, res, next) => {
    console.log('/api 路由 get请求');
    next()
})


app.post('/api', (req, res, next) => {
    console.log('post /api 路由');
    next()
})

// 模拟登录中间件
function loginCheck(req, res, next) {
    // console.log('模拟登录成功');
    // setTimeout(() => {

    //     next()
    // })

    console.log('模拟登录失败');
    setTimeout(() => {
        res.json({
            erron: -1,
            data: 'login failure'
        })
        // 失败后就不再继续next了，这样就不会访问到不该访问的数据
    })
}

// 添加登录中间件
app.get('/api/get-cookies', loginCheck, (req, res, next) => {
    console.log('/api/get-cookies 路由 get 请求');
    res.json({
        erron: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log('/api/get-post-data 路由 post请求');
    res.json({
        erron: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理 404');
    res.json({
        erron: -1,
        data: '404 not found'
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})
```

## express重构原始代码

> `npm i mysql xss express-session redis connect-redis --save `

## 重写路由层

> 登录中间件和用户路由略

```javascript
var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const { successModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../midware/loginCheck');

// 获取博客列表
router.get('/list', (req, res, next) => {
    // 从query中获取信息
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
        // 管理员界面
        // 未登录
        if (req.session.username == null) {
            res.json(new ErrorModel('未登录'))
            return
        }
        // 强制登录自己的博客
        author = req.session.username;
    }


    // 接收到的数据是Promise对象
    const result = getList(author, keyword);
    return result.then((listData) => {
        res.json(new successModel(listData));
    });
});
// 获取博客详情
router.get('/detail', (req, res, next) => {
    // （因为http不支持json文本）自动转义json成为string，并且给定响应的文件类型
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(new successModel(data))
    });
});

// 新建博客,插入登录验证中间件
router.post('/new', loginCheck, (req, res, next) => {
    // （因为http不支持json文本）自动转义json成为string，并且给定响应的文件类型

    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
        res.json(new successModel(data));
    });
});

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body);
    return result.then(value => {
        if (value) {
            res.json(new successModel());
        } else {
            res.json(new ErrorModel('更新博客失败'));
        }
    });
});

// 删除博客
router.post('/del', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = deleteBlog(req.query.id, req.body.author);
    return result.then(value => {
        if (value) {
            res.json(new successModel());
        } else {
            res.json(new ErrorModel('删除博客失败！'));
        }
    })
});


module.exports = router;
```

## morgan日志

[morgan 参数内容](https://github.com/expressjs/morgan) 访问该网页搜索关键词 Predefined Formats

```javascript
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {  // 开发环境
  // 处理日志，需要自行配置
  app.use(logger('dev', {
    stream: process.stdout
  }));
} else {// 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}
```

# express中间件原理

> app.use用来注册中间件，先收集起来【判断类型，string/callback】
>
> 遇到http请求，根据path和method判断触发哪些【if else】
>
> 实现next机制，即上一个通过next触发下一个【yield】

> **代码流程**
>
> ​	1、处理传入的参数，根据分割成`路由`和`中间件`，
>
> ​	2、做出路由匹配并处理，
>
> ​	`match`:实现路由命中规则，【只要包含就能命中】
>
>  	`handle`  ：实现next机制，递归使用，直到中间件函数中不存在`next()`
>
> ​	`callback` :设置http请求，包括：解析cookie、解析session、解析json【res.json()】……
>
> ​	`listen`：创建http服务器并监听

```javascript
const http = require('http');
const slice = Array.prototype.slice;


class LikeExpress {
    constructor() {
        this.routes = {
            all: [], // app.use注册
            get: [], // app.get
            post: [] // app.post
        }
    }

    // 通用注册函数
    register(path) {

        // info.path 用于接收传入的路由参数
        // info.stack 用于存放中间件
        //  然后再push到相应的routes数组中
        const info = {}

        if (typeof (path) === 'string') {// 有路由时
            info.path = path;
            // 从第二参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1);
        } else {// 无路由时
            info.path = '/';
            // 从第一参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 0);
        }
        return info;
    }

    // use get post 使用register函数，对传入的参数做出处理，将路由和中间件函数分割
    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    // 匹配中间件
    match(method, url) {
        let stack = [];
        if (url === 'favico.ico') {//网页图标
            return stack//不处理
        }

        // 获取当前routers
        let curRoutes = [];
        // use注册中间件所有网页都需要处理
        curRoutes = curRoutes.concat(this.routes.all)
        // 根据请求的方法拼接内容
        curRoutes = curRoutes.concat(this.routes[method])

        // 传入的url与路由相同
        curRoutes.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path === 0)) {
                // url === '/api/get-cookie' routeInfo.path === '/'
                // url === '/api/get-cookie' routeInfo.path === '/api'
                // url === '/api/get-cookie' routeInfo.path === '/api/get-cookie'
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack

    }


    // 实现next机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            // 一直执行，知道midWare为空
            let midWare = stack.shift()
            if (midWare) {
                // 递归实现
                // 中间件的参数中也传入next函数
                // 执行中间件的时候会再次执行next函数
                midWare(req, res, next)
            }
        }
        next();
    }

    // callback ，这里类似于前面无框架开发的app.js做的事情，实际内容肯定不止这些
    // 1、设置http请求 （解析cookie、解析session、解析json【res.json()】）
    // 2、是判断路由和请求，然后执行  handle
    // 3、处理完成的next流程
    callback() {
        return (req, res) => {
            // 自定义json解析函数
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }

            const url = req.url;
            const method = req.method.toLowerCase();

            // 解析请求和url
            const resultList = this.match(method, url)

            // resultList 中间件实体 数组形式
            this.handle(req, res, resultList);
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        // 遵从node.js原生的http
        server.listen(...args)
    }
}

// 工厂函数
module.exports = () => {
    return new LikeExpress();
}
```


