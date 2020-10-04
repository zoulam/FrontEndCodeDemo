function Animal() { }
Animal.prototype.say = function () {
    console.log('hello');
}
Animal.prototype.write = function () {
    console.log('write');
}
let dog = new Animal();
//2.设置原型[stePrototpeOf]

Object.setPrototypeOf(dog, function say() {
    console.log('hello world');
});

console.log(dog);
