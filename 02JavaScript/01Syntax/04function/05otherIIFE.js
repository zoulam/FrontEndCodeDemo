// 立即执行函数原理 奇葩的立即执行函数
// expression + iffe symbol 即：表达式加上立即执行符号();

//在函数前添上 + - ！ || && 括号包裹
+ function test3(){
    console.log(1);
}();

1 && function test3(){
    console.log(1);
}();