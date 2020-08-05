## 模块化

### 0、No_Module

立即执行函数+闭包

???代表需要暴露的内容

### 1、CommonJS 

唯一一个双端（浏览器、服务器）都可以使用

​	暴露

​		module.exports=???（以它为主）

​		export.xxx=???（两种暴露方法同时使用则失效）

​	引入

​	require（浏览器不支持该语法----Browserify转化）



### 2、AMD

​	浏览器端

​	RequireJS转化

​	define([???,???]，function(){return ???})

### 3、CMD

​	sea.js

​	define(function(require,module,exports){return ???})

### 4、ES6

```

```

前端使用

babel（ES6=>ES5[即使用CommonJS语法]） 后再 Browserify

babel功能介绍：

语法转换：JSX=>JS,ES6=>ES5……

`npm install babel-cli`

 `.babelrc`：语法转换的配置文件

```
{
	"presets":["es2015"]
}
```

