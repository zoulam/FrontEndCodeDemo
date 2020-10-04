/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    if (l1.val == 0) return l2;
    if (l2.val == 0) return l1;
    let newVal = getNum(l1) + getNum(l2);
    let cur = new ListNode();
    let res = (newVal + '').split('').reverse().join('');
    console.log(res);
    for (let i = 0; i < res.length; i++) {
        cur.val = Number(res[i]);
        cur = cur.next;
    }
    return cur;
};
// @lc code=end
let res = (807 + '').split('').reverse().join('');
for (let i = 0; i < res.length; i++) {
    console.log(Number(res[i]));
}
// console.log(res, typeof res);
