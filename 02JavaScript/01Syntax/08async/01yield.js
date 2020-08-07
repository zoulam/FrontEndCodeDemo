// 异步函数一直是JavaScript的重要概念
// yield 生成器函数
function* gen1(arg) {
    console.log(arg);
    let one = yield 111;
    console.log(one);
    let two = yield 222;
    console.log(two);
    let three = yield 333;
    console.log(three);
}

//执行获取迭代器对象
let iterator = gen1('AAA');
console.log(iterator.next());
//next方法可以传入实参
console.log(iterator.next('BBB'));
console.log(iterator.next('CCC'));
console.log(iterator.next('DDD'));
console.log('-------------------------------------------');



// 异步实践
// 场景： 文件操作 网络操作(ajax, request) 数据库操作

// 回调地狱
// setTimeout(() => {
//     console.log(111);
//     setTimeout(() => {
//         console.log(222);
//         setTimeout(() => {
//             console.log(333);
//         }, 3000);
//     }, 2000);
// }, 1000);

function one() {
    setTimeout(() => {
        console.log(111);
        iterator2.next();
    }, 1000)
}

function two() {
    setTimeout(() => {
        console.log(222);
        iterator2.next();
    }, 2000)
}

function three() {
    setTimeout(() => {
        console.log(333);
        iterator2.next();
    }, 3000)
}

function* gen2() {
    yield one();
    yield two();
    yield three();
}

//调用生成器函数
let iterator2 = gen2();
iterator2.next();



