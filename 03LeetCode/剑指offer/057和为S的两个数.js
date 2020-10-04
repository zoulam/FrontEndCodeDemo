var twoSum = function (nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            return [map.get(nums[i]), nums[i]]
        } else {
            map.set(target - nums[i], nums[i])
        }
    }
};