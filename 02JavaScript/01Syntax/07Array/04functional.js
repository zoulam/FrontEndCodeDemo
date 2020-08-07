// 04functional.js
// 函数式的三件套
// filter 过滤函数
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result1 = words.filter(word => word.length > 6);
const result2 = nums.filter(item => item > 6);
console.log(result1, result2);

console.log('-------------------------------------------');

// reduce


// for each 遍历
let nums1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
nums1.forEach(item => {
    item = item + 1;
    console.log(item);
})
console.log(nums1);
