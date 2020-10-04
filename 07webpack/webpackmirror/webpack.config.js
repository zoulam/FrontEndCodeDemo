const path = require('path');

class P{
    apply(compiler){
        console.log('start');
        compiler.hooks.emit.tap('emit',function(){
            console.log('emit');
        })
    }
}

class p1{
    apply(compiler){
        compiler.hooks.afterPlugins.tap('emit',function(){
            console.log('afterPlugins');
        })
    }
}
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new P(),
        new p1(),
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loader', 'style-loader'),
                    path.resolve(__dirname, 'loader', 'less-loader')
                ]
            }
        ]
    }
}