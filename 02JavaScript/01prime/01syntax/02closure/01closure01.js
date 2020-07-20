// 闭包实现初体验
function closureTest() {
    let sum = 100;

    function add(arg) {
        sum += arg;
        console.log(sum);
    }

    function reduce(arg) {
        sum += arg;
        console.log(sum);
    }
    return [add, reduce];
}

let answer = closureTest();

answer[1](2);
answer[1](2);
answer[1](2);
answer[1](2);
answer[1](2);
answer[1](2);