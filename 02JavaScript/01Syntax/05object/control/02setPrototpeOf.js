var obj = {
    a: 1,
    b: 2
}
//2.设置原型[stePrototpeOf]

Object.setPrototypeOf(obj, { c: 3, d: 4 });

console.log(obj);
