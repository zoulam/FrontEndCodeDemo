const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// 1、cleanWebpackPlugin//清除上一次打包的文件
// 2、copyWebpackPlugin// 拷贝文件，webpack打包一起
// 3、bannerPlugin(内置)// 添加声明如：代码作者信息等
module.exports = {
    mode: 'production',
    entry: { home: './src/index.js', },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        ]
    },
    resolve: {// 解析 common.js查找node_modules的顺序是从当前目录下找，找不到再往上一级找
        modules: [path.resolve('node_modules')],//设置为只在当前目录下查找
        // modulse:[path.resolve('node_modules'),path.resolve('dist')],// 假设dist下也是我们需要的模块

        // 修改主入口 默认是是main （再package.json内）
        // mainFields: ['style', 'main'],// 先找style参数，找不到再去找main入口

        // 修改入口文件名 默认是index.js
        // mainFiles: [],

        // 添加默认扩展名
        extensions:['.js','.css','.json','vue'],// 逐个后缀名添加尝试

        // import 'bootstrap/dist/css/bootstrap.css'//开头没有加./是因为加载是已经安装的模块
        // alias: { // 过长的模块引入十分麻烦 起个别名
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // },


    },
    // webpack-dev-Server 内置express模块
    devServer: {
        // 3) 有服务端 但不想用代理，前后端启动在一个端口



        // 2）mock数据
        // before(app) {
        //     app.get('/user', (req, res) => {
        //         res.json({ name: 'zoulam' })
        //     })
        // }

        // 1）
        // proxy:{//重写的方式 把请求代理到服务器上
        //     // 访问以api开头的就代理到后面这个url
        //     // '/api':'http://localhost:3000'
        //     '/api':{
        //         target:'http://localhost:3000',
        //         pathRewrite:{'/api':''},//把'/api'重写为空
        //     }
        // }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            // 下面大写的key名字是自定义的，使用时保持一致即可
            // DEV:"'dev'",
            DEV:JSON.stringify('dev'), // 默认解析成变量名而不是字符串，需要包裹一层
            FLAG:'true',
            EXPRESSION:'1+1'
        }),
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',

        }),
        new CleanWebpackPlugin(),//默认删除output文件夹下的内容
        // new copyWebpackPlugin({
        //     patterns: [
        //         { from: 'doc', to: './' }// 将doc下的文件拷贝到dist
        //     ]
        // }),
        // new webpack.BannerPlugin('create 2020/8 by zolam')
    ]
}