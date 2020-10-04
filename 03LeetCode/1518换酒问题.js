var numWaterBottles = function (buy, change) {
    let empty = buy, // 空瓶子数
    ans = buy;  // 喝酒总数
    while (empty >= change) {
        empty -= change;
        ++ans;
        ++empty;
    }
    return ans;
};
let ans = numWaterBottles(15, 4);
console.log(ans);