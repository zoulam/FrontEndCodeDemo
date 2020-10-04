const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        home: './src/index.js',
    },
    module: {
        rules: [
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
    // devtool: 'source-map',//增加映射文件，包含行列信息（信息完整）
    // devtool: 'eval-source-map',//生成映射包含行列信息（信息完整），但不会出现单独的文件
    // devtool: 'cheap-module-source-map',// 不会产生列，增加映射文件，可以保留
    // devtool: 'cheap-module-eval-source-map',// 不会产生文件，集成再打包后的文件中，也不会产生列
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',

        })
    ]
}