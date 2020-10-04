// 实现基本功能
const PENDING = 'PENDING',
 FULFILLED = 'FULFILLED',
 REJECTED = 'REJECTED';
class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        // 每个对象都有的内容
        const resolve = (value) => {
            if (this.status == PENDING) {
                this.status = FULFILLED;
                this.value = value;
            }
        }
        const reject = (reason) => {
            if (this.status == PENDING) {
                this.status = REJECTED;
                this.value = reason;
            }
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
        }
        if (this.status == REJECTED) {
            onRejected(this.value);
        }
    }
}

module.exports = MyPromise;