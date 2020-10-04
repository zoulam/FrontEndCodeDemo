const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        // 自动找
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]

        // 别名获取loader
        // alias:{
        //     loader1: path.resolve(__dirname, 'loaders', 'loader1'),
        // }
    },
    devtool: 'source-map',
    // watch: true,
    module: {
        rules: [
            // 处理less的loader
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jpg$/,
                // 根据图片生成md5发生到dist目录下，同时返回当前图片路径
                // use:'file-loader',
                // 处理路径,并调用file-loader
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 200 * 1024,
                    }
                },
            },
            // 添加注释的loader
            {
                test: /\.js$/,
                use: {
                    // 用于添加指定注释
                    loader: 'banner-loader',
                    options: {
                        text: 'zoulam write in 2020/9/25',
                        filename: path.resolve(__dirname, 'src', 'banner.js')
                    }
                }
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader.js',
            //         options: {
            //             presets: [
            //                 '@babel/preset-env',
            //             ]
            //         }
            //     }
            // }
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'loader1',
            //     },
            //     enforce: 'pre',
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'loader2',
            //     }
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'loader3',
            //     },
            //     enforce: 'post'
            // }
        ]
    }
}