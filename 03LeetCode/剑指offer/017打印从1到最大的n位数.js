var printNumbers = function (n) {
    let temp = 10 ** n;
    let ans = [];
    for (let i = 1; i < temp; i++) {
        ans.push(i);
    }
    return ans;
};
console.log(printNumbers(2));