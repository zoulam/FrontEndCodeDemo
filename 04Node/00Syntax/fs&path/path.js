const {
    basename,// 文件名(带后缀)
    delimiter,// 特殊界定符,拆分环境变量（自动识别环境实现兼容）
    dirname,// 获取父路径
    extname,// 获取后缀名
    format, // 格式化路径对象 【对象=>string】
    parse,// 与format相反
    isAbsolute,// 判断是否是绝对路径
    join,// 路径拼接
    resolve, // 路径拼接
    normalize,// 规范路径
    relative,// 参数1到参数2的相对路径
    sep,// 与delimiter类似
    toNamespacedPath,// 仅在window有效
    // 两个平台的特定api实现
    posix,
    win32,
} = require('path')

console.log('----------------basename---------------------------');
console.log(basename(resolve(__dirname, 'path.js')));
console.log(basename(join(__dirname, 'path.js')));
console.log('------------------delimiter-------------------------');
// 环境变量的全部，
// console.log(process.env.PATH);
console.log(process.env.PATH.split(delimiter));
console.log('------------------dirname-------------------------');
console.log(dirname('./parent/children/grandson'));
console.log('-------------------extname------------------------');
console.log(extname(resolve(__dirname, 'path.js')));
console.log('-------------------join/dirname------------------------');
console.log(resolve(__dirname, 'path.js'));
console.log(join(__dirname, 'path.js'));
console.log('-------------------区别1:根路径识别------------------------');
console.log(join('/a', '/b'));// \a\b
// 识别/为rootpath，即先把a当成根路径后面又把b当成根路径将前面的覆盖了
console.log(resolve('/a', '/b'));// F:\b
console.log('---------------------区别2:出现非路径参数----------------------');
// 当前路径为
console.log(join('a', 'b', '..', 'd'));
// a\d
console.log(resolve('a', 'b', '..', 'd'));
// F:\Code\vscode\FrontEndCodeDemo\04Node\00Syntax\fs&path\a\d

console.log('--------------------parse-----------------------');
// ┌─────────────────────┬────────────┐
// │          dir        │    base    │
// ├──────┬              ├──────┬─────┤
// │ root │              │ name │ ext │
// "  /    目录1/目录2    / 文件   .txt "
// └──────┴──────────────┴──────┴─────┘

console.log(parse("/目录1/目录2/文件.txt "));

console.log('--------------------toNamespacedPath-----------------------');
console.log(toNamespacedPath(__dirname));

