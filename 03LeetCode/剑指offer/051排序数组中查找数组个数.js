var search = function (nums, target) {
    let ans = 0;
    let L = 0;
    let R = nums.length - 1; // 0 2
    while (L < R) {
        let mid = Math.floor((R + L) / 2);
        if (nums[mid] > target) {
            R = mid - 1;
        } else if (nums[mid] < target) {
            L = mid + 1;
        } else {
            L = mid;
            break;
        }
    }
    while (L < nums.length && nums[L++] == target)
        ans++;
    return ans;
};
let ans = search([1, 2, 3], 2)
console.log(ans);