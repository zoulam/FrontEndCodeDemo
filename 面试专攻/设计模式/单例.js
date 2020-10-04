// 比如全局window，唯一登录浮窗等
// express 中就用到了这种设计模式
let single = (function () {
    let instance;
    function getInstance() {
        // 如果该实例存在，则直接返回，否则就对其实例化
        if (instance === undefined) {
            instance = new Constructor();
        }
        return instance;
    }
    function Constructor() {
        // ... 生成单例的构造函数的代码
    }
    return {
        getInstance
    }
})();

