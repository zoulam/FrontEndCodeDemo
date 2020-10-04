function Animal() {}
Animal.prototype.say = function () {
    console.log('hello');
}
let dog = new Animal();

//1.获取原型 [[GetPrototypeOf]]
//函数式的操作方法，函数有维护方便的优点
let proto = Object.getPrototypeOf(dog);

console.log(proto);
console.log(dog.__proto__);
