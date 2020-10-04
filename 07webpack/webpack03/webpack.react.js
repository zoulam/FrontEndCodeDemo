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