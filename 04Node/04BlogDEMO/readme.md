![demo架构图](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200802141851729.png)

> ECMAScript
>
> ​	规定语法
>
> JavaScript
>
> ​	ECMAScript+WEBAPI
>
> ​	WEBAPI:bom、dom、事件绑定、ajax等
>
> Node.JS
>
> ​	ECMAScript+nodejsAPI
>
> ​	nodejsAPI：网络请求、文件操作等

# 0、node、npm

## node

```bash
node -v 	#查看版本

npm -v 	#查看版本

npm config ls -l 	#查看配置信息，镜像配置，全局配置……
npm config list -l  #效果同上

npm root -g 	#查看全局地址（或者说是文件目录）

npm config set prefix "F:\NODE_MODULE\node_global"	#设置全局地址
npm config set cache "F:\NODE_MODULE\node_cache"	#社会之缓存地址
```

### 配置环境变量

> 保证安装在全局的包命令能在任意文件夹下使用

![全局配置](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200803092737809.png)

```bash
npm i @vue/cli 4.4.6 -g #全局安装@vue/cli 4.4.6 
vue --version #任意文件夹下使用全局vue版本查看
```



## npm

```bash
npm init           	#对文件进行npm初始化(创建node_modules文件夹并新建json文件)，全部摁Enter键默认选项
npm init -y  	#全部选yes

rm -rf node_modules/  #删除node_modules文件夹

npm install            #局部安装package.json指定的依赖

npm install  vue -g		#在全局文件夹下安装vue依赖包

npm install vue			#安装vue依赖包，逻辑：先检查全局文件夹下是否存在vue文件，有则复制粘贴，无则下载

cnpm install xx			#用镜像网站安装xx，会出现json文件没有数据的情况

cnpm install xx --save	#安装xx包，并在package.json补全依赖信息

npm uninstall xx		#卸载指定依赖
```

## nvm node版本管理工具

MacOS： `brew install nvm`

Windows： [GitHub下载地址](https://github.com/coreybutler/nvm-windows)

### 基本命令

```bash
#查看配置
nvm list

#下载指定版本
nvm install [版本号]

# 切换版本
nvm use --delete-prefix [版本号]
```

## 配置文件详解

## common.js

```javascript
// 直接导出
 module.exports =function add(a, b) {
    return a + b;
}

function muti(a, b) {
    return a - b;
}

// 变量名导出
 module.exports = add;

// 对象导出
module.exports = {
    add,
    muti
}
```



```JavaScript
// b.js
// 按需导入 可以省略文件类型
// const add = require('./a').add;
// const muti = require('./a').muti;


// 全部导入
// const opt = require('./a');
// const add = opt.add;
// const muti = opt.muti;

//解构语法导入
const { add, muti } = require('./a');
const _ = require('lodash');
console.log(add(10, 20));//30
console.log(muti(10, 5));//5
console.log(_.concat([1, 2], 3));

```

### 直接执行

```javascript
// 执行其他的代码
// b.js
require('./a')
console.log('b:helloworld);
   
// a.js
console.log('a:helloworld);            
```

### 外部添加内容

```

```



## debug

### vscode

> 创建跟package.json文件内的main同名的js文件，默认是index.js
>
> 设置断点，点击F5选择nodejs debug的task
>
> 悬停在引入内容（变量）上即可查看内部有什么API
>
> 左侧
>
> ​	变量
>
> ​	监视
>
> ​	调用堆栈
>
> ​	断点
>
> 控制台处：
>
> ​	debug console

```bash

```

### 浏览器debug

# 开发经验

## server端简述

> 1、服务稳定性：服务优先，不能挂
>
> ​	server端可能会遭受各种恶意攻击和误操作
>
> ​	单个客户端可以意外挂掉，但是服务端不能
>
> ​	PM2做进程守护（挂掉自动重启），保证服务端的稳定性
>
> 2、考虑内存、CPU（优化和扩展）
>
> ​	server承载大量请求，CPU和内存都是稀缺资源，优化能够节约大量成本
>
> ​	stream写日志（节约内存和CPU），使用redis存session（扩展）
>
> 3、日志记录
>
> ​	server端需要记录日志、存储日志、分析（监控）日志
>
> ​	记录峰值信息，发现性能瓶颈，进行优化，或者简单观测用户行为
>
> 4、安全
>
> ​	XSS【跨站脚本攻击】攻击、SQL注入……、越权操作
>
> 5、集群和服务拆分（高并发、高PV）
>
> ​	产品发展速度快，流量迅速增加，设备性能出现不足
>
> ​	解决方案：通过扩展机器和服务拆分来承载大流量
>
> ​	PV（page view）
>
> ​	即页面浏览量或点击量，用户每1次对网站中的每个网页访问均被记录1个PV。用户对同一页面的多次访问，访问量累计，用以衡量网站用户访问的网页数量。
>
> ​	VV（visit view）
>
> ​	用以统计所有访客1天内访问网站的次数。当访客完成所有浏览并最终关掉该网站的所有页面时便完成了一次访问，同一访客1天内可能有多次访问行为，访问次数累计。
>
> ​	UV（Unique view）
>
> ​	访问网站的一台电脑客户端为一个访客。

## 流程

确定目标需求->UI设计->技术方案->开发->联调->测试->上线->查看统一结果

## 项目分析

> 目标：完成博客基本功能
>
> ​	博客的增删查改
>
> 需求：
>
> ​	首页，作者主页，博客详情页
>
> ​	登录页：管理中心，新建页，编辑页
>
> 技术方案
>
> ​	数据如何存储
>
> ​		博客信息:`id title content createtime author`
>
> ​		用户信息:`id username password realname`
>
> ​	如何与前端对接，即接口设计
>
>  		路由`/blog/ `  `/user/`
>
> | 描述             | 接口         | 方法 | url参数 | 备注 |
> | ---------------- | ------------ | ---- | ------- | ---- |
> | 获取博客列表     | `/api/blog/list` | get | author(作者：页面权限),keyword（关键字：用于搜索） | 参数为空则不进行查询过滤【即查询所有内容】 |
> | 获取一篇博客内容 | `/api/blog/detail`        | get | id |      |
> | 新增一篇博客     |  `/api/blog/new`           | post |         | psot中有新增的信息 |
> | 更新一篇博客     |     `/api/blog/update`     | post | id | postData中有更新的内容 |
> | 删除一篇博客     |     `/api/blog/del`        | post | id |      |
> | 登录             |      `/api/user/login`      | post |         | postData中有用户名和密码 |
>
