// 之前的key只能使用number 和 string ，现在能放对象
let toProxy = new WeakMap(); // 原对象：被代理的对象
let toRaw = new WeakMap(); //   被代理的对象：原对象

function isObject(val) {
    return typeof val === 'object' && val !== null;
}

// 修改数组长度时需要屏蔽，不然一次修改就要变更两次视图
function hasOwn(target, key) {
    return target.hasOwnProperty(key);
}

// 1.响应式核心方法
function reactive(target) {
    return createReactiveObject(target);
}

// 创建响应式对象
function createReactiveObject(target) {
    if (!isObject(target)) {// 不是对象直接返回
        return target;
    }

    // 已经被代理就直接返回代理后的对象
    let porxy = toProxy.get(target);
    if (porxy) {
        return proxy;
    }

    if (toRaw.has(target)) {
        return target;
    }
    // 需要拦截的方法
    let baseHander = {
        get(target, key, receiver) {
            // target目标值，key代理对象的key，receriver proxy后的对象

            let result = Reflect.get(target, key, receiver);
            // console.log('get value');

            // 收集依赖（订阅）
            track(target, key);

            return isObject(result) ? reactive(result) : result;
            // return target[key];
        },
        set(target, key, value, receiver) {
            // 修改数组长度时需要屏蔽，不然一次修改就要变更两次视图
            let hadKey = hasOwn(target, key);
            let oldVal = target[key];
            let res = Reflect.set(target, key, value, receiver);
            if (!hadKey) {
                trigger(target, 'add', key);

            } else if (oldVal !== value) {// 表示属性已经更改过了
                trigger(target, 'set', key);
            }
            //如果设置没成功（writeable:false）,也不会通知用户，用反射就能解决这个问题
            // console.log('set value');
            // target[key] = value;
            return res;
        },
        deleteProperty(target, key) {
            console.log('delete value');
            return Reflect.deleteProperty(target, key)
        }
    };
    let observed = new Proxy(target, baseHander);
    toProxy.set(target, observed)
    toRaw.set(observed, target)
    return observed;
}

let activeEffectStacks = [];
let targetMap = new WeakMap();

// 处理get
function track(target, key) {
    // 必须使用了effect的方法才能触发
    let effect = activeEffectStacks[activeEffectStacks.length - 1];
    if (!effect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {// 首次为空
            targetMap.set(target, depsMap = new Map())
        }
        let deps = depsMap.get(key);
        if (!deps) {
            depsMap.set(key, deps = new Set())
        }
        if (!deps.has(effect)) {

            depsMap.add(effect);
        }

        // 动态创建依赖关系
    }
}

// 处理set
function trigger(target, type, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {// 让key对应的effect依次执行
        let deps = depsMap.get(key);
        deps.forEach(element => {
            effect();
        });
    }
}
// effect副作用，将fn改为响应式的函数
function effect(fn) {
    let effect = createReactiveEffect(fn);
    effect();// 默认先执行一次
}

function createReactiveEffect(fn) {
    let effect = function () {// 创建响应式的effect
        return run(effect, fn);// 1、让fn执行，并且将effect存入到栈中
    }
    return effect;
}

function run(effect, fn) {
    try {
        activeEffectStacks.push(effect)
        fn();
    } finally {
        activeEffectStacks.pop()
    }
}
// 依赖收集 （发布订阅）
let proxy = reactive({ name: 'zoulam' })
effect(() => {
    console.log(proxy.name);
})

proxy.name = 'luluxi'


// 代理对象
// let arr = [1, 2, 3];
// let proxy = reactive(arr)
// proxy.push(4);
// let proxy = reactive([1, 2, 3])
// proxy.push('5')

// let proxy = reactive({ name: 'zoulam', user: { name: "lalaxi" } })// 多层代理用get方法来判断
// proxy.user.name = 'luluxi'
// console.log(proxy.user.name);

