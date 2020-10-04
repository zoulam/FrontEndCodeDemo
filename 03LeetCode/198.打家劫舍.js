/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (a) {
    // let n = nums.length;
    // if (n == 0) return 0;
    // if (n == 1) return nums[0];
    // if (n == 2) return Math.max(nums[0], nums[1])

    // // 创建二维数组
    // let dp = new Array(n);
    // for (let i = 0; i < dp.length; i++) {
    //     dp[i] = new Array(2);
    // }

    // dp[0][0] = 0;
    // dp[0][1] = nums[0];
    // for (let i = 1; i < n; i++) {
    //     // 存储以不打劫为间隔的组合值

    //     // 如果i位置不抢，则取（前一位和后一位）比较大的
    //     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])

    //     // 存储当前位置的数组值和前面两位开始的组合值的和
    //     // 如果i位置要抢，前一位则不抢，然后考虑从n-2的位置开始算
    //     dp[i][1] = nums[i] + dp[i - 1][0]
    // }
    // let result = Math.max(dp[n - 1][0], dp[n - 1][1]);
    // return result;




    let n = a.length;
    if (n == 0) return 0;
    if (n == 1) return a[0];
    if (n == 2) return Math.max(a[0], a[1]);

    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(2)
    }

    dp[0][0] = 0;
    dp[0][1] = a[0];

    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
        dp[i][1] = a[i] + dp[i - 1][0]
        // dp[i - 1][0] 是间隔一位的最优解
    }

    let result = Math.max(dp[n - 1][0], dp[n - 1][1])
    return result;
};
// @lc code=end

