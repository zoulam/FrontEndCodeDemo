var strToInt = function (str) {
    let res = str.match(/^\s*[+-]?\d+/);
    if (!res) return 0;
    res = str.match(/^\s*[+-]?\d+/)[0].trim();

    // 越界处理
    if (res >= Math.pow(2, 31)) return Math.pow(2, 31) - 1;
    else if (res <= Math.pow(-2, 31)) return Math.pow(-2, 31)
    // 正常返回
    else return res;
};

let ans = strToInt('++++-*-- 987')
console.log(ans);