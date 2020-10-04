/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    let ans;
    if (n == 1 || n == 2) {
        ans = n;
    } else {
        // i的范围取值，从最小处入手，如三级台阶最少要进入一次循环
        let n1 = 1, n2 = 2;
        for (let i = 3; i <= n; i++) {
            ans = n1 + n2;
            n1 = n2;
            n2 = ans;
        }
    }
    return ans;
};
// @lc code=end
let ans = climbStairs(80);
console.log(ans);

