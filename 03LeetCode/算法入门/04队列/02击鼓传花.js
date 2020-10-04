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

function passGame(namelist, num) {
    let queue = new Queue();
    for (let i = 0; i < namelist.length; i++) {
        queue.enqueue(namelist[i]);
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue();
    }
    let ans = queue.front();
    console.log('ans', ans);
    return namelist.indexOf(ans);
}

let namelist = ['11', '22', '33', '44', '55']
console.log(passGame(namelist, 3));