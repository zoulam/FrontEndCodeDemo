const path = require('path');

const path1 = path.resolve('/a/b', '/c/d');
// 结果： /c/d
console.log(path1);
const path2 = path.resolve('/a/b', 'c/d');
console.log(path2);
// 输出： /a/b/c/d
const path3 = path.resolve('/a/b', '../c/d');
console.log(path3);
// 输出： /a/c/d
const path4 = path.resolve('a', 'b');
console.log(path4);
// 输出： /Users/xiao/work/test/a/b
