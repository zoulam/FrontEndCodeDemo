function Test1(a, b) {
    this.a = a;
    this.b = b;
    console.log(this);//Test2 { a: 1, b: 2 }
    console.log(this.a, this.b);//1 2
}


function Test2(a, b, c, d) {
    // this.a = a;
    // this.b = b;
    // Test1.call(this, this.a, this.b); // 根es6的super等效，类似于扩展函数功能
    Test1.call(this, a, b); // 根es6的super等效，类似于扩展函数功能
    // Test1.apply(this, [a, b]); // 根es6的super等效，类似于扩展函数功能
    this.c = c;
    this.d = d;
    console.log(this.a, this.b, this.c, this.d);//1 2 3 4
}


var test2 = new Test2(1, 2, 3, 4);