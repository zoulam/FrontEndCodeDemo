/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // 1. 构造哈希表
    const map = new Map(); // 存储方式 {need, index}

    // 2. 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 2.1 如果找到 target - nums[i] 的值
        if (map.has(nums[i])) {
            // nums[i](key)  value
            return [map.get(nums[i]), i];
            // value
        } else {
            // 2.2 如果没找到则进行设置
            map.set(target - nums[i], i);
            // map 内存储的结构
            // 对应值 当前数组下标
            //      map.get(nums[i])
            // 7   0
            // 2   1
            // -2  2
            // -6  3
        }
    }
};
// @lc code=end

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]