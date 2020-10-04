let babel = require("@babel/core");
const { RSA_NO_PADDING } = require("constants");
//loaderUtils 拿到预设  便于后期转化代码
let loaderUtils = require("loader-utils");
function loader(source) {
    // this是 loaderContext，包含大量loader信息
    let options = loaderUtils.getOptions(this)
    let cb = this.async(); // 包含异步函数
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop(),
    }, function (err, result) {
        cb(err, result.code, result.map);// 异步
    })
}
module.exports = loader;