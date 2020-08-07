const fs = require('fs');
const path = require('path');
const readline = require('readline');


const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');

// 创建read stream
const readStream = fs.createReadStream(fileName);

// 创建readline 对象

const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0;
let sum = 0;
rl.on('line', (lineData) => {
    if (!lineData) { // 剔除空行
        return
    }
    sum++
    const arr = lineData.split('--');
    // 日志包含chrome关键字
    if (arr[2] && arr[2].indexOf('Firefox') > 0) {
        chromeNum++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log('Chrome占比:',((chromeNum / sum) * 100).toFixed(2) + "%");
})