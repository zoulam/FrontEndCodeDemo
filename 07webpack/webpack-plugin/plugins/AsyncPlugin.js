class AsyncPlugin {
    apply(compiler) { // compiler.hooks
        console.log(2);
        compiler.hooks.emit.tapAsync('AsyncPlugin', function (compilation, cb) {
            setTimeout(() => {
                console.log('file emit');
                cb();
            }, 1000)
        })
        compiler.hooks.emit.tapPromise('AsyncPlugin', function (compilation) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    console.log(3);
                    res('run resolve')
                }, 1000)
            })
        })
    }
}

module.exports = AsyncPlugin;