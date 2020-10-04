let promise = new Promise((resolve, reject) => {
    resolve('first success')
})

// 1、返回值非Promise
// promise.then((value) => {
//     return value
// })
//     .then((value) => {
//         console.log(value); // first success
//     })

// 2、返回值为Promise 且是 FULFILLED状态
// promise.then((value) => {
//     return new Promise(resolve => { resolve(value) })
// })
//     .then((value) => {
//         console.log(value); // first success
//     })

// 3、返回值为Promise 且是 REJECTED状态
// promise.then((value) => {
//     return new Promise((resolve, reject) => { reject('error') })
// })
//     .then((value) => {
//         console.log(value);
//     }, (reason) => {
//         console.log('rejected', reason); // rejected error
//     })

// 4、中间的Promise 且是 REJECTED状态，之后继续then(走成功)
// promise.then((value) => {
//     return new Promise((resolve, reject) => { reject('error') })
// })
//     .then((value) => {
//         console.log(value);
//     }, (reason) => {
//         console.log('rejected', reason); // rejected error
//         // 默认返回undefined
//     })
//     .then((value) => {
//         console.log('fulfilled', value); // fulfilled undefined
//     }, (reason) => {
//         console.log('rejected', reason);
//     })

// 5、中间的Promise throw error 走rejected
// promise.then((value) => {
//     return new Promise((resolve, reject) => { reject('error') })
// })
//     .then((value) => {
//         console.log(value);
//     }, (reason) => {
//         console.log('rejected', reason); // rejected error
//         throw new Error('error')
//     })
//     .then((value) => {
//         console.log('fulfilled', value);
//     }, (reason) => {
//         console.log('rejected', reason);// rejected Error: error
//     })

// 6、 错误会被就近的then的回调函数或者就近的catch捕获
// promise.then((value) => {
//     return new Promise((resolve, reject) => { reject('error') })
// })
//     .then((value) => {
//         console.log(value);
//     }, (reason) => {
//         console.log('rejected', reason); // rejected error
//         throw new Error('error')
//     }).then((value) => {
//         console.log('run');
//     }).catch((error) => {
//         console.log('Catch', error); // Catch Error: error
//     })

// 成功条件
// then return 所有类型的普通值
// then return resolve 的Promise value
// 失败条件
// then return rejected 的Promise reason
// then return throw new Error

// 链式调用
// 1、return this （x）
// 2、return new Promise



// let promise = new Promise((resolve, reject) => {
//     resolve('first success')
// })
// 情景1 接收了then的返回值
// let promise2 = promise.then((value) => {

// }).then((value) => {

// })

// 情景2 接收了promise的返回值
// let promise2 = promise.then((value) => {

// })

// promise2.then((value) => {

// })