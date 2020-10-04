let oldArrayPrototype = Array.prototype;
let proto = Object.create(oldArrayPrototype);
['shift', 'push'].forEach(method => {
    proto[method] = function () {//函数劫持
        updateView();// 切片编程
        oldArrayPrototype[method].call(this, ...arguments)
    }
})


function Observer(target) {
    if (typeof (target) !== 'object' || target == null) return target;
    if (Array.isArray(target)) {// 拦截数组
        Object.setPrototypeOf(target, proto);
        // target.__proto__ = proto;
    }
    for (const key in target) {
        defineReactive(target, key, target[key])
    }
}

function defineReactive(obj, key, value) {
    Observer(value)
    Object.defineProperty(obj, key, {
        get() {// 收集依赖
            return value;
        },
        set: (newValue) => {
            if (newValue !== value) {
                Observer(newValue)
                value = newValue;
                updateView();
            }
        }
    })
}

function updateView() {
    console.log('更新视图');
}

let data = { name: 'zoulam', age: { n: 18 }, nums: [1, 2, 3] };
Observer(data)
// 深层属性（递归）
data.age.n = 19;
data.age = { n: 100 }
// 新属性（递归）
data.age.n = 19;
data.name = 'luluxi'
// 数组方法需要挂载到对象
console.log('-------------------------------------------');
data.nums.push(4);
console.log(data.nums);
