// let sleepFun = (time) => new Promise((resolve) => setTimeout(resolve, time));
let sleepFun2 = function (time) {
    return new Promise(resolve =>
        setTimeout(resolve, time)
    )
}

let fun = () => console.timeEnd('time');
console.time("time");
sleepFun2(3000).then(fun);