// 断言、判断内容真假
console.assert(0);//Assertion failed
console.assert(1);// 无输出内容

// 日志打印，换行
console.log(222);

// 清空控制台
// console.clear();//浏览器中输出：Console was cleared

// 进程的打印方法
process.stdout.write(`我不换行`);
process.stdout.write(`我真的不换行\n`);

// 打印错误信息
console.error('我是一条红色的错误信息！');

// 打印bug信息（对象形式，后续的对象存储在数组中）
console.debug(
    {
        error: 404,
        msg: "server error"
    },
    [{
        error: 500,
        msg: "reload"
    }, {
        error: 200,
        msg: "connect sucess"
    }]
);

//以表格的形式打印
console.table(["apples", "oranges", "bananas"]);
console.table({
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaamother: "apples",
    father: "oranges",
    me: "bananas"
});

//打印通知消息
console.info(
    {
        error: 404,
        msg: "server error"
    },
    [{
        error: 500,
        msg: "reload"
    }, {
        error: 200,
        msg: "connect sucess"
    }]
);


// 内置计时器，精确到ms小数点后3位
let timerstart;
console.time(timerstart);

setTimeout(() => {
    let timeend;
    console.timeEnd(timeend);
}, 1000)


