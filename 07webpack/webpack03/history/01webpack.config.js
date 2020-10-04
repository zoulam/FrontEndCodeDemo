const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
        noParse: /jquery/, // 不去解析jquery的依赖库
        rules: [
            {
                // exclude: /node_modules/,
                // include: path.resolve('src'),
                test: /\.js$/,
                // 使用Happypack下的loader模块，并指定打包的是js ?id=js
                use: 'Happypack/loader?id=js',
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: [
                //             '@babel/preset-env',
                //             '@babel/preset-react'
                //         ]
                //     }
                // },
            },{
                test:/\.css$/,
                // 使用Happypack下的loader模块，并指定打包的是css ?id=css
                use:'happy/loader?id=csss'
            }
        ]
    },
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new Happypack({
            id: 'css',
            use: ['style-loader','css-loader'],
        }),
        new Happypack({
            id: 'js',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }],
        }),
        new webpack.DllReferencePlugin({//优先去指定文件下引入，没有才取打包
            manifest: path.resolve(__dirname, 'dist', 'mainfest.json')
        }),
        new WebpackHtmlPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment$/), // 从moment中引入时，忽略./locale
    ]
}