// 继承的作用，对原有的功能重写或者对功能进行扩充
// YUI:yahooUI中的继承实现
// es6的extend
var inherit = (function () {
    var Buffer = function () { }
    return function (Target, Origin) {
        Buffer.prototype = Origin.prototype;
        Target.prototype = new Buffer();
        Target.prototype.constructor = Target;
        Target.prototype.super_class = Origin;
    }
})();



function Windows(name, CLI) {
    this.name = name;
    this.CLI = CLI;
    this.info = function () {
        console.log(`${name}'s Cli is ${CLI}`);
    }
}


function Computer(name, OS) {
    this.name = name;
    this.OS = OS;
    this.info = function () {
        console.log(`i am a ${name} computer ,i have ${OS} operate system.`);
    }
}

inherit(Computer, Windows);

Computer.color = 'blue';
Computer.prototype.screen = '17.3inch';

let windows = new Windows("windows", "cmd or powershell");
windows.info();////windows's Cli is cmd or powershell
let computer = new Computer('dell', 'Windows');


console.log(computer);
console.log(windows);

// es6中的constructor函数就是 Object.constructor
console.log(windows.constructor);//[Function: Windows]




