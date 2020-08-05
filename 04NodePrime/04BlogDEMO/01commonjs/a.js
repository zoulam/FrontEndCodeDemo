// 直接导出
// module.exports =

function add(a, b) {
    return a + b;
}

function muti(a, b) {
    return a - b;
}

// // 变量名导出
// module.exports = add;

// 对象导出
module.exports = {
    add,
    muti
}