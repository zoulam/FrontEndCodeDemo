/**
 *
 * @param {ListNode} head
 * @description
 * 输入：[1, 2, 3, 3, 2, 1]
 * 输出：[1, 2, 3]
 */
var removeDuplicateNodes = function (head) {
    var p = head;
    while (p) {
        var q = p;
        while (q.next) {
            if (q.next.val == p.val) {
                q.next = q.next.next;
            } else {
                q = q.next;
            }
        }
        p = p.next;
    }
    return head;
};



let node1 = new ListNode(-1);
let node2 = new ListNode(-1);
let p1 = node1;
let p2 = node2;
let p = head;
while (p) {
    if (p.val < x) {
        p1 = p;
        p1 = p1.next;
    } else {
        p2.next = p;
        p2 = p2.next;
    }
    p = p.next;
}

if (node1.next) {
    return head;
} else {
    p1.next = node2.next;
    p2.next = null;
    return node1.next;
}