// 复制文件
const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')


const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream);
// 监听数据处理
readStream.on('data',chunk=>{
    console.log(chunk.toString());
})
// 监听读写结束
console.log();
readStream.on('end',()=>{
    console.log(`finish copy!`);
})

