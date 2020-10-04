# 优化

`npm i -D webpack webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react`

`@babel/preset-react`解析jsx语法

## noparse

> 不去解析某些包，加快打包速度

```javascript
 module: {
        noParse:/jquery/,
        }
```

## IgnorePlugin

[moment文档](https://momentjs.com/docs/)

> moment是一个解析时间的库，支持多语言，所以导致文件很大，webpack可以对其优化，即：只取出需要的语言包

```javascript
 module: {
     rules: [
            {
                exclude: /node_modules/, // 排除node_modules 下的文件
                include: path.resolve('src'),
                }]
                }
```

此处的例子中moment的指定语言版本需要手动引入

```javascript
import 'moment/locale/zh-cn';

moment.locale('zh-cn')
```

```javascript
const webpack = require('webpack');
 plugins: [
    new webpack.IgnorePlugin(/\.\/locale/,/moment$/), // 从moment中引入时，忽略./locale
]
```

## dllPlugin\(动态链接库\)

> **dynamic link library**
>
> react这个**暂时不会变的库**可以使用**单独的配置文件打包**此处我使用 `webpack.react.js`，这样就不用每次都重新打包内容

```javascript
const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        // test: './src/test.js',
        react: ['react', 'react-dom'],//打包这两个包
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        // library: 'reNameFunction',// 用变量reNameFunction接收函数
        library: '_dll_[name]',
        // libraryTarget:'commonjs', // 默认值是：var
        // libraryTarget:'umd',
    },
    plugins: [
        new webpack.DllPlugin({
            name:'_dll_[name]',// name === libray
            //保存解析后的引用关系,mainfest.json常被称为任务清单
            path:path.resolve(__dirname,'dist','mainfest.json'),
        })
    ]
}
```

## happypack（多线程）

`npm i happypack -S`

[npm happypack](https://www.npmjs.com/package/happypack)

> 启动多线程打包，**注：**小文件打包使用多线程反而会更慢，启动多线程也是需要花费系统资源的

```text

```

## webpack自带优化

###  1、树摇优化

在生产模式下 `mode = production,`下使用`import`语法会自动去除没用的引入，

 专业名词 `tree-shaking` ，树上有黄的和绿的叶子，光合作用低的黄页被认为是没用的，一摇就掉下来，称**树摇优化**

 **注：**`require`语法是不支持`tree-shaking`

###  2、整合不再引用的代码

webpack会将已经引用且后续不再引用的代码整合 `scope hositing`

```javascript
 // scope hositing
 let a = 1;
 let b = 2;
 let c = 3;
 let d = a + b + c;
 // webpack 3.0之后会自动省略声明后并且被使用的变量（即直接输出6）
 console.log(d);
```

###  3、抽离公共代码

多入口中引用了重复代码自动剔除

 4.0以前的版本是使用插件 `commonChunkPlugins`实现

 ```javascript
  optimization: {
         splitChunks: {// 分割代码块
             //缓存组 ，存入频繁被引用的公共代码
             cacheGroups: {
                 commons: {//公共模块
                     chunks: 'initial',//从入口开始找
                     minSize: 0,//最小是0byte
                     minChunks: 2,//最少引用次数之后抽离
                 },
                 vendor: {// 第三方
                     //提高权重，先抽离第三方模块，再抽离上面指定的模块
                     priority: 1,
                     // 引入过node_modules，就将他分离
                     test: /node_modules/,
                     chunks: 'initial',
                     minSize: 0,
                     minChunks: 2,
                 }
             }
         }
     },
 ```


