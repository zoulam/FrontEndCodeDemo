// const Koa = require('koa');

// const app = new Koa();
// const PORT = 3000;

// // #1
// app.use(async (ctx, next)=>{
//     console.log(1)
//     await next();
//     console.log(1)
// });
// // #2
// app.use(async (ctx, next) => {
//     console.log(2)
//     await next();
//     console.log(2)
// })

// app.use(async (ctx, next) => {
//     console.log(3)
// })

// app.listen(PORT);
// console.log(`http://localhost:${PORT}`);


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