// var声明的变量提升，只有变量名提升，值没有提升
// let 更安全,不会存在同文件变量命名冲突，
console.log(a);//undefined
var a = 0;
// console.log(b);//ReferenceError: Cannot access 'b' before initialization
let b = 1;

// var声明的匿名函数
// getAge();//TypeError: getAge is not a function
console.log(getAge);//undefined
var getAge = function () {
    console.log(`my age is 18!`);
}


// 变量提升完成赋值
num = 6;
console.log(num);//6
var num;



// 块作用域问题
{
    var c = 5;
    let d = 6;
}
console.log(c);
// console.log(d);//ReferenceError: d is not defined


// 函数的变量提升,可以书写顺序上实现‘先调用，后声明’
carName('luluxi');
function carName(name) {
    console.log(`my cat's name is ${name}`);
}