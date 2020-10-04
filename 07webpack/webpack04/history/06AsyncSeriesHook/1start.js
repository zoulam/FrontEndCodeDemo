let { AsyncSeriesHook } = require('tapable')

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncSeriesHook(['name']),
        }
    }
    tap() {// 注册监听函数
        // args1是标识
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb();
            }, 1000)

        });
        this.hooks.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log('react', name);
                cb();
            }, 1000)
        });
    }
    start() {
        this.hooks.arch.callAsync('zoulam', function () {
            console.log('end');
        });
    }
}

let l = new Lesson();

l.tap();//注册事件
l.start();//启动钩子

