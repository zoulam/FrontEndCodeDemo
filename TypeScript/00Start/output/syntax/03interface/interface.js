let people = {
    name: 'zoulam',
    isBig: true,
};
let grade = [1, 2, 3, 4,];
const level = [1, 2, 3, 4];
level[1] = 5;
function test() {
    return {
        color: 'green',
        height: 15
    };
}
let getName;
getName = (firstName, secondName) => {
    return firstName + secondName;
};
let getChildren;
getChildren = (firstName, secondName) => {
    return firstName + secondName;
};
console.log("-----------------------------------------------------------------------");
let myArray;
myArray = ["Bob", "Fred"];
let myStr = myArray[0];
console.log("-----------------------------------------------------------------------");
class GetTime {
    constructor(h, m) {
        this.curtime;
    }
    getHour(h) {
        return h;
    }
}
console.log("-----------------------------------------------------------------------");
function createName(a, h, m) {
    return new a(h, m);
}
class GetName {
    constructor(h, m) {
    }
    getName() {
        return 'zoulam';
    }
}
let go = createName(GetName, 12, 5);
class Animal {
    constructor(name = 'just a animal', age = 0) {
    }
}
let animal = new Animal();
