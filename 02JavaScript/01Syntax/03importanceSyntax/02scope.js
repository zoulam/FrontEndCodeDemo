// 父作用域引用子作用域的值
// 闭包改变作用域的例子

function foo() {
    var value3 = 7;
    return function bar() {
        console.log(value3);
    }
}
var fun = foo();
fun();//7


// function getValue() {
//     console.log(value);//ReferenceError: value is not defined
//     function setValue() {
//         var value = 10;
//     }
// }

// getValue();