const fs = require('fs');
const path = require('path');
// 创建目录
const curpath = path.join(__dirname,'copy')
fs.mkdir(curpath, { recursive: true }, (err) => {
    if (err) throw err;
});