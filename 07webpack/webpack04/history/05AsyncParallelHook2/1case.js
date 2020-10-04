class AsyncParallelHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    // 发布
    promise(...args) {
        let tasks = this.tasks.map(task =>
             task(...args)
        )
        return Promise.all(tasks);
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapPromise('react', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(name, 'react');
            resolve();
        }, 1000)
    })
});

hook.tapPromise('node', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(name, 'node');
            resolve();
        }, 1000)
    })
})


hook.promise('zoulam').then(function () {
    console.log('end');
});
