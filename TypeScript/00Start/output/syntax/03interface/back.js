let square = {};
square.color = "blue";
console.log(Object.prototype.toString.call(square));
let qu = {
    name: 'zoulam',
    color: 'green',
    penWidth: 1080,
    sideLength: 1920,
};
console.log("-----------------------------------------------------------------------");
class Control {
}
class Button extends Control {
    select() { }
}
console.log("----------------------------------mixin-------------------------------------");
function getCounter() {
    let counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let m = getCounter();
m(10);
m.reset();
m.interval = 5.0;
