// 新增发布订阅实现能够包裹 setTimeout
const PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED';
class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        // 每个对象都有的内容
        const resolve = (value) => {
            if (this.status == PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
            // 发布
            this.onFulfilledCallbacks.forEach(fn => { fn(); })
        }
        const reject = (reason) => {
            if (this.status == PENDING) {
                this.status = REJECTED;
                this.value = reason;
            }
            // 发布
            this.onRejectedCallbacks.forEach(fn => { fn(); })
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e);
        }
    }
    // 原型链上的函数
    then(onFulfilled, onRejected) {
        if (this.status == FULFILLED) {
            onFulfilled(this.value);
        } if (this.status == REJECTED) {
            onRejected(this.value);
        }
        else if (this.status == PENDING) {
            // 订阅
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.value);
            })
        }
    }
}

module.exports = MyPromise;