var obj = {
    a: 1,
    b: 2
}
Object.preventExtensions(obj);
obj.c = 3;//无法添加
console.log(obj);//{ a: 1, b: 2 }
delete obj.b;//可删除
console.log(obj);//{ a: 1 }