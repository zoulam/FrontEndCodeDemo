let path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin');
module.exports = {
    // devServer: {// 开发服务器配置
    //     port: 3000,
    //     progress: true,// 显示编译进度，在浏览器控制台中可以看到
    //     contentBase: './build',// 文件夹
    //     compress: true,// 是否压缩
    //     // open: true, // 自动打开浏览器
    // },
    mode: 'development',// 模式production(有压缩) development（无压缩）
    entry: './src/index.js',//入口
    output: {//出口
        // filename: 'bundle.js',// 打包后的文件名
        // filename: 'bundle[hash].js',// 每次打包都添加一个hash
        filename: 'bundle[hash:8].js',// 每次打包都添加一个八位的hash
        path: path.resolve(__dirname, 'build'),// 打包后的文件目录
    },
    plugins: [//没有先后顺序
        new HtmlWebPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {// 压缩方案
                removeAttributeQuotes: true,// 删除html中的双引号
                collapseWhitespace: true,// 压缩成单行
            },
            hash: true,//生成给引入的JavaScript文件名生成hash戳
        }),
    ],
    module: {// 模块
        rules: [//规则
            // test 指定loader文件
            // css-loader 处理@import语法
            // style-loader 将css插入到head标签中
            // loader为了做到功能单一进行拆分
            // 从右向左执行
            // 用字符串或者对象（可以传入对象类型的options）存储到数组中
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'top',//插入位置
                        }
                    },
                    'css-loader'
                ]
            },
            // sass的loader和语法支持：node-sass sass-loader
            // stylus的loader和语法支持：stylus sass-loader
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader", // creates style nodes from JS strings
                    options: {
                        insert: 'top'
                    }
                },
                {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                // {
                //     loader: "less-loader"
                // },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            strictMath: true,// compiles Less to CSS
                        },
                    }
                }]
            },
        ]
    }
}