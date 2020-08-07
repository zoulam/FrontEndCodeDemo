var obj = {
    a: 1,
    b: 2
}
var extensible = Object.isExtensible(obj);
console.log(extensible);//true


Object.freeze(obj);//冻结
var extensible2 = Object.isExtensible(obj);
console.log(extensible2);//false

// 封闭对象
Object.seal(obj);
obj.c = 3;//不可增加
console.log(obj);//{ a: 1, b: 2 }
delete obj.a;//不可删除
console.log(obj);//{ a: 1, b: 2 }
obj.b = 5;//可以修改
console.log(obj);//{ a: 1, b: 5 }
for (let key in obj) {//可读
    console.log(obj[key]);
//     1
//     5
}


// 冻结对象
Object.freeze(obj);
obj.c = 3;//不可增加
console.log(obj);//{ a: 1, b: 2 }
delete obj.a;//不可删除
console.log(obj);//{ a: 1, b: 2 }
obj.b = 5;//不可修改
console.log(obj);//{ a: 1, b: 2 }

for (let key in obj) {//可读
    console.log(obj[key]);
//     1
//     2
}