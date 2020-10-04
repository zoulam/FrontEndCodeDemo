const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')


const { REDIS_CONF } = require('./config/db');
//  检测app 的错误，error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // 日志记录服务耗时
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 判断环境
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

// session配置
app.keys = ['ccavGl-47#'];
app.use(session({
  //配置cookies
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  //配置redis
  store: redisStore({
    // all: '127.0.0.1:6379'
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))


// routes
// allowedMethods 处理非正常请求
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
