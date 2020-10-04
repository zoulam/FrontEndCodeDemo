// 同步钩子
class SyncHook {
    constructor(args) { //args=>['name]
        this.tasks = [];
    }
    // 订阅
    tap(name, task) {
        this.tasks.push(task);
    }
    // 发布
    call(...args) {
        this.tasks.forEach(task => task(...args));
    }
}

let hook = new SyncHook(['name']);
hook.tap('react', function (name) {
    console.log(name, 'react');
});

hook.tap('node', function (name) {
    console.log(name, 'node');
})

hook.call('zoulam:')
