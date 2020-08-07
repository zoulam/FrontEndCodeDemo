const _ = require('lodash');

// chunk 切块
var nums = [4, 5, 7, 9, 1, 2, 8, 3, 6, 10];
console.log(_.chunk(nums, 2));
// [ [ 4, 5 ], [ 7, 9 ], [ 1, 2 ], [ 8, 3 ], [ 6, 10 ] ]
console.log('-------------------------------------------');


// compact 取出NaN、 undefined、''、0
var nums = [1, 2, 3, 2, 4, NaN, undefined, '', 0, "我是中文"];
console.log(_.compact(nums));
// [ 1, 2, 3, 2, 4 ]
console.log('-------------------------------------------');

// _.uniq
var nums = [1, 1, 2, 3, 3, , 4, 5, 5];
console.log(_.uniq(nums));
console.log('-------------------------------------------');

// foreach乱入
let forLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
forLoop.forEach(item => {
    console.log(item);
});
console.log();
console.log('-------------------------------------------');
for (let i = 0; i < forLoop.length; i++) {
    console.log(forLoop[i]);
}
console.log('-------------------------------------------');

// map 返回新数组
let test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = test.map(item => item * 2);
console.log(result);