// normal function
function getValue(value) {
    console.log(value);
}

// arrow function
// 优点：书写简单，作为回调函数，匿名函数可读性强
// 缺点：没有自己的this，arguments，super或new.target,即无法声明成构造函数
// 关于this指向问题

(value) => { return value; }
// 没有参数时
() => value1 + b;

// 有且仅有一个参数，执行语句只有返回值
value => value;




// obj function
var obj = {
    //special
    get() {},
    set: function () {}
}

class animal{
    get(){}
}

// error
// get(){ }

