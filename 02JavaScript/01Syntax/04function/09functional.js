// 遍历，对每一个元素进行操作
// 配合reverse可以反向遍历
let nums = [0, 1, 2];
nums.forEach(item => {
    console.log(item + 1);
})
console.log('-------------------------------------------');


// filter，过滤，保留满足条件的
// 语法：
// var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

let nums2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let nums3 = nums2.filter(item => {
    return item > 8;
})
console.log(nums3);//[ 9, 10 ]

console.log('-------------------------------------------');
// 保留真值
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
console.log(arr);
// [1, 2]


console.log('-------------------------------------------');
// reduce
// 语法
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])



