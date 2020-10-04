console.log('__dirname: ', __dirname);// 当前文件目录不包含文件
console.log('filename: ', __filename);// 完整路径（包含当前文件）
console.log('-------------------------------------------');


const path = require('path');
const { join, resolve } = require('path');// es6解构赋值更好用
// const  join  = require('path').join;// 上下两个效果相同


let extname = path.extname(__filename);// 解析文件后缀
console.log('extname', extname);
let basename = path.basename(__filename);
console.log('basename', basename);// 解析文件名(带后缀)
console.log('-------------------文件名拼接------------------------');


console.log(join(__dirname, basename));
// console.log(path.relative(A,B));// 从A文件到B文件的相对路径
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea'));
// 注：此处的斜杠是window下的
// ..\..
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/text/bbb'));
// ..\..\text\bbb


console.log('-------------------------------------------');


// 获取上级目录
console.log(path.dirname('/目录1/目录2/目录3')); //   /目录1/目录2
console.log(path.dirname('/目录1/目录2/目录3/目录4')); //  /目录1/目录2/目录3

console.log('-------------------------------------------');
let num = new Number(13.15487)
console.log(num.toPrecision(3));


console.log('-------------------------------------------');

// console.log("global: ", global);
// console.log('process: ', process);// 打印进程信息
console.log(process.versions.v8);
console.log(process.versions.node);
console.log(process.versions.http_parser);
console.log(process.versions.ares);
console.log(process.versions.openssl);