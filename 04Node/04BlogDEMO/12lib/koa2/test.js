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
