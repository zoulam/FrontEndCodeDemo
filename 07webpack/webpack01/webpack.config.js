const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const optimizeCSS = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { loader } = require('mini-css-extract-plugin');
module.exports = {
    // optimization: {// 优化项
    //     minimizer: [
    //         new TerserJSPlugin({}),
    //         new optimizeCSS()
    //     ],
    // },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        // 加在这里会导致JavaScript的引入也是如此，不建议加在这里
        // publicPath:'http://localhost:8080'// 给文件资源添加服务器地址
    },
    plugins: [
        new HtmlWebPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        // 提取html内的css
        new MiniCssExtactPlugin({// 需要再分一份就再new多一个
            filename: 'css/mian.css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-withimg-loader"
            },

            {
                test: /\.(png|gif|jpg)$/,
                // 可以添加限制小于图片文件小于多少k时压缩成base64
                // 否则使用file-loader产生真正的图片
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,//200k
                        outputPath:'/img/',
                        publicPath:'http://localhost:8080'
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {//将es6转化为es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],// a=1
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],// @log
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),//限定范围
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtactPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtactPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        }
                    },]
            },
        ]
    }
}