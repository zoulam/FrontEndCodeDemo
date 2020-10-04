var obj = {
    a: 1,
    b: 2
}

Object.setPrototypeOf(obj, { c: 3, d: 4 })
console.log(Object.keys(obj));//[ 'a', 'b' ]
console.log(Object.values(obj));//[ 1, 2 ]