// [[get]]
var obj = {
    a: 1,
    b: 2
}
console.log('c' in obj);
console.log(obj.a);

// [[set]]
obj.a = 3;
obj['b'] = 5;
console.log(obj);//{ a: 3, b: 5 }

// [[delete]]

delete obj.a;
console.log(obj);//{ b: 2 }