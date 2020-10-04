/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (h) {
    let len = h.length;
    if (len == 0 || len == 1) return 0;
    if (len == 2) return Math.min(h[0], h[1])

    let ans = 0;
    for (let i = 0, j = h.length - 1; i < j;) {
        let area = (j - i) * Math.min(h[i], h[j]);
        ans = Math.max(area, ans)
        // console.log('间隔' + (j - i), '较小数' + Math.min(h[i], h[j]), area, ans);
        // if 执行了elseif就不用进入判断直接跳过
        // 若是if 和if 两者有关联会影响后面的结果
        if (h[i] > h[j]) {
            j--;
        } else if (h[i] <= h[j]) {
            i++;
        }
    }
    return ans;
};
// @lc code=end
let h = [4, 4, 2, 11, 0, 11, 5, 11, 13, 8];
let ans = maxArea(h)
// 3
console.log(ans);

