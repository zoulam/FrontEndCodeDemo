let { SyncWaterfallHook  } = require('tapable')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name']),
        }
    }
    tap(){// 注册监听函数
        // args1是标识
        this.hooks.arch.tap('node',function(name){
            console.log('node',name);
            return 'node learn good';
        });
        this.hooks.arch.tap('react',function(data){
            console.log('react',data);
        });
    }
    start() {
        this.hooks.arch.call('zoulam');
    }
}

let l = new Lesson();

l.tap();//注册事件
l.start();//启动钩子

