interface People {
    // 虽然使用逗号结尾不会报错，但是建议使用分号
    // 必须实现
    name: string;
    // 可选
    age?: number;
    // 只读(也是必须实现的)
    readonly isBig: boolean;
}

let people: People = {
    name: 'zoulam',
    isBig: true,
}

// people.isBig = false;// error

let grade: ReadonlyArray<number> = [1, 2, 3, 4,];// 声明只读数组
// grade[1] = 5; // error Readonly比const更严格

const level = [1, 2, 3, 4]
// item 可修改
level[1] = 5;


function test(): { color: string; height: number } {
    return {
        color: 'green',
        height: 15
    }
}

interface GetNewName {
    (firstName: string, secondName: string): string;
}
let getName: GetNewName;
getName = (firstName: string, secondName: string) => {
    return firstName + secondName;
}

let getChildren: GetNewName;
getChildren = (firstName, secondName) => {
    return firstName + secondName;
}

console.log("-----------------------------------------------------------------------");

interface StringArray {
    // 索引为数字类型，内容为字符串,同时也可以是只读
    readonly [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

console.log("-----------------------------------------------------------------------");



interface A {
    // 规定this值
    curtime: Date;
    // 规定函数
    getHour(h: number): number;
}

interface B {
    // 规定this值
    name: string;
}

class GetTime implements A, B {
    curtime: Date;
    name: string;
    constructor(h: number, m: number) {
        this.curtime;
    }
    getHour(h) {
        return h;
    }
}

console.log("-----------------------------------------------------------------------");


// 规范构造函数
interface GetNameConstructor {
    new(h: number, m: number): GetNameStatic;
}

// 规范实例部分
interface GetNameStatic {
    // 规范this.name
    name: string;
    // 规范函数
    getName(): string;
}

// 中间函数创建使用
function createName(a: GetNameConstructor, h: number, m: number): GetNameStatic {
    return new a(h, m)
}

class GetName implements GetNameStatic{
    name: string;
    constructor(h: number, m: number) {

    }
    getName() {
        return 'zoulam';
    }
}

let go: GetNameStatic = createName(GetName, 12, 5);

class Animal {
    constructor(name: string = 'just a animal', age: number =0) {

    }
}

let animal = new Animal();

