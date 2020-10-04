var numWays = function (n) {
    if (n == 1 || n == 2) {
        return n;
    } else if (n == 0) {
        return 1;
    }
    let n1 = 1, n2 = 2, n3;
    for (let i = 2; i < n; i++) {
        n3 = (n1 + n2) % 1000000007;
        n1 = n2;
        n2 = n3;
    }
    return n3;
};
let ans = numWays(0);
console.log(ans);