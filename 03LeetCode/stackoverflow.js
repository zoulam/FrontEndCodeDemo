function twoSum(n) {
    // j为可能出现的和个数
    let count = 6 * n - (n - 1) + 1;
    //  创建dp[n][j] 数组存储状态 n表示已经投出骰子，j表示点数和，数组的值则表示j值出现的次数
    let dp = new Array(n + 1);
    console.log(dp.length, count);
    for (let i = 1; i <= dp.length; i++) {
        dp[i] = new Array(count)
    }

    // 赋初值
    for (let i = 1; i <= 6; i++) {
        dp[1][i] = 1;
    }

    // 状态转移方程
    for (let i = 2; i <= n; i++) {
        for (let j = i; j <= 6 * i; j++) {
            for (let cur = 1; cur <= 6; cur++) {
                dp[i][j] += dp[i - 1][j - cur];
            }
        }
    }

    // 整理结果
    let all = Math.pow(6, n);
    let ret = []
    for (let i = n; i <= 6 * n; i++) {
        ret.push(dp[n][i] * 1.0 / all);
    }
    return ret;
}

console.log(twoSum(2));