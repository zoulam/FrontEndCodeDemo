const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    // entry: './src/index.js',
    entry: {
        home: './src/index.js',
    },
    output: {
        // filename: './bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot:true,//启用热更新
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
        noParse: /jquery/, // 不去解析jquery的依赖库
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }, {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // new webpack.DllReferencePlugin({//优先去指定文件下引入，没有才取打包
        //     manifest: path.resolve(__dirname, 'dist', 'mainfest.json')
        // }),
        new WebpackHtmlPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment$/), // 从moment中引入时，忽略./locale
        new webpack.NamedModulesPlugin(),//打印更新的路径模块
        new webpack.HotModuleReplacementPlugin(),//热更新插件
    ]
}