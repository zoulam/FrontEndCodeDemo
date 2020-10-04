function* gen() {
    console.log(111);
    yield '一只没有耳朵';
    console.log(222);
    yield '一只没有尾部';
    console.log(333);
    yield '真奇怪';
    console.log(444);
}

let iterator = gen();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log('-------------------------------------------');
//遍历
for (let v of gen()) {
    console.log(v); // 输出yield的内容
}

