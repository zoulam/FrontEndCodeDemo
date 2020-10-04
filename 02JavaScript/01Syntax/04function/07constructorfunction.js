// 自定义构造函数并实例化
function Animal(name, shout) {
    this.name = name;
    this.shout = shout;
    this.opt = function () {
        console.log(`i am a ${this.name},i can ${this.shout}`);
    }
}

let dog = new Animal('dog', '汪汪');
dog.opt();

console.log('-------------------------------------------');
// 字符串结构
function Car(opt) {
    this.name = opt.name;
    this.color = opt.color;
    this.info = function () {
        console.log(`name: ${this.name},color: ${this.color}`);
    }
}

//优势：以键值对的方式输入参数，可读性强
let benz = new Car({
    name: 'benz',
    color: 'red'
});
benz.info();//name: benz,color: red

console.log('-------------------------------------------');
// 解构传参
function Phone({ }) {
    this.name = name;
    this.color = color;
    this.info = function () {
        console.log(`name: ${this.name},color: ${this.color}`);
    }
}

let duduCar = new Car({
    name: 'benz',
    color: 'red'
});
duduCar.info();//name: benz,color: red
