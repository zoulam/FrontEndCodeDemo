// constructor.prototype.value 的添加方式
// 因为方法会类型提升，所以定义在Computer前依然能添加上去
Computer.prototype.pixel = '1920*1080';
Computer.price = '￥5999';
function Computer(name, OS) {
    this.name = name;
    this.OS = OS;
    this.info = function () {
        console.log(`i am a ${name} computer ,i have ${OS} operate system.`);
    }
}

// constructor.value 的添加方式
Computer.color = 'blue';
// constructor.prototype.value 的添加方式,放在实例化前
Computer.prototype.screen = '我是实例化之前挂上去的：17.3inch';

let computer = new Computer('dell', 'Windows');

// constructor.prototype.value 的添加方式,放在实例化后
Computer.prototype = {
    CPU: '我是实例化之后挂上去的：Intel'
}
console.log(computer);