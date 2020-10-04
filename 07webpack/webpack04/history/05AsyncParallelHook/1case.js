class AsyncParallelHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    // 发布
    callAsync(...args) {
        let _this = this;
        let finalCallback = args.pop();
        let index = 0; //计数器
        function done() {
            index++;
            if (index == _this.tasks.length) {
                finalCallback();
            }
        }
        this.tasks.forEach(task => {
            task(...args, done);
        })
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log(name, 'react');
        cb();
    }, 1000)

});

hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log(name, 'node');
        cb();
    }, 2000)

})


hook.callAsync('zoulam', function () {
    console.log('end');
})
