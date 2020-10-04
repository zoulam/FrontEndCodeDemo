const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        home: './src/index.js',//key值可以随便起名，常用mian和home作为主入口
        other: './src/other.js'
    },
    output: {
        // [name]依次读取上面的home和other
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'home.html',
            chunks: ['home'],// 只引入home.js的文件
        }),
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'other.html',
            chunks: ['home', 'other'],// 引入home.js和ohter.js的文件
        })
    ],

}