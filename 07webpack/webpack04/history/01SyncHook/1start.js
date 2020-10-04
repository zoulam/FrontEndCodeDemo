let { SyncHook } = require('tapable')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name']),
        }
    }
    // 注册监听函数
    tap(){
        // args1是标识
        this.hooks.arch.tap('node',function(name){
            console.log('node',name);
        });
        this.hooks.arch.tap('react',function(name){
            console.log('react',name);

        });
    }
    start() {
        this.hooks.arch.call('zoulam');
    }
}

let l = new Lesson();

l.tap();// 注册事件
l.start();//  启动钩子