class AsyncSeriesHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    // 发布
    promise(...args) {
        let [first, ...other] = this.tasks;
        return other.reduce((p, next) => { // redux源码
            return p.then(() => next(...args))
        }, first(...args))
    }
}

let hook = new AsyncSeriesHook(['name']);
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
