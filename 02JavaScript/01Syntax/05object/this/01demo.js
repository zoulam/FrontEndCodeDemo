// 函数内

// function test() {
//     this.a = 1;//  window.a or global.a
//     console.log(this);
//     console.log(this.a);
// }


// var a = 1;
// function test() {
//     // 'use strict' //导致报错
//     console.log(this);// use strict 下是undefined
//     console.log(this.a);
//     // nodejs:undefined
//     // chrome 1
//     // TypeError: Cannot read property 'a' of undefined
// }

// test();



// 对象内
var a = 2;
var obj = {
    a: 1,
    test: function () {
        console.log(this);// { a: 1, test: [Function: test] }
        console.log(this.a);// 1
    }
}


var obj2 = {
    a: 3,
    test: function () {
        console.log(this.a);// 3
    }
}

obj.test();
obj2.test();

var a = 5;
function test2(b) {
    this.a = a;
    this.b = b;
    console.log(this.a);// 从全局取来 5
    console.log(this.b);// 4
    // console.log(window.a === this.a);// true
    console.log(global.a === this.a);// true
}
// console.log(test2(1).a);//TypeError: Cannot read property 'a' of undefined
test2(4);

console.log('-------------------------------------------');

// 构造函数

function Test(g) {
    this.g = g;
    console.log(this);//指向Test对象  Test { g: 7 } 此处的Test指的是构造函数名而非实际对象名
    console.log(this.g);//7
    // console.log(window.g);//undefined
    console.log(global.g);//undefined
}

Test.prototype.say = function () {
    console.log(this.g);
}



let dd = new Test(7);// 实例化之后的this指向对象 dd
console.log(dd.g);//7
console.log(Test.g);//undefined
console.log('-------------------------------------------');
dd.say();//7



