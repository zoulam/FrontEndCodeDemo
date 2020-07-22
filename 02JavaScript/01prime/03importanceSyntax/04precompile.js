// 预编译是对[[scope]]和Hoisting概念的经验总结

// AO

// AO{
//     1、形参和变量声明
//     2、实参赋值给形参
//     3、函数声明
// }
//     //执行时语句操作
// 4、执行函数、变量赋值


// 其中匿名函数
// var a = function () { }//属于变量赋值、而不是函数声明


// GO

// GO{
//     1、变量声明
//     2、函数声明
// }
// 3、变量赋值、函数赋值

function test1() {
    var a = b = 1;
    // 正确的书写方式是 var a = 1 , b = 1;
}
test1();
// console.log(a);//Uncaught ReferenceError: a is not defined
console.log(b);//1
console.log(global.a);//undefined
console.log(global.b);//1