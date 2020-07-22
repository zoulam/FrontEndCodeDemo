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

// 这样就不用一直then.then.then了
Promise.all([p1, p2, p3]).then(values =>  console.log(values) );//是用户设定的顺序而不是完成的顺序