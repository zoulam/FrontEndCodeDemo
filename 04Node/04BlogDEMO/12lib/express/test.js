const express = require('./expressdemo')

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