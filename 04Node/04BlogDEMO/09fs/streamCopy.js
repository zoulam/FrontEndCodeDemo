// 复制文件
const fs = require('fs');
const path = require('path');
// 创建目录
const curpath = path.join(__dirname, 'copy')
fs.mkdir(curpath, { recursive: true }, (err) => {
    if (err) throw err;
});

// 被复制文件
const fileName1 = path.resolve(__dirname, 'data.txt')
// 复制文件
const fileName2 = path.resolve(curpath, 'data-bak.txt')

// 创建读写流
const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream);
// 监听数据处理
readStream.on('data', chunk => {
    console.log(chunk.toString());
})
// 监听读写结束
console.log();
readStream.on('end', () => {
    console.log(`finish copy!`);
})

