# koa2

安装脚手架

`npm install koa-generator -g`

初始化目录

`Koa2 [projectName]`

启动

`npm install & npm run dev`

安装适配环境变量的包

`npm i cross-env --save-dev`

## 不同点

> context 上下文
>
> koa相较于express框架引入了新语法：async和await，书写代码更加舒适，可读性更佳，不会出现原来的一坨回调函数

**req,res => ctx(context)**

`res.json(xx)`   `ctx.body=xx`

所有的中间件都写成了 async函数

# 功能复现

## 登录

`koa-generic-session` 和 `koa-redis`

```javascript
const session =require('koa-generic-session');
const redisStore = require('koa-redis');


// session配置只要在路由处理前就可以了
app.keys = ['ccavGl-47#'];
app.use(session({
  //配置cookies
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  //配置redis
  store:redisStore({
    all:'127.0.0.1:6379'
  })
}))
```

## 路由开发

`npm i mysql xss --save`

## 错误

端口冲突，跟前面的一样

`nginx`3001

 `redis`6379

 `mysql `3306

`前端`8080

`后端`8000

## 日志

`npm i koa-morgan`

```javascript
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
   // 开发/测试环境
  // 处理日志，需要自行配置
  // app.use(morgan('dev', {
  //   stream: process.stdout
  // }));
  app.use(morgan('dev'));
} else {// 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}
```

#  中间件的实现

> `app.use` 不涉及**请求方法、请求路径**的判断。
>
> `router` 统一处理路由

## 关于洋葱模型

```javascript
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log("1、注册日志中间件");
    await next();
    console.log("6、打印日志");
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    console.log("2、记录响应时间");
    const start = Date.now();
    await next();
    console.log("5、存储响应时间");
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
    console.log("3、处理响应……");
    ctx.body = 'Hello World';
    console.log("4、响应完成");
});

app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
});
```

![打印结果](C:/Users/zoulam/AppData/Roaming/Typora/typora-user-images/image-20200812203718603.png)

## 最小实现

```JavaScript
const http = require('http');

// 组合中间件
function compose(midWareList) {
    // 形成闭包
    return function (ctx) {
        // 执行中间件
        function dispatch(i) {
            const fn = midWareList[i]
            try {
                // 实现兼容，防止传入的中间件不是 async函数
                return Promise.resolve(
                    // dispatch.bind(null, i + 1) 这就next的执行机制，
                    // 即取出下一个中间件
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (error) {
                return Promise.reject(error)
            }
        }

        return dispatch(0)// 初始化内存中闭包
    }
}


class koa2 {
    constructor() {
        this.midWareList = []
    }

    use(fn) {
        this.midWareList.push(fn)
        return this
    }

    handleRequest(ctx, fn) {
        return fn(ctx)
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        }

        // 实际源码
        // ctx.query = req.query ……
        return ctx;
    }

    calllback() {
        const fn = compose(this.midWareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.calllback())
        server.listen(...args)
    }
}

module.exports = koa2
```

## 演示代码

```javascript
const koa2 = require('./koaDemo');
const app = new koa2();

// logger

app.use(async (ctx, next) => {
    console.log("1、注册日志中间件");
    await next();
    console.log("6、打印日志");
    // const rt = ctx.response.get('X-Response-Time');
    const rt = ctx['X-Response-Time'];
    // console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    console.log("2、记录响应时间");
    const start = Date.now();
    await next();
    console.log("5、存储响应时间");
    const ms = Date.now() - start;
    // ctx.set('X-Response-Time', `${ms}ms`);
    ctx['X-Response-Time'] = `${ms}ms`;
});

// response

app.use(async ctx => {
    console.log("3、处理响应……");
    ctx.res.end('Hello World');
    console.log("4、响应完成");
});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
```

# PM2

英文名是 **process manager** 进程管理者

> 1、保证服务器的稳定性**（进程守护，系统崩溃自动重启）**
>
> 2、充分利用服务器硬件资源，以便提高性能**（启动多进程，充分利用CPU和内存）**
>
> 3、线上日志记录 【访问日志、错误日志、自定义日志】**（自带日志记录功能）**

`npm i pm2 -g`

## 常用命令

[more](https://www.npmjs.com/package/pm2)

```bash
pm2 start app.js
# 启动app进程 还可以让他读取配置文件

pm2 --version
# 查看版本

pm2 list
# 列出当前的启动的进程列表

# / 表示或
pm2 restart <AppName>/<id>
# 手动重启进程

pm2 stop <AppName>/<id>，pm2 delete <AppName>/<id>
# 停止进程 删除进程

pm2 info <AppName>/<id>
# 查看进程基本信息

pm2 info <AppName>/<id>
# 查看进程日志打印

pm2 monit <AppName>/<id>
# 进程使用cpu和内存的信息 分析程序层面的问题，而非服务器层面（运维人员负责）
```

Windows在控制台打开文本文件

`type 文件路径`

乱码问题，设置编码为UTF-8： `chcp 65001`

[进入注册表永久修改](https://blog.csdn.net/quzhongxin/article/details/45336333)

Mac or Linux

`cat 文件路径` 需要编辑则直接使用vi 或者vim

## 自定义配置文件

`pm2 start pm2.conf.json`

```json
{
  "apps": {
    "name": "pm2-test", // 服务名
    //"scrpit": "index.js", // 启动的文件,旧版
    "exec": "index.js",
    "watch": true, // 监听文件变化自动重启,实际上线文件应该手动重启比较合理
    "ignore_watch": [
        "node_modules",
        "logs"
    ],
    "instances":4,//设置多进程
    "error_file":"logs/err.log",//指定错误日志文件目录
    "out_file":"logs/out.log",
    "log_date_format":"YYYY_MM_DD HH:mm:ss"//添加日志时间戳
  }
}
```

## 多进程

> 操作系统会限制单个进程的内存占用，使用多进程是为了充分利用硬件资源（内存、CPU的多核），但也会带来进程间内存无法共享的问题
>
> 进程之间共享数据

# 压测