var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');// 日志处理
const session = require('express-session');
const redisStore = require('connect-redis')(session);//执行后返回的构造函数

// 两个路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
// 初始化app
var app = express();

// view engine setup（视图引擎设置，属于前端部分）
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 判断环境
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
// 处理post传入【数据类型为application/json】的数据，在router中req.body中直接查看
app.use(express.json());
// 效果同上，不过处理的数据类型是：x-www-form-urlencoded(表单数据)
app.use(express.urlencoded({ extended: false }));
// 解析cookie,经过处理之后就能在Router中使用req.cookies访问。
app.use(cookieParser());
// 静态文件处理，这是前后端不分离的处理方式
// app.use(express.static(path.join(__dirname, 'public')));


// session存入redis
const redisClient = require('./db/redis')
const sessionStore = new redisStore({
  client: redisClient
});

// 解析session
app.use(session({
  secret: 'ccavGl-47#',//加密session
  cookie: {
    // path: '/', // 在根路径生效（默认配置）
    // httpOnly: true,// 只能用http请求修改（默认配置）
    maxAge: 24 * 60 * 60 * 1000,//过期时间
  },
  store: sessionStore
}))

// 注册路由
// 这种拼接的方式能保证根路由后续修改的代价比较小
// app.use('/', indexRouter);
// app.use('/users', usersRouter)
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
// 对错误页处理（客户端）
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// 500错误页（服务端）
app.use(function (err, req, res, next) {
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
