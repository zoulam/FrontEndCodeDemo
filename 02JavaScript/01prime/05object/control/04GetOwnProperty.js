var obj = {
    a: 1,
    b: 2
}
// 4获取自由属性 [[GetOwnProperty]]
// 以数组形式返回自定义属性（非原型链上继承的）
Object.setPrototypeOf(obj, { c: 3, d: 4 });
console.log(Object.getOwnPropertyNames(obj));//[ 'a', 'b' ]