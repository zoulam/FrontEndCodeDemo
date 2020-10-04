class SyncLoopHook {// 保险钩子，只要上一次的返回了非undefined 后面就终止执行
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args)
            } while (ret != undefined);
        })
    }
}

let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('react', function (name) {
    console.log(name, 'react');
    return ++total === 3 ? undefined : 'next';
});

hook.tap('node', function (name) {
    console.log(name, 'node');
})

hook.tap('webpack', function (name) {
    console.log(name, 'webpack');
})

hook.call('zoulam:')
