/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
    var i = 0,
        j = nums.length - 1;
    while (i < j) {
        if (nums[i] % 2 === 0) {  // 左侧偶数
            while (nums[j] % 2 === 0 && i < j) {
                j--;
            }
            if (i < j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
        i++;
    }
    return nums;
};

let ans = exchange([2, 16, 3, 5, 13, 1, 16, 1, 12, 18, 11, 8, 11, 11, 5, 1])
console.log(ans);