const fs = require('fs');
// 统一路径处理，兼容Mac和Windows
const path = require('path');

const fileName = path.resolve(__dirname, 'test.txt')


// 写
const content = '我是zoulam\n';
const opt = {
    flag: 'a',// 'a' 是add追加 'w'是write重写覆盖
}

fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err)
        return
    }
});
// 只写入一行，大量操作也是极其耗费内存的



// 读
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    // data(二进制)=>字符串
    console.log(data.toString());
});
// 如果大文件读取会极大消耗内存

// 判断文件是否存在 exists api被废弃
// fs.exists(fileName, (exists) => {
//     console.log('exists:', exists);
// })

file = path.basename(fileName)
// 逻辑，没有错误就存在
fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});