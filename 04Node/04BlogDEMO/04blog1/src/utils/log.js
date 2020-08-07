const fs = require('fs');
const path = require('path');


// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + "\n")
    // fs.createWriteStream.write()
}

// 生成 write stream
function createWriteStream(fileName) {
    // 获取日志文件地址
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream;
}


// 访问日志写入文件
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}

// let time = new Date();
// let year = time.getFullYear();
// let day = time.getDate();
// let month =time.getMonth();
// let hour =time.getHours();
// let min =time.getMinutes();
// let sec=time.getSeconds();

// console.log(`${year}-${month}-${day}-${hour}-${min}-${sec}`);