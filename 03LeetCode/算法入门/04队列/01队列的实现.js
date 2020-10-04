function Queue() {
    this.items = [];
    this.len = 0;
    Queue.prototype.enqueue = function (el) {
        this.len++;
        this.items.push(el);
    }
    Queue.prototype.dequeue = function () {
        this.len--;
        return this.items.shift();
    }
    Queue.prototype.front = function () {
        return this.items[0];
    }
    Queue.prototype.size = function () {
        return this.len;
    }
    Queue.prototype.toString = function () {
        return this.items.toString();
    }
}

let queue = new Queue();
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.dequeue()
console.log(queue.size());
console.log(queue.front());
console.log(queue);