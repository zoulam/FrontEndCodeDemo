// 闭包有着驻留内存，持续操作的优点
// 使用场景：用户需要持续使用的数据
// 缺点：过多的闭包函数会导致内存泄漏

// 形成原因：
// function a() {//父函数
//     function b() { }//子函数
//     return b;
// }

// 子函数继承父函数的AO实际原因：
// [[scope]]chain
// 可以将作用域链当成一个数组
// let scopeChain = [];
// unshift:数组的头插法function

// 函数a的作用域链
// scopeChain.unshift(GO);
// scopeChain.unshift(AO: [function a]);
// scopeChain.unshift(AO: [function b]);





// 形成过程：捕获=>抛出
// 1、父函数的AO中包含子函数的AO，即子函数会继承父函数的AO
// 2、函数执行完之后都会销毁自己的AO，但是子函数继承（捕获）的父函数AO却没有权限销毁
// 3、当子函数被当作返回值之后（抛出），父函数的AO就可以被（外部）变量永久接收，便造成父函数的AO永久驻留在内存




// 闭包1
function foo() {
    var value3 = 7;
    return function bar() {
        console.log(value3);
    }
}
var fun = foo();
fun();//7



console.log('-------------------------------------------');
// 闭包2 （数组结构）
function closureTest() {
    let sum = 100;

    function add(arg) {
        sum += arg;
        console.log(sum);
    }

    function reduce(arg) {
        sum += arg;
        console.log(sum);
    }
    return [add, reduce];
}

let answer = closureTest();

answer[1](2);
answer[1](2);
answer[1](2);
answer[1](2);
answer[1](2);
answer[1](2);



console.log('-------------------------------------------');
// 闭包3（对象结构）
function todoList() {
    var todo = '';
    let life = {
        work: function (thing) {
            todo = thing;
        },
        rest: function () {
            console.log(`i finish ${todo}. now , i just want to sleep!quiet`);
        }
    }
    return life;
}

let mytodoList = todoList();
mytodoList.work('write some javascript code');
mytodoList.rest();
