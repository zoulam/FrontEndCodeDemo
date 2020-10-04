class DonePlugin {
    apply(compiler) { // compiler.hooks
        console.log(1);
        compiler.hooks.done.tap('DonePlugin', function (states) {
            console.log('compiler finish');
        })
    }
}

module.exports = DonePlugin;