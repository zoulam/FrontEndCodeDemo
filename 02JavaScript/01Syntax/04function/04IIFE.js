(function () {}());//w3c 建议写法，但可读性较差

(function add() {})();

// add2()//ReferenceError: add2 is not defined
// 立即执行函数拥有执行完就销毁，不污染全局命名空间的优点
// 即不需要函数名，写上也无任意义

// 插件的写法
; (function () { })()
; (function () { })()
; (function () { })()

// 尾部括号跟执行普通函数一样，是可以传输实参的
// 可以使用变量接收返回值，即可以只用一个变量命名的空间完成函数功能

let result = (function (a, b) {
    return a + b;
})(1, 2);

console.log(result);//3





