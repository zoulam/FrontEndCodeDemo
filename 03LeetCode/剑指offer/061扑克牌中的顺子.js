var isStraight = function (nums) {
    let joker = 0;
    nums.sort((a, b) => a - b) // 数组排序
    for (let i = 0; i < 4; i++) {
        if (nums[i] == 0) joker++; // 统计大小王数量
        else if (nums[i] == nums[i + 1]) return false; // 若有重复，提前返回 false
    }
    return nums[4] - nums[joker] < 5; // 最大牌 - 最小牌 < 5 则可构成顺子
};

console.log(isStraight([0, 0, 1, 2, 5]));