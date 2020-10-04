let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 二分查找的前提是有序
function binarySearch(nums, target) {
    let end = nums.length - 1;
    let start = 0;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (target > nums[mid]) start = mid + 1;
        else if (target < nums[mid]) end = mid - 1;
        else return mid
    }
    return false;
}

console.log(binarySearch(nums, 1));
console.log(binarySearch(nums, 2));
console.log(binarySearch(nums, 3));
console.log(binarySearch(nums, 4));
console.log(binarySearch(nums, 5));
console.log(binarySearch(nums, 6));
console.log(binarySearch(nums, 7));
console.log(binarySearch(nums, 8));
console.log(binarySearch(nums, 9));
console.log(binarySearch(nums, 10));
console.log(binarySearch(nums, 100));