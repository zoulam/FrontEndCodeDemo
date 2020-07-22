// 返回值问题
// 1
function test1(){}
console.log(test1());//默认返回值是undefined
console.log('-------------------------------------------');
// 2
function Compute() {
    this.add = function (a, b) {
        console.log(a + b);
    }
    //return this;//会被return引用数据覆盖报错
    //return [];//VM66:9 Uncaught TypeError: compute.add is not a function
    //at <anonymous>:9:9
}

var compute = new Compute();
compute.add(1, 2);
console.log(compute);//[];

// 3
async function getUsername() {
    setTimeout(() => {
        console.log(`i am lihua`);
    }, 1000);
}

console.log(getUsername());
// Promise { undefined }
// i am lihua

// async函数的返回值是Promise


