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

// getFileContent('a.json').then((value) => {
//     console.log(value);
//     return getFileContent(value.next);
// }).then((value)=>{
//     console.log(value);
//     return getFileContent(value.next);
// }).then((value)=>{
//     console.log(value);
// })

async function readFileData() {
    // 不同写法
    try {
        const aData = await getFileContent('a.json');
        console.log('a data', aData);
        const bData = await getFileContent(aData.next)
        console.log('b data', bData);
        const cData = await getFileContent(bData.next)
        console.log('c data', cData);
    } catch (error) {
        console.error(error);
    }
}

readFileData();

// async function readAData() {
//     const aData = await getFileContent('a.json');
//     return aData;
// }

// async function test() {
//     const aData = await readAData();
//     console.log(aData,typeof aData);
// }

// test();

// await Promise
// async function Function(){await}
// async return Promise
// try-catch 捕获Promise中的reject的值
