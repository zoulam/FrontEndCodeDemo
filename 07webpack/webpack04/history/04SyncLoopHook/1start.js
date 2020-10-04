let { SyncLoopHook } = require('tapable')

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name']),
        }
    }
    tap() {// 注册监听函数
        // args1是标识
        this.hooks.arch.tap('node', (name) => {
            console.log('node', name);
            return ++this.index === 3 ? undefined : 'stop';
        });
        this.hooks.arch.tap('react', (data) => {
            console.log('react', data);
        });
    }
    start() {
        this.hooks.arch.call('zoulam');
    }
}

let l = new Lesson();

l.tap();//注册事件
l.start();//启动钩子

