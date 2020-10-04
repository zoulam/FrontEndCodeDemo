// function foo() {
//     setTimeout(() => {
//         console.log(this.a);
//     }, 100)
// }
// var a = 12

// foo.call({a:21})

let foo = {
    a: 3,
    bar() {
        console.log(this);
        console.log(this.a);
        console.log(this.a === foo.a);
        setTimeout(() => {
            console.log('-------------------------------------------');
            console.log(this);
        }, 100)
    }
}

foo.bar();

