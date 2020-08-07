// 作用域[[scope]]

var value0 = 0;// 全局变量
function showVaule() {
    // 两个在function中声明的变量只能在function内使用
    console.log(value0);
    let value = 0;
    var value2 = 5;
    // 全局变量
    // return global.a = 5;
    //ReferenceError: a is not defined
    //node.js 不会释放的全局因为node.js是默认use strict
    return window.a = 6;
}

console.log(a);//在浏览器环境输出6
showVaule();//0

//  console.log(value2);//ReferenceError: value2 is not defined
// console.log(value);//ReferenceError: value is not defined




