class SyncBailHook {// 保险钩子，只要上一次的返回了非undefined 后面就终止执行
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    call(...args) {
        let ret;// 当前函数的返回值
        let index = 0;// 当前要执行的第一个
        do {
            ret = this.tasks[index++](...args)
        } while (ret === undefined && this.tasks.length > index);
    }
}

let hook = new SyncBailHook(['name']);
hook.tap('react', function (name) {
    console.log(name, 'react');
    return 'stop';
});

hook.tap('node', function (name) {
    console.log(name, 'node');
})

hook.call('zoulam:')
