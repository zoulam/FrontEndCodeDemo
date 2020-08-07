let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//插入
console.log(nums.push(10));
console.log(nums.unshift(-1, 0));
console.log(nums);
console.log('-------------------------------------------');



// 删除
console.log(nums.pop());
console.log(nums);
console.log(nums.shift());
console.log(nums);
console.log('-------------------------------------------');

// 反转
console.log(nums.reverse());

console.log('-------------------------------------------');
// 切割/替换    args1:切割起点  args2 ：切割长度 args3：添加内容
// 返回值是被取出的内容
console.log(nums.splice(1, 2, 0, 1));
console.log(nums);


console.log('-------------------------------------------');
// 排序
let nums2 = [4, 5, 7, 9, 1, 2, 8, 3, 6, 10];
console.log(nums2.sort((a, b) => a - b));
// 逆序
console.log(nums2.sort((a, b) => b - a));
// 随机排序
function random() {
    if (Math.random() > 0.5) {
        return 1;
    } else {
        return -1;
    }
}
console.log(nums.sort(() => random())) // [0~1)
// [
//     7, 3, 8, 4, 5,
//     9, 1, 0, 2, 6
//   ]

// [
//     3, 0, 5, 8, 1,
//     2, 4, 7, 6, 9
//   ]


// 下面的方法，在新数组上操作
console.log('-------------------------------------------');
// 拼接
let nums3 = ['luluxi', 'lalaxi'];
let nums4 = ['hello', 'world'];
let nums5 = nums3.concat(nums4);
console.log(nums3, nums4, nums5);
console.log('-------------------------------------------');



// slice 剪切 左闭右开
let nums6 = [4, 5, 7, 9, 1, 2, 8, 3, 6, 10];
let nums7 = nums6.slice(0, 2);
console.log(nums7);
console.log('-------------------------------------------');


// join 以什么分割，return字符串
let nums8 = ['a', 'b', 'c'];
let str = nums8.join('--');
console.log(str);
// 字符串方法还原回去
let nums9 = str.split('--');
console.log(nums9);


// 直接变成字符串的方法,逗号隔开
let str2 = nums8.toString();
console.log(str2);
let nums10 = str2.split(',');
console.log(nums10);
console.log('-------------------------------------------');

// for each filter  reduce



