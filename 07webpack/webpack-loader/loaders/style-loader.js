const loaderUtils = require('loader-utils');
function loader(source) {
    // 最后一个loader必须导出js脚本，注入到js文件中
    let str = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `
    return str;
}
// loader上写了pitch就不继续执行loader
/**
 * less-loader!css-loader/./index.less
 * @param {} remainingRequest 剩余的请求
 */

// 后续loader都不走了
loader.pitch = function (remainingRequest) {
    // 让style-loader 处理 less-loader!css-loader/./index.less
    // 使用行内loader加载(注：传入的路径应该是相对路径)
    // require 的返回值就是处理好的结果
    // require('!!less-loader!css-loader/./index.less')
    return `style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})
    document.head.appendChild(style)`
}
module.exports = loader;
