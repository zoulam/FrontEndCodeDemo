exports.config = {
    host: 'localhost',
    port: 8080
}

exports.add = function (a, b) {
    return a + b;
}
setTimeout(() => {
    console.log(exports);
}, 1000)

// module.exports会覆盖全部的上面单独exports的语法内容
module.exports = function mins(){
    return a-b;
 }