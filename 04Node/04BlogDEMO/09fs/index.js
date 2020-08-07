const fs = require('fs');
// 统一路径处理，兼容Mac和Windows
const path = require('path');

// __dirname：nodejs的全局变量，表示当前目录
const fileName = path.resolve(__dirname, 'data.txt')





// 写
const content = '我是zoulam\n';
const opt = {
    flag: 'a'// 'a' 是add追加 'w'是write重写覆盖
}

fs.writeFile(fileName,content,opt,(err)=>{
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

// 判断文件是否存在
fs.exists(fileName,(exists)=>{
    console.log('exists:',exists);
})