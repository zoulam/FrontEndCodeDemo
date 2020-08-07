// 立即执行函数配上闭包，实现单文件的模块化开发(即使用最少的变量名来实现复杂功能)

// 原型继承函数
var inherit = (function () {
    var Buffer = function () { }
    return function (Target, Origin) {
        Buffer.prototype = Origin.prototype;
        Target.prototype = new Buffer();
        Target.prototype.constructor = Target;
        Target.prototype.super_class = Origin;
    }
})();

// 某一功能模块
var initProgram = (function () {
    var Program = function () { }
    Program.prototype = {
        name: '程序员',
        tool: 'coding',
        say: function () {
            console.log(
                `工作：${this.name},技能：${this.tool},编程语言：${this.lang.toString()}。`
            );
        }
    }
    var Frontend = function () { }
    var Backend = function () { }

    inherit(Frontend, Program);
    inherit(Backend, Program);

    Frontend.prototype.lang = ['JavaScript', 'CSS', 'HTML'];
    Backend.prototype.lang = ['node', 'Java', 'Golang'];

    return {
        Frontend: Frontend,
        Backend: Backend
    }
})();


var init = function () {
    var frontend = new initProgram.Frontend();
    var backend = new initProgram.Backend();
    backend.say();//工作：程序员,技能：coding,编程语言：node,Java,Golang。
    frontend.say();//工作：程序员,技能：coding,编程语言：JavaScript,CSS,HTML。
}

init();
