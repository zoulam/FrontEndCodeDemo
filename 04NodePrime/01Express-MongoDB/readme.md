# MongoDB

[视频教程（非本人，我也只是从那里学的）](https://www.bilibili.com/video/BV1wf4y1279C)

[MDN 教程](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs)

## 入门介绍

文档格式：类似于 json

![image-20200724091657814](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724091657814.png)

![image-20200724091746572](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724091746572.png)

![image-20200724091804520](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724091804520.png)

![image-20200724091832423](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724091832423.png)

文档-----表（table）中的记录

集合-----表

![image-20200724091915677](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724091915677.png)

![image-20200724091954728](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724091954728.png)

默认路径`C:\Program Files (x86)`

![image-20200724092545722](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724092545722.png)

一些信息：

默认端口：`27017`

`mongondb://localhost:27017`

数据库的简单设计

![image-20200724093254126](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724093254126.png)

![image-20200724093318118](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724093318118.png)

## 增删查改

```bash
use myblog
#进入myblog数据库，没有则创建名字为myblog的数据库


db
#查看当前数据库名称


#增
db.postCollection.insertOne({})


#找 key属性的引号是可以省略的
db.postCollection.find({})
#查找普通值
db.postCollection.find({ title: "Mongo Prime"})
#查找对象的值
db.postCollection.find({"author.name":"zoulam"})


#改update，两个参数：1、文档 2、属性
#修改一条
db.postCollection.updateOne({title:"Mongo Prime"},{$set:{title:"MongoDB Prime"}})
db.postCollection.updateOne({"title" : "MongoDB Prime"},{$set:{"title":"MongoDB Prime1"}})
#修改所有满足条件的数据
db.postCollection.updateMany({"author.avatar":""},{$set:{"author.avatar":"https://avatars0.githubusercontent.com/u/55095160?s=460&u=99625dece08b94f87202295ca65a4afbd373bb3a&v=4"}})


#删 delete  参数:ObjectId
 db.postCollection.deleteOne({"_id" : ObjectId("5f1a3d0c46723bebf80eb179")})
db.postCollection.deleteMany()
```

```bash
#添加表一
db.postCollection.insertOne({
    title: "Mongo Prime",
    author:{
        name:"zoulam",
        avatar:"https://avatars0.githubusercontent.com/u/55095160?s=460&u=99625dece08b94f87202295ca65a4afbd373bb3a&v=4"
    },
    createAt:"2020-7-24",
    content:"MongoDB 的小demo",
    comments:[
        {
            user:"lulu",
            comment:"nice"
        },
        {
            user:"lala",
            comment:"unbad"
        }
    ]
})

#添加表二
db.postCollection.insertOne({
    "title": "Node.js Prime",
    "author":{
        "name":"zoulam",
        "avatar":""
    },
    "createAt":"2020-7-24",
    "content":"MongoDB 的小demo",
    "comments":[
        {
            "user":"lulu",
            "comment":"nice"
        },
        {
            "user":"lala",
            "comment":"unbad"
        }
    ]
})
```

![image-20200724094149106](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724094149106.png)

![image-20200724101311237](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200724101311237.png)

[mongodbGUI 操作](https://robomongo.org/)

# Express+MongoDBAPI

MVC：model view controller

MVP：model view presenter（松散的控制器，中文意思有：主持人，主要角色）

MVVM：model view view model （现在主要应用在前端领域，Vue、React（反应、响应）、Angular）

[express 官方网站](https://expressjs.com/)

## ①install mongodb driver and config

```bash
npm i express mongodb --save
```

```javascript
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "myblog";
let _db = null;

async function connectDb() {
  if (!_db) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      await client.connect();
      _db = await client.db(dbName);
    } catch (error) {
      throw "连接到数据库出错";
    }
  }
  return _db;
}

exports.getCollection = (collection) => {
  let _col = null;
  return async () => {
    if (!_col) {
      try {
        const db = await connectDb();
        _col = await db.collection(collection);
      } catch (error) {
        throw "选择 collection 出错";
      }
    }
    return _col;
  };
};
```

## ②express 简要介绍

![最小可用框架](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200729103018193.png)

> 项目创建
>
> ```bash
> mkdir express-prime
> cd express-prime
> npm init -y #yarn init -y
> npm install express#yarn add express
> code .  #使用vscode打开代码
> ```

| 方法（`const app = express();`）          | 效果            |
| ----------------------------------------- | --------------- |
| request:请求 response：响应               |                 |
| `app.listen(port,()=>{})`                 | 指定监听端口    |
| `app.get("/",(req,res)=>{res.send('')});` |                 |
| `app.post();`                             |                 |
| `app.put("/:id",()=>{});`                 |                 |
| `app.delete("/:id",()=>{});`              |                 |
| `res.send()`                              | 发送响应内容    |
| `res.status(201).send()`                  | 发送状态码      |
| `req,body`                                | 请求体          |
| `req.params.id`                           | url 设置的`:id` |
| **子路由**                                |                 |
| `app.use("/post",()=>{})`                 |                 |
|                                           |                 |
|                                           |                 |
|                                           |                 |
|                                           |                 |

```javascript
const express = require("express");
const app = express();
const routes = require("./routes");
const port = 3000;

app.use(express.json());

routes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log("收到请求体：", req.body);
  res.status(201).send();
});

app.put("/:id", (req, res) => {
  console.log("收到请求参数，id 为：", req.params.id);
  console.log("收到请求体：", req.body);

  res.send();
});

app.delete("/:id", (req, res) => {
  console.log("收到请求参数，id 为：", req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
```

## ③ 子路由（`/routes/post.js`）

| 方法（`var route = express.Router();`） | 效果 |
| --------------------------------------- | ---- |
|                                         |      |
|                                         |      |
|                                         |      |
|                                         |      |

```javascript
const express = require("express");
var route = express.Router();

// 获取服务器资源
route.get("/", (req, res) => {
  res.send({ id: 1, title: "express 入门教程" });
});

route.post("/", (req, res) => {
  console.log("保存文章", req.body);
  res.status(201).send({ id: 2, ...req.body });
});
// 添加服务器资源
route.put("/:id", (req, res) => {
  console.log("收到请求参数，文章id 为：", req.params.id);
  console.log("收到请求体，新的文章内容为：", req.body);

  res.send({ id: req.params.id, ...req.body });
});
// 删除服务器资源
route.delete("/:id", (req, res) => {
  console.log("收到请求参数，文章id 为：", req.params.id);
  res.status(204).send();
});

module.exports = route;
```

## ④ 当有多个子路由时

为了防止`app.js`文件过于庞大，在 router 文件夹下创建`index.js`统一挂载子路由

```javascript
const post = require("./post");
module.exports = (app) => {
  app.use("/post", post);
};
```

## ⑤ 数据库写入时安全性校验
