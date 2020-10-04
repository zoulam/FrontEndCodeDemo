// 默认值
function test(a) {
    a = arguments[0] || 100;
    console.log(a + 10);
}
test();//110
test(10);//20
// 新语法
function test(a = 100) {
    console.log(a + 10);
}
test();//110
test(10);//20

// rest
// args是个标识符，可以按需命名
function test2(...args) {
    console.log(args);// [ 1, 2, 3, 4 ]
    console.log(args[2]);// 3

}

test2(1, 2, 3, 4);



// 扩展运算符
// 0.传入多个参数
function test(...args) {
    console.log(arguments);
    console.log(args);
}

let name = ["luluxi", "lala", "momo"];
test(...name);//此处是传入三个字符串参数，而不是一个数组参数
//[Arguments] { '0': 'luluxi', '1': 'lala', '2': 'momo' }
//[ 'luluxi', 'lala', 'momo' ]

test(name);
//[Arguments] { '0': [ 'luluxi', 'lala', 'momo' ] }
//[ [ 'luluxi', 'lala', 'momo' ] ]