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
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index];
            if (!task) return finalCallback();
            if (index === 0) {
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        }
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
