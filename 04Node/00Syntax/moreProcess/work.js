const { spawn, exec, execFile, fork } = require('child_process');
const fib = (num) => {
    if (num === 1 || num === 2) {
        return num;
    }
    let a = 1, b = 2, sum = 0;
    for (let i = 3; i <= num; i++) {
        sum = a + b;
        a = b;
        b = sum;
    }
    return sum;
}

const num = Math.floor(Math.random() * 10) + 3;
const result = fib(num);
console.log(num, result, process.pid);