// master.js
const { fork } = require('child_process');
const cpus = require('os').cpus();

for (let i = 0, len = cpus.length; i < len; i++) {
    fork('./worker.js');
}


const logWorker = fork('./log.js');

for (let i = 0, len = cpus.length - 1; i < len; i++) {
    const worker = fork('./fib.js');
    worker.send(Math.floor(Math.random() * 10 + 4)); // 要计算的num
    worker.on('message', (data) => { // 计算后返回的结果
        logWorker.send(data); // 将结果发送给输出进程
    })
}