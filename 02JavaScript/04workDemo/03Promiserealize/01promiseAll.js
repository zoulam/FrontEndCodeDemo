Promise.myAll = function (promises) {
    // 适合彼此依赖的情况
    // 还可以进行优化，传入数组中的元素中有不是Promise对象的可以封装成对象
    for (let i = 0; i < promises.length; i++) {
        if (!(promises[i] instanceof Promise)) {
            new Promise((res, rej) => {
                res(promises[i]);
            })
        }
    }
    return new Promise((resolve, reject) => {
        let haveError = false;
        let index = 0;
        let runCount = 0;
        const values = [];
        for (const promise of promises) {
            // 这里需要存储执行的promises的index，
            // 异步执行会导致执行时的index == promises.length
            let curIndex = index;
            promise.then(value => {
                if (haveError) return;
                values[curIndex] = value;
                runCount++;
                if (runCount === promises.length) {
                    resolve(values);
                }
            }, err => {
                if (haveError) return;
                haveError = true;
                reject(err)
            })
            index++;
        }
        if (index === 0) {
            resolve([]);
            return;
        }
    });
}




var p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});
var p2 = new Promise(resolve => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
});
var p3 = new Promise(resolve => {
    setTimeout(() => {
        resolve(3);
    }, 500);
});

var p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('我是错误4');
    }, 500);
});

// 与执行顺序无关，用户怎么写入就按什么顺序打印
Promise.all([p1, p2, p3]).then(values => console.log(values));
Promise.myAll([p1, p2, p3]).then(values => console.log(values));


