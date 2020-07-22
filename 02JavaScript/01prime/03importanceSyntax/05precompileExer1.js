// 这里是关于预编译的练习
// 大部分都属于八股文，可以通过使用let简化过程

// 01
function test2(a) {
    console.log(a);//[Function: a]
    var a = 1;
    console.log(a);//1
    function a() { }
    console.log(a);//1
    var b = function test4() { }
    console.log(b);//[Function: test4]
    function d() { }
}

test2(2);
console.log('-------------------------------------------');



// 02
function test3(a, b){
    console.log(b);//[Function: b]
    console.log(a);//1
    c = 0;
    var c;
    a = 5;
    b = 6;
    console.log(a);//5
    console.log(b);//6
    function b(){}
    function d(){}
    console.log(b);//6
}
test3(1);
console.log('-------------------------------------------');




// 03
var a = 1;
function a(){}
// 使用let声明后同名冲突会报错，这就是var的缺陷
// SyntaxError: Identifier 'a' has already been declared

console.log(a);//1
// a变量声明、a函数声明、a变量赋值
console.log('-------------------------------------------');



// 04
var b = 3;
console.log(a1);//[Function: a1]
function a1(a1) {
    console.log(a1);//[Function: a1]
    var a1 = 2;
    console.log(a1);//2
    function a1() { }
    var b = 5;
    console.log(b);//5
}

a1(1);
console.log('-------------------------------------------');


// 05
var a2 = 1;
function test(){
    console.log(a2);//undefined AO中有a声明，就不向GO中取值
    var a2 = 2;
    console.log(a2);//2
    var a2 = 3;
    console.log(a2);//3
}
test();
var a2;


