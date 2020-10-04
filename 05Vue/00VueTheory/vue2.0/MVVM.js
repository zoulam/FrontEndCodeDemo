// 观察者（包含发布订阅），此处应该称之为观察者
// 给发生数据变化的内容添加观察者
class Dep {
    constructor() {
        // 存放观察者（Watcher），数据发生变化就通知他
        this.subs = [];
    }
    // 订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }
    // 发布
    notify() {// 通知
        this.subs.forEach(watcher => {
            return watcher.update();
        })
    }
}


// 监视user的name值,只要值发生变化就执行第三个参数的回调函数
// vm.$watch(vm, 'user.name',(newVal)=> {})
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldValue = this.get()
    }
    // get(vm, expr) {
    //     let value = CompilerUtil.getValue(vm, expr)
    //     return value
    // }

    get() {
        // 将watcher放在 发布订阅器的target上
        Dep.target = this; //将watcher放在Dep上
        let value = CompilerUtil.getValue(this.vm, this.expr);
        Dep.target = null;// 此处不取消，任何值都会添加到watcher上
        return value;
    }
    update() {
        // 比对新值和旧值，不同才执行回调函数
        let newVal = CompilerUtil.getValue(this.vm, this.expr);
        if (newVal !== this.oldValue) {
            this.cb(newVal);
        }
    }
}


// 实现数据劫持
class Observer {
    constructor(data) {
        this.observer(data);
    }

    // 观察者，让对象封装成能直接被defineProperty处理的值
    observer(data) {
        // 只观察对象
        if (data && typeof data == 'object') {
            for (const key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    defineReactive(obj, key, value) {
        this.observer(value);
        // 此处实例化dep
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            get() {
                // 创建watcher时，会取得对应的内容，并且将watcher放在全局上
                // get方法内写入订阅
                Dep.target && dep.addSub(Dep.target);
                // console.log('run getter');
                return value;
            },
            set: (newval) => {
                if (newval !== value) {
                    // console.log('run setter');
                    this.observer(newval);
                    value = newval;
                    // set方法内写入发布（通知）
                    dep.notify();
                }
            }
        })
    }
}


// 编译功能，包含文本节点和元素节点的编译
class Compiler {
    // vm 是Vue的对象实例， el是元素节点
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        let fragment = this.nodeFragment(this.el);
        this.compiler(fragment)
        this.el.appendChild(fragment);
    }
    isDirective(key) {
        return key.startsWith('v-');
    }
    compilerElement(node) {
        let attributes = node.attributes;
        [...attributes].forEach(attr => {
            let { name, value: expr } = attr;
            // 解析name是不是vue指令
            if (this.isDirective(name)) {
                // v-model v-on:click
                let [, directive] = name.split('-');
                // model on:click
                let [directiveName, eventName] = directive.split(':');
                // directiveName: on    eventName: click

                // node 编译的节点，
                // expr如:       "user.name"
                // this.vm Vue对象实例
                CompilerUtil[directiveName](node, expr, this.vm, eventName);
            }
        })
    }
    compilerText(node) {
        let content = node.textContent;
        if (/\{\{(.+?)\}\}/.test(content)) {
            // content 是 {{key:value}}
            CompilerUtil['text'](node, content, this.vm)
        }
    }
    compiler(node) {
        // 只编译第一层
        let childNodes = node.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                // 元素节点
                this.compilerElement(child)
                // 继续深层编译
                this.compiler(child)
            } else {
                // 文本节点
                this.compilerText(child)
            }
        })
    }
    nodeFragment(node) {
        let fragment = document.createDocumentFragment(node);
        let firstChild;
        while (firstChild = node.firstChild) {
            // 将原本页面内的节点移动到文档碎片中
            fragment.appendChild(firstChild)
        }
        return fragment;
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
}

// 将指令功能存放在对象中
CompilerUtil = {
    getValue(vm, expr) {
        // let arr = expr.split('.');
        // if (arr.length === 1) {
        //     return vm.$data[expr];
        // }

        // 从Vue实例的data对象中解析 . 语法 获取值
        let ans = expr.split('.').reduce((data, curr) => {
            return data[curr];
            // data[curr]等价于user['name']
            // 从Vue的实例中的data中取值
        }, vm.$data)
        return ans;
    },
    setValue(vm, expr, value) {
        expr.split('.').reduce((data, curr, index, arr) => {
            if (index == arr.length - 1) {
                return data[curr] = value; // 最后一次时给value赋值
            }
            return data[curr];
        }, vm.$data)
    },
    // node 编译的节点，
    // expr如:       "user.name"
    // this.vm Vue对象实例
    model(node, expr, vm) {
        // vm[expr] = vm.$data['user.name']
        let fn = this.update['modelUpdater']
        new Watcher(vm, expr, (newValue) => {
            fn(node, newValue);
        });

        node.addEventListener('input', (e) => {
            // 获取用户输入值
            let value = e.target.value
            this.setValue(vm, expr, value);
        })
        let value = this.getValue(vm, expr)

        fn(node, value);
    },
    html(node, expr, vm) {
        let fn = this.update['htmlUpdater']
        new Watcher(vm, expr, (newValue) => {
            fn(node, newValue);
        });
        let value = this.getValue(vm, expr)
        fn(node, value);
    },
    getContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(vm, args[1]);
        })
    },
    // text是{{user.name}}
    text(node, expr, vm) {
        // 取出 user.name user.age
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {

            new Watcher(vm, args[1], () => {
                let changeVal = this.getContentValue(vm, expr);
                fn(node, changeVal)
            })

            return this.getValue(vm, args[1])
        })
        let fn = this.update['textUpdater'];
        fn(node, content)
    },
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, (e) => {
            // console.log(vm, expr);
            // vm 是vue实例，epxr是"change"
            vm[expr].call(vm, e);
        })
    },
    update: {
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        },
        textUpdater(node, value) {
            node.textContent = value;
        }
    }
}


class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        let computed = options.computed;
        let methods = options.methods;
        if (this.$el) {
            // 1、实现数据劫持
            new Observer(this.$data)
            // console.log(this.$data);

            for (let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this);
                    }
                })
            }

            for (let key in methods) {
                Object.defineProperty(this, key, {
                    get: () => {
                        return methods[key];
                    }
                })
            }

            // 2、vm. 实现等价于 vm.$data
            this.proxyVm(this.$data)
            // 3、元素存在就开始编译
            new Compiler(this.$el, this)
        }
    }

    proxyVm(data) {// 遍历vm实例的时候 从data上取值 即 vm.$data.user.name == vm.user.name
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set: (newVal) => { // 设置代理方法
                    data[key] = newVal;
                }
            })
        }
    }
}