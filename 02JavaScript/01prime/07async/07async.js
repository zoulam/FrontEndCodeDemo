// 07await.js

function test() {
    console.log('i just a normal function!');
    return 4;
}

async function async1() {
    let result2 = await async2();
    let result3 = await async3();
    let result4 = await test();
    try {
        let result4 = await async4();
    } catch (e) {
        console.log(e);
    }
    console.log(result2);
    console.log(result3);
    console.log(result4);
}
async function async2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, 1000)
    })
}

async function async3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(3);
        }, 500)
    })
}

async function async4() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("run error!")
        }, 500)
    })
}

async1();
//跟执行顺序无关
// i just a normal function!
// run error!
// 2
// 3
// 4
