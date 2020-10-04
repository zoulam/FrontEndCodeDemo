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
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise # < MyPromise >'))
    }
    let called = false;
    if (typeof (x) === 'object' && x !== null || typeof (x) === 'function') {// 函数或者对象
        try {
            let then = x.then;
            // 确定是promise 因为x包含then方法
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    // 递归解决嵌套问题
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(x);
                })
            } else {// 不是promise
                resolve(x)
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }
    } else {
        resolve(x)// 普通值
    }
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
        // 解决空参问题,即then穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        let promise2 = new MyPromise((resolve, reject) => {
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

    catch(errorCallback) {
        return this.then(null, errorCallback);
    }
}


module.exports = MyPromise;