interface Shape {
    color: string;
    name: any;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    name: string;
    sideLength: number;
}
declare let square: Square;
declare let qu: Square;
declare class Control {
    private state;
}
interface SelectableControl extends Control {
    select(): void;
}
declare class Button extends Control implements SelectableControl {
    select(): void;
}
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
declare function getCounter(): Counter;
declare let m: Counter;
