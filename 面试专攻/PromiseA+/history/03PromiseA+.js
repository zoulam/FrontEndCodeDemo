// then链式调用
const PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED';
/**
 *
 * @param {new Promise} promise2
 * @param {any} x return value
 * @param {function} resolve 新的promise的解决函数
 * @param {function} reject 新的promise的拒绝函数
 */
function resolvePromise(promise2, x, resolve, reject) {

}
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
    // x 可能普通值也可能是promise
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status == FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)

            } if (this.status == REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value);
                        // 使用异步是等待promise2实例化
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0)

            }
            else if (this.status == PENDING) {
                // 订阅
                // 这里不用延时是等待改变状态才执行
                this.onFulfilledCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
        })
        return promise2;
    }
}


module.exports = MyPromise;