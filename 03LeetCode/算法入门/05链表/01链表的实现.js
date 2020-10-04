function LinkedList() {
    this.head = null;
    this.len = 0;
    function Node(data) {
        this.data = data;
        this.next = null;
    }

    LinkedList.prototype.append = function (data) {
        let newNode = new Node(data);
        if (this.head == null) {
            this.head = newNode;
        } else {
            // 获取没有append前的最后一个节点
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.len++;
    }
    LinkedList.prototype.insert = function (pos, el) {
        // 对position进行越界判断
        if (pos < 0 || pos > this.len) return false;

        // 插入
        let newNode = new Node(el);
        // 插入头部
        if (pos == 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {// 插入指定坐标节点前
            let index = 0;
            let previous = null;
            let current = this.head;
            // 注：this.head的作用是给第一个节点命名
            while (index < pos) {
                previous = current;
                current = current.next;
                index++;
            }
            newNode.next = current
            previous.next = newNode;
        }
        this.len++;
        return true;

    }
    LinkedList.prototype.get = function (pos) {
        if (pos < 0 || pos >= this.len) return null;
        let cur = this.head;
        let index = 0;
        while (index < pos) {
            cur = cur.next;
            index++;
        }
        return cur.data;
    }
    LinkedList.prototype.indexOf = function (data) {
        let index = 0;
        let cur = this.head;
        while (cur) {
            if (cur.data === data) {
                return index;
            } else {
                cur.next;
                index++;
            }
        }
        return index;
    }
    LinkedList.prototype.update = function (pos, data) {
        if (pos < 0 || pos >= this.len) return false;
        if (pos === 0) {
            this.head.data = data;
        } else {
            let index = 0;
            let cur = this.head;
            while (index < pos) {
                cur = cur.next;
                index++;
            }
            cur.data = data;
        }

        return true;
    }

    LinkedList.prototype.removeAt = function (pos) {
        if (pos < 0 || pos > this.len - 1) return false
        if (pos === 0) {
            this.head = this.head.next;
        } else {
            let index = 0;
            let prev = null;
            let cur = this.head;
            while (index < pos) {
                prev = cur;
                cur = cur.next;
                index++;
            }
            prev.next = cur.next;
        }
        return true;
    }
    LinkedList.prototype.remove = function (data) {
        let pos = this.indexOf(data);
        return this.removeAt(pos);
    }
    LinkedList.prototype.removeAll = function () {
        this.head = null;
        this.len = 0;
    }

    LinkedList.prototype.toArray = function () {
        let current = this.head;
        let listArray = [];
        while (current) {
            listArray.push(current.data);
            current = current.next;
        }
        return listArray;
    }
}

let list = new LinkedList();
list.append('a')
list.append('b')
list.append('d')
list.append('e')
list.insert(2, 'c')
console.log(list.get(2));
list.update(0, 'A');
list.update(1, 'B');
console.log(list.toArray());
list.removeAt(1);
console.log('removeAt 1');
console.log(list.toArray());
console.log('indexOf A:', list.indexOf('A'));
list.remove('A');
console.log(list.toArray());
list.removeAll();
console.log('removeAll:', list);
