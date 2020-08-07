var obj = {
    a: 1,
    b: 2
}
const me = Object.create(obj);
console.log(me.a);
function Test() {
    this.a = 5;
}
const test = new Test();
console.log(test.a);//5