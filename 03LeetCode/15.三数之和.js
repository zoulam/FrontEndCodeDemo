/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */


var threeSum = function (nums) {
    let ans = [];
    let len = nums.length;
    if (nums == null || len < 3) return ans;

    nums.sort((a, b) => a - b);

    for (i = 0; i < len - 2; i++) {

        if (nums[0] > 0) return ans;
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        let l = i + 1;
        let r = len - 1

        while (l < r) {
            let sum = nums[i] + nums[l] + nums[r];

            if (sum == 0) {
                ans.push([nums[i], nums[l], nums[r]]);
                while (nums[l] == nums[l + 1]) {
                    l++;
                }
                while (nums[r] == nums[r - 1]) {
                    r--;
                }
                l++;
                r--;
            }

            else if (sum > 0) r--;
            else if (sum < 0) l++
        }
    }
    return ans;
};
// @lc code=end

let ans = threeSum([-1, 0, 1, 2, -1, -4])
let ans2 = threeSum([1, 1, 1, 2, 1, 4])
// console.log([-1, 0, 1, 2, -1, -4].sort((a, b) => a - b));
console.log(ans,ans2);