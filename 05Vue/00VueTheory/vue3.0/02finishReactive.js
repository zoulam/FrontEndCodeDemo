// 若映射表 解决之前的map 的value值不能存储对象的问题
let toProxy = new WeakMap();
// key :源对象 value：被代理的对象
let toRow = new WeakMap();
// key :被代理的对象 value：源对象

// 是否是对象
function isObject(value) {
    return (typeof (value) === 'object' && value !== null)
}

// 判断数组是改变length还是改变内容
function hasOwn(target, key) {
    return target.hasOwnProperty(key);
}

// 响应式核心方法
function reactive(target) {
    // 创建响应式对象
    return createReactiveObject(target);
}

// Reflect 相较于Object有更丰富的返回值
// 即可以判断深层对象并做出处理

// 创建响应式对象
function createReactiveObject(target) {
    if (!isObject(target)) return target;
    // 从hash表中取出值，防止重复代理
    if (toProxy.get(target)) return toProxy.get(target);// 已经被代理
    if (toRow.has(target)) return target;// 传入的是代理后的对象
    let proxyHandler = {
        // target源对象, key, receiver被代理的对象
        get(target, key, receiver) {
            console.log('run get');
            // return receiver[key];
            // 函数式写法

            // 收集依赖 订阅
            track(target, key);// key 变化了就让数组中的effect执行

            let result = Reflect.get(target, key, receiver)
            return isObject(result) ? reactive(result) : result;
        },
        set(target, key, value, receiver) {
            let hadKey = hasOwn(target, key);
            let oldValue = target[key];
            if (!hadKey) {
                trigger(target, 'add', key)
                // console.log('新增内容');
            } else if (oldValue !== value) {
                trigger(target, 'set', key)
                // console.log('修改length');
            }
            console.log('run set');
            // 当设置新属性 没有成功(writable:false)时没有返回值
            // target[key] = value;
            return Reflect.set(target, key, value, receiver);
        },
        deleteProperty(target, key) {
            console.log('run deleteProperty');
            return Reflect.deleteProperty(target, key)
        }
    }
    // 过滤被代理的对象和被代理后的proxy，不再重新new proxy
    let observed = new Proxy(target, proxyHandler);
    toProxy.set(target, observed);
    toRow.set(observed, target);
    return observed;
}


let activeEffectStacks = [];



// track 存储 effect
// trigger 取出effect并执行

// targertMap: { // WeakMap
//     target: {// Map
//         key(Set): [fn, fn]
//     }
// }

let targetstMap = new WeakMap();

function track(target, key) {// key 变化了就让数组中的effect执行
    // 存在栈结构，即不存在effect函数
    // let isActive = activeEffectStacks[activeEffectStacks.length - 1];
    let effect = activeEffectStacks[0];// 栈中的内容都是执行完就销毁的
    if (effect) {        // 首次进入不存在effect
        let depsMap = targetstMap.get(target)
        if (!depsMap) {
            targetstMap.set(target, depsMap = new Map())
        }


        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, deps = new Set());
        }

        if (!deps.has(effect)) { //如果key内不存在effect
            deps.add(effect);
            // 动态创建依赖关系
        }
    }
    // 什么也不做
}
function trigger(target, type, key) {
    let depsMap = targetstMap.get(target);
    console.log(depsMap);
    if (depsMap) {
        let deps = depsMap.get(key)
        console.log(deps);
        if (deps) {
            deps.forEach(effect => {
                console.log(effect);
                effect();
            });
        }
    }
}




// fn是用户传入的回调函数
function effect(fn) {
    // effect 将fn变成响应式的函数
    let effect = createReactiveEffect(fn);
    effect();// 新版创建时不执行
}

function createReactiveEffect(fn) {
    let effect = function () {// 创建响应式的effect
        return run(effect, fn); // fn执行，effect存入栈中
    }
    return effect;
}


function run(effect, fn) {
    if (fn === undefined) return;
    try {
        activeEffectStacks.push(effect)
        fn();
    } finally {
        activeEffectStacks.pop();//执行完就清除
    }
}

let proxy = reactive({ name: 'zoulam', nums: [1, 2, 3], age: { n: 18 } })
console.log('get测试-------------------------------------------');
let ans = proxy.name;
console.log('set测试-------------------------------------------');
proxy.name = 'luluxi';
console.log('delete测试-------------------------------------------');
delete proxy.name;
console.log('数组方法测试-------------------------------------------');
proxy.nums.push(4)
console.log('深层对象-------------------------------------------');
proxy.age.n = 19;

// 数组在添加元素改变一次，改变数组的length改变一次
console.log('数组更新两次视图的问题-------------------------------------------');
let arr = [1, 2, 3, 4]
let proxy1 = reactive(arr);
proxy1.push(5);
proxy1.length = 6;


// 新版的API 改为 watchEffect，且首次设置不执行了
console.log('依赖收集-------------------------------------------发布订阅');
let obj = reactive({ name: 'zoulam' })
effect(() => {
    console.log(obj.name);
})
obj.name = 'luluxi'
obj.name = 'luluxi'

// ref computed
