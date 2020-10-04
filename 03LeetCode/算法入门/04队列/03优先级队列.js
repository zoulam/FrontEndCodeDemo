function PriorityQueue() {
    this.items = [];
    this.len = 0;
    function QueueElement(el, priority) {
        this.el = el;
        this.priority = priority;
    }
    PriorityQueue.prototype.enqueue = function (el, priority) {
        let queueElement = new QueueElement(el, priority);

        if (this.len === 0) {
            this.len++;
            this.items.push(queueElement);
            console.log('run1');
        } else {
            let added = false;
            for (let i = 0; i < this.len; i++) {
                // 数字越大优先级越高
                if (queueElement.priority > this.items[i].priority) {
                    console.log('run2');
                    this.len++;
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                console.log('run3');
                this.len++;
                this.items.push(queueElement);
                added = false;
            }
        }
    }

    PriorityQueue.prototype.dequeue = function () {
        this.len--;
        return this.items.shift();
    }
    PriorityQueue.prototype.front = function () {
        return this.items[0];
    }
    PriorityQueue.prototype.size = function () {
        return this.len;
    }
    PriorityQueue.prototype.toString = function () {
        let ans = '';
        for (let i = 0; i < this.len; i++) {
            console.log(this.items[i].el, '=>', this.items[i].priority);
        }
        return ans;
    }
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue('a', 1)
priorityQueue.enqueue('b', 20)
priorityQueue.enqueue('c', 3)
console.log(priorityQueue.size());
console.log(priorityQueue.toString());