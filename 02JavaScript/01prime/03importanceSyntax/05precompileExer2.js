// 06
function test2() {
    console.log(b);//undefined 声明了
    console.log(a);//undefined
    if (a) {
        var b = 2;// 未被执行，即b没有赋值
    }
    console.log(b);//undefined
    c = 3;
    console.log(c);//3
}

var a;
test2();
a = 1;
console.log(a);//1
console.log('-------------------------------------------');


// 07
function test3() {
    console.log(b);//undefined 声明了
    console.log(c);//1
    if (c) {
        var b = 2;
    }
    console.log(b);//2
    d = 3;
    console.log(d);//3
}

var c;
c = 1;
test3();
c = 4;
console.log(c);//4

