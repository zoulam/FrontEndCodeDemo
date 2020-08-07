// 使用yield的书写习惯让人觉得不适
// 所有还有一种实现方式就是使用Promise构造函数

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 1000)

});

let promise2 = promise.then(value => {
    console.log(value);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value + 20);
        }, 1000)
    });
});

// 链式调用， return是Promise对象即可
let promise3 = promise2.then(value => {
    console.log(value);
    return new Promise((resolve, rejetct) => {
        rejetct('俺出错啦！');
    });
});

// promise3.then((value)=>{},(reason)=>{
//     console.log(reason);
// });

// 错误捕捉的语法糖,少写一个回调函数

promise3.catch((reason) => {
    console.log(reason);
});











