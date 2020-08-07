// 队列的特点是先进先出
function Queue() {
  var collection = [];

  this.print = function () {
    console.log(collection);
  }

  this.enqueue = function (element) {
    collection.push(element);
  }

  this.dequeue = function () {
    return collection.shift();
  }

  this.front = function () {
    return collection[0];
  }

  this.isEmpty = function () {
    return collection.length === 0;
  }

  this.size = function () {
    return collection.length;
  }
}

let queue = new Queue();
queue.enqueue(5);
console.log(queue.size());
