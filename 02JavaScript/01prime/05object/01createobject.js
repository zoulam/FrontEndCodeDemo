let obj1 = {};
let obj2 = new Object();

// 自定义构造函数并实例化
function Dog(name, shout) {
    this.name = name;
    this.shout = shout;
    this.opt = function () {
        console.log(`i am a ${this.name},i can ${this.shout}`);
    }
}

let dog = new Dog('lulu', '汪汪');
dog.opt();

// 增删查改
// 查
console.log(dog.name);
console.log(dog);

// 删
delete dog.name;
console.log(dog);

// 增
dog.age = 5;
Dog.prototype.color = 'white';
console.log(dog);

// 改
dog.name = 'lala';
console.log(dog);

dog.opt();

