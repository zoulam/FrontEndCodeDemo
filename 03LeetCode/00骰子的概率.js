function twoSum(n) {

    function doubleArray(line, row) {
        let dp = new Array(line);
        for (let i = 0; i < dp.length; i++) {
            dp[i] = new Array(row);
        }
        return dp;
    }

    // console.log(doubleArray(2, 3)); // 2行 3列
    // 0-n 0-j n+1 行，j+1列


    let dp = doubleArray(n + 1, n * 6 + 1)
    // 赋初值

    dp[1] = [0, 1, 1, 1, 1, 1, 1];

    // 状态转移方程
    for (let i = 2; i <= n; i++) {// i骰子个数
        for (let j = i; j <= 6 * i; j++) {// j出现的和
            for (let cur = 1; cur <= 6; cur++) {// 和为j与和为j-6 …… j-1 的遍历
                if (j - cur <= 0) break;
                if (typeof (dp[i][j]) === 'undefined') dp[i][j] = 0;
                if (typeof (dp[i - 1][j - cur]) === 'undefined') dp[i - 1][j - cur] = 0;
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

console.log(twoSum(3));