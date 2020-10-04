function doubleArray(j, k) {
    let dp = new Array(j);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(k);
    }
    return dp;
}

let nums = doubleArray(2, 3); // 2行 3列
// 0-n 0-j n+1 行，j+1列

for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
        if (typeof (nums[i][j]) === 'undefined') {
            nums[i][j] = 0;
        }
    }
}

console.log(nums);