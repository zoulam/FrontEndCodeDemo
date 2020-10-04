interface People {
    name: string;
    age?: number;
    readonly isBig: boolean;
}
declare let people: People;
declare let grade: ReadonlyArray<number>;
declare const level: number[];
declare function test(): {
    color: string;
    height: number;
};
interface GetNewName {
    (firstName: string, secondName: string): string;
}
declare let getName: GetNewName;
declare let getChildren: GetNewName;
interface StringArray {
    readonly [index: number]: string;
}
declare let myArray: StringArray;
declare let myStr: string;
interface A {
    curtime: Date;
    getHour(h: number): number;
}
interface B {
    name: string;
}
declare class GetTime implements A, B {
    curtime: Date;
    name: string;
    constructor(h: number, m: number);
    getHour(h: any): any;
}
interface GetNameConstructor {
    new (h: number, m: number): GetNameStatic;
}
interface GetNameStatic {
    name: string;
    getName(): string;
}
declare function createName(a: GetNameConstructor, h: number, m: number): GetNameStatic;
declare class GetName implements GetNameStatic {
    name: string;
    constructor(h: number, m: number);
    getName(): string;
}
declare let go: GetNameStatic;
declare class Animal {
    constructor(name?: string, age?: number);
}
declare let animal: Animal;
