const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
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
    mode: 'production',
    // entry: './src/index.js',
    entry: {
        home: './src/index.js',
        other: './src/other.js',
    },
    output: {
        // filename: './bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
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
    ]
}