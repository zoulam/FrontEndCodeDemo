/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    nums.sort((a, b) => a - b);
    let ans = nums[Math.floor(nums.length / 2)];
    return ans;
};
// @lc code=end

let ans = majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2])
console.log(ans);