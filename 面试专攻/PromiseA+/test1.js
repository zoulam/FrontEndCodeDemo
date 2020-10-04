const MyPromise = require('./PromiseA+');
let promise = new MyPromise((resolve, reject) => {
    // resolve('success')
    // reject('error')
    // throw new Error('Excpetion: reject')
    setTimeout(() => {
        resolve('go')
    },2000)

})

promise.then((value) => {
    console.log('Fulfilled1', value);
}, (reason) => {
    console.log('Rejected1', reason);
})

promise.then((value) => {
    console.log('Fulfilled2', value);
}, (reason) => {
    console.log('Rejected2', reason);
})



