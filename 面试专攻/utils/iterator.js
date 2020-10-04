const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧'];
let iterator = xiyou[Symbol.iterator]();
//调用对象的next方法
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log('-------------------------------------------');

//声明一个对象
const banji = {
    name: "终极一班",
    stus: [
        'xiaoming',
        'xiaoning',
        'xiaotian',
        'knight'
    ],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.stus.length) {
                    let res = { value: this.stus[index], done: false }
                    index++;
                    return res;
                }
                else {
                    return { value: undefined, done: true }
                }
            }
        };
    }
}

//遍历这个对象
for (let v of banji) {
    console.log(v);
}
// console.log('-------------------------------------------');

// banji.stus.forEach(item => {
//     console.log(item);
// })
// console.log('-------------------------------------------');
// for (let out in banji.stus) {
//     console.log(out);
// }