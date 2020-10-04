const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 自定义插件
let DonePlugin = require('./plugins/DonePlugin');
let AsyncPlugin = require('./plugins/AsyncPlugin');
let FileListPlugin = require('./plugins/FileListPlugin');
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new InlineSourcePlugin({
            // 指定只引入js和css 剔除json等文件
            match: /\.(js|css)$/
        }),
        new MiniCssExtractPlugin({
            filename: 'mian.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new FileListPlugin({
            filename: 'list.md'
        })
        // 自定义钩子
        // new DonePlugin(),
        // new AsyncPlugin(),
    ]
}