class PROMISE {
    static PENDING = 'pending';//等待
    static FULFILLED = 'fulfilled';//解决、满足
    static REJECTED = 'rejected'//拒绝

    constructor(executor) {//executor 执行函数
        //状态
        this.status = PROMISE.PENDING;
        this.value = null;
        this.callbacks = [];// 存储then中的回调函数

        try {
            // executor 的this绑定是Window
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            //保证出现异常时是也是拒绝
            this.reject(error);
        }

    }
    // promise 不允许状态发生两次修改
    resolve(value) {
        if (this.status == PROMISE.PENDING) {//状态保护
            this.status = PROMISE.FULFILLED;
            this.value = value;
            // 保证能在Promise内的异步函数晚执行
            setTimeout(() => {
                //依然能正确取得value
                //保证then能接收到promise内包含异步函数（setTmieout）
                this.callbacks.map(callback => {
                    callback.onFulfilled(value);
                });
            });
        }
    }


    reject(reason) {
        if (this.status == PROMISE.PENDING) {
            this.status = PROMISE.REJECTED;
            this.value = reason;
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason);
                });
            });

        }
    }


    then(onFulfilled, onRejected) {

        //当未传入value时，防止onFulfilled不是函数报错
        if (typeof onFulfilled !== 'function') {
            // return this.value实现穿透
            onFulfilled = () => this.value;
        }

        //当未传入value时，防止onRejected不是函数报错
        if (typeof onRejected !== 'function') {
            onRejected = () => this.value;
        }


        // then返回的是Promise 拥有自己的状态
        // 用递归实现链式调用
        let promise = new PROMISE((resolve, reject) => {
            //保证promise内包含异步函数时，仍然能让then接收到值
            if (this.status = PROMISE.PENDING) {
                //准备状态的错误能被onRejected处理
                this.callbacks.push({
                    //第一个是属性
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(value), resolve, reject)
                        // try {
                        //     //then的链式调用实现
                        //     //result 将自己的retrun值给下一个then
                        //     let result = onFulfilled(value);
                        //     //默认是成功的
                        //     if (result instanceof PROMISE) {
                        //         result.then(resolve, reject)
                        //     } else {
                        //         resolve(result);
                        //     }
                        // } catch (error) {
                        //     reject(error);
                        // }
                    },
                    onRejected: value => {
                        this.parse(promise, onRejected(value), resolve, reject)
                    }
                });
            }


            //then内的处理,根据不同的状态执行不同的函数
            if (this.status == PROMISE.FULFILLED) {
                setTimeout(() => {// 保证能比同步函数晚执行
                    this.parse(promise, onFulfilled(this.value), resolve, reject)
                    // try {
                    //     let result = onFulfilled(this.value);

                    //     // then取得的`value`是上一个then中处理的值，而不是`Promise`对象
                    //     if (result instanceof PROMISE) {
                    //         // then 中的回调函数是自动执行的，只需要传入即可
                    //         result.then(resolve, reject)
                    //         // (value => {
                    //         //     resolve(value);
                    //         // }, reason => {
                    //         //     reject(value);
                    //         // })
                    //     } else {
                    //         resolve(result);
                    //     }
                    // } catch (error) {
                    //     //保证出现异常时能够是状态是rejected
                    //     //同时能改变链式调用过程中then那个Promise的状态
                    //     reject(error);
                    // }
                });

            }

            if (this.status == PROMISE.REJECTED) {
                setTimeout(() => {
                    this.parse(promise, onRejected(this.value), resolve, reject)
                });

            }
        });


        return promise;
    }

    parse(promise, result, resolve, reject,) {
        if (promise == result) {
            throw new Error('Chaining cycle detected')
        }
        try {
            if (result instanceof PROMISE) {
                result.then(resolve, reject)
            } else {
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    }

    static resolve(value) {
        return new PROMISE((resolve, reject) => {
            if (value instanceof PROMISE) {
                value.then(resolve, reject);
            } else {
                resolve(value)
            }
        })
    }

    static reject(value) {
        return new PROMISE((resolve, reject) => {
            reject(value)
        })
    }
}





// let p = new PROMISE((res, rej) => {
//     res('解决');
// });

// let promise = p.then(value => {
//     return 'luluxi';
// })


let p1 = new PROMISE((res, rej) => {
    setTimeout(() => {
        res('解决');
    }, 200)
});

let p2 = new PROMISE((res, rej) => {
    setTimeout(() => {
        res('拒绝');
    }, 100)
});

PROMISE.race([p1, p2]).then(value => {
    console.log(value);
}, reason => {
    console.log(reason);
})