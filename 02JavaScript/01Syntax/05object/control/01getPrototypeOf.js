var obj = {
    a: 1,
    b: 2
}

//1.获取原型 [[GetPrototypeOf]]

//函数式的操作方法，函数有维护方便的优点
var proto = Object.getPrototypeOf(obj);

console.log(proto);
console.log(obj.__proto__);
console.log(Object.prototype);