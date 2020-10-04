const MyPromise = require('./PromiseA+');
let promise1 = new MyPromise((resolve, reject) => {
    resolve('promise1')

})

let promise2 = promise1.then(() => {
    // [TypeError: Chaining cycle detected for promise #<Promise>]
    return promise2;
    // return 1;
})

promise2.then((value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
})



