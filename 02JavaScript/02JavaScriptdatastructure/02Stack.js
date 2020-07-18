// 栈的特征先进后出，JavaScript的Array也有这个特性
function MyStack() {
    this.count = 0;
    this.storage = {};

    this.push = function (value) {
        this.storage[this.count] = value;
        this.count++;
    }

    this.pop = function () {
        if (this.count === 0) {
            return undefined;
        }
        this.count--;
        var result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    this.peek = function () {
        return this.storage[this.count - 1];
    }

    this.size = function () {
        return this.count;
    }
}

let stack = new MyStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
console.log(stack.storage,stack.size);
// { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
stack.pop();
console.log(stack.storage,stack.size);
// { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }