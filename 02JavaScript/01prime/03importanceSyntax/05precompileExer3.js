// 08
var a;
console.log(test2);//[Function: test2]
function test2(e) {
    function e() { }

    arguments[0] = 2;
    console.log(e);//2
    if (a) {//a = undefined
        var b = 3;//未被执行
    }
    var c;
    a = 4//赋值在后
    var a;//声明提升
    console.log(b);//undefined
    f = 5;
    console.log(c);//undefined
    console.log(a);//4
}
console.log("a:" + a);//a:undefined
a = 1;
test2(1);
console.log(a);//1
console.log(f);//5