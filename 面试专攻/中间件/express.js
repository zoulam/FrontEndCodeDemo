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