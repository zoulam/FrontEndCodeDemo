let jsondata = [{
    "id": "1",
    "name": "zoulam",
    "age": "18"
}, {
    "id": "2",
    "name": "zoulam",
    "age": "18"
}, {
    "id": "3",
    "name": "zoulam",
    "age": "18"
}, {
    "id": "4",
    "name": "zoulam",
    "age": "18"
}]

Array.prototype.myFilter = function (fn) {
    let arr = this;
    let len = arr.length;
    arg2 = arguments[1] || global;
    let newArr = []
    for (let i = 0; i < len; i++) {
        // fn.apply(arg2, [arr[i], i, arr]) ? newArr.push(arr[i]) : '';
        if(fn.apply(arg2, [arr[i], i, arr])) newArr.push(arr[i])
    }
    return newArr;
}

// filter 返回新的数组
let ans = jsondata.myFilter(function (ele, inx, arr) {
    return ele.id > 1;
})
console.log(ans);

