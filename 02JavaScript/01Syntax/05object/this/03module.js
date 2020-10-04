var initModule = (function () {
    return {
        a: 1,
        b: 2,
        plus: function (a, b) {
            this.a = a;
            this.b = b;
            console.log("i am plus", this.a + this.b);
            return this.a + this.b;
        },
        minus: function (opt) {
            return opt.a - opt.b;
        }
    }
})();

console.log(initModule);//{ a: 1, b: 2, plus: [Function: plus], minus: [Function: minus] }
console.log(initModule.plus(4, 5));//9

console.log(initModule.minus({
    a: 9,
    b: 2
}));// 7

