// b.js
// 按需导入
// const add = require('./a').add;
// const muti = require('./a').muti;


// 全部导入
// const opt = require('./a');
// const add = opt.add;
// const muti = opt.muti;

//解构语法导入
const { add, muti } = require('./a');
const _ = require('lodash');
console.log(add(10, 20));//30
console.log(muti(10, 5));//5
console.log(_.concat([1, 2], 3));