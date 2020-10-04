function Stack() {
    this.items = [];
    this.len = 0;
    Stack.prototype.push = function (el) {
        this.len++;
        this.items.push(el);
    }
    Stack.prototype.pop = function () {
        this.len--;
        return this.items.pop();
    }
    Stack.prototype.peek = function () {
        return this.items[this.len - 1]
    }
    Stack.prototype.isEmpty = function () {
        return this.len == 0 ? true : false;
    }
    Stack.prototype.size = function () {
        return this.len;
    }
    Stack.prototype.toString = function () {
        return this.items.toString();
    }
}

let stack = new Stack();
stack.push('1')
stack.push('2')
stack.push('3')
stack.push('4')
stack.pop();
console.log(stack.isEmpty());
console.log(stack.size());
console.log(stack);