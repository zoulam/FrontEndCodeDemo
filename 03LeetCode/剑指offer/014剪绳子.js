var cuttingRope = function (n) {
    // if (n == 0 || n == 1 || n == 2) return 1;
    // if (n == 3) return 2;
    // let count = 1;
    // // 经过数学证明 前面全是三
    // while (n >= 5) {
    //     count *= 3;
    //     n -= 3;
    // }
    // return count * n;

    // https://leetcode-cn.com/problems/jian-sheng-zi-lcof/solution/bu-yong-shu-xue-gui-lu-dong-tai-gui-hua-jie-jue-we/
    let dp = [0, 0, 1];
    let temp;
    for (let i = 3; i <= n; i++) {
        // 赋初值
        dp[i] = 2 * (i - 2);
        // j是切割的起点长度（即最短切成2），但是不能超过绳子长度的一半
        for (j = 2; j <= Math.floor(i / 2); j++) {
            // 比较三个的长度：
            // 直接切两段：j * (i - j)
            // 一段直接切，一段取前面的最优：j * dp[i - j]
            // 两段取前面最优
            temp = Math.max(j * (i - j), j * dp[i - j], dp[j] * dp[i - j]);
            dp[i] < temp && (dp[i] = temp);
        }
    }
    return dp[n];
}