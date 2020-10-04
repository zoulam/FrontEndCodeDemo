function loader(source) {
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ['let list = []']
    /** matchUrl:匹配到的url group 分组 */
    while (current = reg.exec(source)) {
        let [matchUrl, g] = current;
        // last 到 reg.lastIndex 是 url('./public.jpg');
        let last = reg.lastIndex - matchUrl.length;
        // 第一段代码
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
        pos = reg.lastIndex;
        // 第二段代码 url(require('xxx'))
        arr.push(`list.push('url('+ require(${g}) +')')`);
    }
    // 第三段代码
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports = list.join('')`)
    // console.log(arr.join('\r\n'));
    return arr.join('\r\n');
}
module.exports = loader;