const express = require('express');
const path = require('path');

const app = express();

// 中间件对请求体进行解析
// 中间件是扩展express的功能，作用是在请求前、响应前做特定的操作
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析public下的静态HTML页面,测试四种请求时要将他注释掉
app.use(express.static('public'));

// 创建get路由 第一个参数是路径，这里的/是根路径
// app.get("/",(req,res)=>{
//   // res.send("this is express");

//   // Content-Type
//   // res.send("<h1>this is express<h1>");//text/html; charset=utf-8
//   // res.send({msg:"zoulam"});//application/json; charset=utf-8
//   // res.json({msg:"zoulam"});//application/json; charset=utf-8

//   // res.json(req.header('host'));//"localhost:4000"
//   // res.send(req.header('host'));//localhost:4000

//   // res.json(req.header('user-agent'));//"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
//   // user-agent："PostmanRuntime/7.26.2"

//   // res.json(req.rawHeaders);
// //   [
// //     "Content-Type",
// //     "application/json",
// //     "User-Agent",
// //     "PostmanRuntime/7.26.2",
// //     "Accept",
// //     "*/*",
// //     "Postman-Token",
// //     "2e9110cb-4dc4-477b-bc1f-a9578be87833",
// //     "Host",
// //     "localhost:4000",
// //     "Accept-Encoding",
// //     "gzip, deflate, br",
// //     "Connection",
// //     "keep-alive",
// //     "Content-Length",
// //     "25"
// // ]

// });


app.post('/contact', (req, res) => {
  //设置中间件就是为了解析这里的req.body
  // res.send(req.body);
  // 验证是否填入name
  // res.send(req.header('Content-Type'));//application/json
  if (!req.body.name) {
    return res.status(400).send('姓名为必填项');
  }
  res.status(201).send(`欢迎${req.body.name}`);
});


app.post('/login', (req, res) => {
  if (!req.header('x-auth-token')) {//x-auth-token是自定义的
    return res.status(400).send('没有令牌');
  }
  if (req.header('x-auth-token') !== '123456') {
    return res.status(401).send('没有权限');
  }
  res.send('登录成功');
});

// 创建博客
app.put('/post/:id', (req, res) => {
  //http://localhost:4000/post/1
  res.json({
    id:req.params.id,//"id":"1"
    title:req.body.title,
  });
});

app.delete('/post/:id', (req, res) => {
  res.json({
    msg: `博客${req.params.id}已经删除`,
  });
});

let port = 4000;
app.listen(port, () => {
  console.log(`url:http://localhost:${port}`);
});
