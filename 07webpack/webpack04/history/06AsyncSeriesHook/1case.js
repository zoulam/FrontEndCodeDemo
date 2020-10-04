class AsyncSeriesHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    // 发布
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        // 中间函数
        let next = () => {
            if (index == this.tasks.length) {
                return finalCallback();
            }
            let task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }
}

let hook = new AsyncSeriesHook(['name']);
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
    }, 1000)
})


hook.callAsync('zoulam', function () {
    console.log('end');
});
