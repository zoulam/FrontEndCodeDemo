/**
 *
 * @param {*} Func 构造函数
 * @param  {...any} args 构造函数参数
 */
function myNew(Func, ...args) {
    const instance = {};
    Func.prototype && Object.setPrototypeOf(instance, Func.prototype);
    const res = Func.apply(instance, args);
    if (typeof res == 'function' || typeof res == 'object' && res !== null) {
        return res;
    }
    return instance;
    // // 1 每 new 一次就创建一份单独的对象
    // const instance = {};

    // // 2 将构造函数的 prototype 挂载到 实例对象上
    // if (Func.prototype) {
    //     Object.setPrototypeOf(instance, Func.prototype);
    // }

    // // 3 将构造函数的this指向对象实例
    // const res = Func.apply(instance, args);

    // // 4 如果函数的返回值是非原始数据类型
    // if (typeof res === "function" || (typeof res === "object" && res !== null)) {
    //     return res;
    // }

    // // 4 函数的原始类型走向
    // return instance;
}

// 测试
function Person(name) {
    this.name = name
}
Person.prototype.sayName = function () {
    console.log(`My name is ${this.name}`)
}
const me = myNew(Person, 'Jack')
me.sayName()
console.log(me)
