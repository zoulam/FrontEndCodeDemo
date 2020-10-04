const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const optimizeCSS = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
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
    },
    plugins: [
        new HtmlWebPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        // 提取html内的css
        new MiniCssExtactPlugin({
            filename: 'mian.css'
        }),
        new webpack.ProvidePlugin({//提供插件
            $: 'jquery',
        }),
    ],
    externals:{
        jquery:'$'//不打包$引入的内容，以cdn引入
    },
    module: {
        rules: [// loader的使用规则是从右至左，从下到上
            // 按照此理解，js代码是先校验再打包

            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',
            //     },
            //     enforce:'pre', //pre强制提前执行 默认值是normal post滞后执行
            //     exclude:/node_modules/
            // },

            // {
            //     test: require.resolve('jquery'),//引入了jquery时触发
            //     loader: 'expose-loader',
            //     options: {
            //         exposes: ['$', 'jQuery'],
            //     },
            // },
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