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

Array.prototype.myMap = function (fn) {
    let arr = this;
    let len = arr.length;
    arg2 = arguments[1] || global;
    let newArr = [];
    let item;
    for (let i = 0; i < len; i++) {
        item = deepClone(arr[i]);
        newArr.push(fn.apply(arg2, [item, i, arr]));
    }
    return newArr;
}