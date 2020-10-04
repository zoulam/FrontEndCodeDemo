Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
        // 添加状态判断，只要执行过了就关闭状态
        let status = false;
        for (const promise of promises) {
            if (status) return;
            promise.then(
                (value) => {
                    if (status) return;
                    status = true;
                    resolve(value);
                },
                (err) => {
                    if (status) return;
                    status = true;
                    reject(err);
                });
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

// 谁快执行谁
Promise.race([p1, p2, p3]).then(values => console.log(values));
Promise.myRace([p1, p2, p3]).then(values => console.log(values));