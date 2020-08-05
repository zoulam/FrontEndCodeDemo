const fs = require('fs');
const path = require('path');

// function getFileContent(fileName, callback) {
//     // 获取文件内容
//     // __dirname当前目录
//     // resolve目录拼接
//     const fullFileName = path.resolve(__dirname, 'files', fileName);
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         callback(
//             JSON.parse(data.toString())
//         );

//     });
// }

// const fullFileName = path.resolve(__dirname, 'files', 'a.json');
// console.log(fullFileName);//xx\05promise\files\a.json

function getFileContent(fileName) {
    const p = new Promise((res, rej) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                rej(err);
                return;
            }
            res(JSON.parse(data.toString()));
        })
    });
    return p;
}

getFileContent('a.json').then((value) => {
    console.log(value);
    return getFileContent(value.next);
}).then((value)=>{
    console.log(value);
    return getFileContent(value.next);
}).then((value)=>{
    console.log(value);
})
