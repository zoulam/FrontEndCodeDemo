/**
 *
 * @param {} head LinkedList
 * @description 反转链表
 */
function reverse(head) {
    let curr = head,
        prev = null;
    while (curr.next == null) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
}