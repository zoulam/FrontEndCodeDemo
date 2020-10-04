interface Shape {
    color: string;
    name: any;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    // color: number; // error
    name: string;// 重写只能是重写any
    sideLength: number;
}

// 宽松实现
let square = <Square>{};
square.color = "blue";
console.log(Object.prototype.toString.call(square));
// 强制实现
let qu: Square = {
    name: 'zoulam',
    color: 'green',
    penWidth: 1080,
    sideLength: 1920,
}

console.log("-----------------------------------------------------------------------");

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

// error
// class I implements SelectableControl {
//     select() { }
// }

console.log("----------------------------------mixin-------------------------------------");

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    // let counter = <Counter>function (start: number) { };
    let counter = function (start: number) { } as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let m = getCounter();
m(10);
m.reset();
m.interval = 5.0;
