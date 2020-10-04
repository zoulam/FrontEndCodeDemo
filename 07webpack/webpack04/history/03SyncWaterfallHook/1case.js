class SyncWaterfallHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    call(...args) {
        let [first, ...other] = this.tasks;
        let ret = first(...args);
        other.reduce((last, next) => {
           return next(last);
        }, ret)
    }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function (name) {
    console.log(name, 'react');
    return 'react good'
});

hook.tap('node', function (data) {
    console.log(data, 'node');
    return 'node better'
})

hook.tap('webpack', function (data) {
    console.log(data, 'webpack');
})

hook.call('zoulam:')
