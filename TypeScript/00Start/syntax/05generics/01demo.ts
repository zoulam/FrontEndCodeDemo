function test3<T>(name: T): T {
    // console.log(name.length);// error
    return name;
}

console.log(test3<string>('lala'));

// Array<T> 等同于 T[]
function test4<T>(name: T[]): T[] {
    console.log(name.length);// ok
    return name;
}

console.log(test4<string>(['lala']));


// 同名关系 T = T = T 和 U = U = U 
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;