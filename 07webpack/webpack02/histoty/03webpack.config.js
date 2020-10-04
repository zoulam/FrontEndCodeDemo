const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: { home: './src/index.js', },
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
    // 对电脑性能要求高
    watch: true,//监控代码变化，自动打包
    watchOptions: {
        poll: 2000,//监控间隔事件单位ms
        aggregateTimeout: 500,//防抖 输入完成xxms后才打包
        ignored:/node_modules/// 忽略文件
    },
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