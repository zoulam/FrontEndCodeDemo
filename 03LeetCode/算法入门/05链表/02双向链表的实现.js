// 双向链表可以顺序和逆序读取，同时具备链表高效的插入和删除
// 使用例子：文本编辑器
// 实现复杂
function DoubleLinkedList() {
    this.head = null;
    this.tail = null;
    this.len = 0;
    function Node(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    DoubleLinkedList.prototype.append = function (data) {
        let newNode = new Node(data);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.len++;
    }
    DoubleLinkedList.prototype.insert = function (pos, el) {
        // 对position进行越界判断
        if (pos < 0 || pos > this.len) return false;


        // 插入
        let newNode = new Node(el);
        // 链表为空
        if (this.len == 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            // 插入头部
            if (pos === 0) {
                this.head.next = newNode;
                newNode.next = this.head;
                this.head.prev = newNode;
            } else if (pos == this.len) {
                newNode.prev = this.tail;
                this.tail.next = newNode;
                this.tail = newNode;
            } else {
                let prev = null;
                let cur = this.head;
                let index = 0;
                while (index < pos) {
                    prev = cur;
                    cur = cur.next;
                    index++;
                }
                newNode.next = cur;
                newNode.prev = prev;
                cur.prev = newNode;
                prev.next = newNode;
            }
        }
        this.len++;
        return true;
    }
    DoubleLinkedList.prototype.get = function (pos) {
        if (pos < 0 || pos >= this.len) return null;
        let cur = this.head;
        let index = 0;
        while (index < pos) {
            cur = cur.next;
            index++;
        }
        return cur.data;
    }
    DoubleLinkedList.prototype.indexOf = function (data) {
        let index = 0;
        let cur = this.head;
        while (cur) {
            if (cur.data === data) {
                return index;
            } else {
                cur = cur.next;
                index++;
            }
        }
        return -1;
    }
    DoubleLinkedList.prototype.update = function (pos, data) {
        if (pos < 0 || pos >= this.len) return false;
        if (pos === 0) {
            this.head.data = data;
        } else if (pos === this.len - 1) {
            this.tail.data = data;
        } else {
            let cur = this.head;
            index = 0;
            while (index++ < pos) {
                cur = cur.next;
            }
            cur.data = data;
        }
        return true;
    }

    DoubleLinkedList.prototype.removeAt = function (pos) {
        if (pos < 0 || pos > this.len - 1) return false
        if (this.len === 1) {
            this.head = null;
            this.tail = null;
        } else {
            if (pos === 0) {
                this.head.next.prev = null;
                this.head = this.head.next;
            } else if (pos === this.len - 1) {
                let cur = this.head;
                let prev = null;
                let index = 0;
                while (index++ < pos) {
                    prev = cur;
                    cur = cur.next;
                }
                this.tail = prev;
                prev.next = null;
            } else {
                let prev = null;
                let cur = this.head;
                let next = this.head.next;
                let index = 0;
                while (index++ < pos) {
                    prev = cur;
                    cur = cur.next;
                    next = next.next;
                }
                next.prev = prev;
                prev.next = next;
            }
        }
        this.len--;
        return true;
    }
    DoubleLinkedList.prototype.remove = function (data) {
        let pos = this.indexOf(data);
        return this.removeAt(pos);
    }
    DoubleLinkedList.prototype.removeAll = function () {
        this.head = null;
        this.len = 0;
    }

    DoubleLinkedList.prototype.toArray = function () {
        return this.backwardString();
    }

    DoubleLinkedList.prototype.forwardString = function () {
        let current = this.tail;
        let listArray = [];
        while (current) {
            listArray.push(current.data);
            current = current.prev;
        }
        return listArray;
    }

    DoubleLinkedList.prototype.backwardString = function () {
        let current = this.head;
        let listArray = [];
        while (current) {
            listArray.push(current.data);
            current = current.next;
        }
        return listArray;
    }
}

let dblist = new DoubleLinkedList();
dblist.insert(0, '0')
dblist.append('a')
dblist.append('b')
dblist.append('c')
dblist.append('d')
dblist.insert(4, 'C')
dblist.insert(6, 'D')
console.log(dblist.toArray());
console.log('get index(4): ', dblist.get(4));
console.log('indexOf(c) ', dblist.indexOf('c'));
console.log('-------------------------------------------');
dblist.update(0, 'o')
dblist.update(6, 'd')
dblist.update(1, 'A')
console.log(dblist.toArray());
console.log('-------------------------------------------');
console.log(dblist.toArray());
dblist.removeAt(0)
console.log('removeAt 0');
console.log(dblist.toArray());
console.log('-------------------------------------------');
console.log(dblist.toArray());
dblist.removeAt(1)
console.log('removeAt 1');
console.log(dblist.toArray());
console.log('-------------------------------------------');
console.log(dblist.toArray());
console.log('append');
dblist.append('g')
console.log(dblist.toArray());
dblist.removeAt(5)
console.log('removeAt end');
console.log(dblist.toArray());
console.log('-------------------------------------------');
console.log(dblist.toArray());
console.log('removeA');
console.log(dblist.remove('A'));
console.log(dblist.toArray());
console.log('-------------------------------------------');
console.log(dblist.forwardString());