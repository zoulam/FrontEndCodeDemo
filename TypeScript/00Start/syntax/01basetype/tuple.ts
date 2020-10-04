// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error

enum Color {
    Red = 1,
    Green = '2',
    Blue = 4
}
let c: Color = Color.Green;
let g: Color = Color.Red;
let d = Color['2'];
console.log(typeof c);// string
console.log(typeof g);// number
console.log(Object.prototype.toString.call(d));// undefined
console.log("-----------------------------------------------------------------------");
let a: number = undefined;
let e: number = null;

let f: symbol = Symbol('1')

// let t: undefined = never;
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

