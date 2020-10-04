Promise.myAllSettled = function (promises) {
    // 适合互不关联的情况，就算reject也不会终止执行

    return new Promise((resolve, reject) => {
        let elCount = 0;
        const result = [];
        function addElementToResult(index, elem) {
            result[index] = elem;
            elCount++;
            if (elCount === result.length) {
                resolve(result);
            }
        }

        let index = 0;
        // 跟all一样处理promises，但是不会执行reject(),只执行封装之后的resolve
        for (const promise of promises) {
            const curIndex = index;
            promise.then(
                (value) => addElementToResult(
                    curIndex, {
                    status: 'fulfilled',
                    value
                }),
                (reason) => addElementToResult(
                    curIndex, {
                    status: 'rejected',
                    reason
                }));
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

var p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('我是错误4');
    }, 500);
});

Promise.allSettled([p1, p2, p4]).then(values => console.log(values));
Promise.myAllSettled([p1, p2, p4]).then(values => console.log(values));

