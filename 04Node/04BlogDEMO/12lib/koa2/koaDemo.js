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