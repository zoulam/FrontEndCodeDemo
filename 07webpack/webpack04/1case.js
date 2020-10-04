class AsyncSeriesWaterfallHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    // 发布
    callAsync(...args) {
        // finalCallback 最后执行的函数
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index];
            // 空栈直接执行最后一个函数
            if (!task) return finalCallback();
            if (index === 0) {
                // next 就是下面cb被立即执行了，即完成了递归
                task(...args, next);
            } else {
                // data就是上一个函数传入的第二个参数
                task(data, next);
            }
            index++;
        }
        // next要手动执行一次后面才能自动执行
        next();
    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log(name, 'react');
        cb(null, 'result');
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
