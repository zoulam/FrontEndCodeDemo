// 常用两个正则方法
// regexp.exec(string)
// retrun Array [被匹配到的内容,index:首次匹配的下标,input:匹配的目标字符串,groups:undefined/number]
// 同时会更新正则的信息 regexp.lastIndex 下一次匹配的下标
// regexp.test(string) return boolean

// 字符串方法
// string.match(regexp) 返回匹配到的内容,数组 非全局模式下的返回值与 exec相同
// string.matchAll(regexp)
// string.replace(subStr | regexp, repalceStr | function)
// 传入的回调函数有两个参数
// arg1: 匹配到的内容
// arg2: 字符串时可以使用特殊的引用替换
// let str = 'aaaaab'
// console.log(str.replace(/b/, '$`'));//aaaaaaaaaa
//      回调函数
//                 arg1 被匹配的内容 arg2 分组内被匹配的的内容
//                 return 是替换处理

// let one = '{{name}}{{src}}'

// let name = 'zoulam';
// let src = '0808'

// let ans = one.replace(/{{(.*?)}}/g, (node, key) => {
//     //{{name}}:第一组 name：匹配出来的内容 {{src}} src
//     console.log(node, key);
//     return {
//         name,
//         src
//     }[key];
// })

// console.log(ans);

// let reg = /hello$/g;
// let str = 'hello';
// let ans = reg.exec(str)
// console.log(ans);
// console.log(reg.lastIndex);


// function styleHyphenFormat(propertyName) {
//     function upperToHyphenLower(match, key, offset, origin) {
//         console.log(match, key, offset, origin);
//         return '-' + match.toLowerCase();
//     }
//     return propertyName.replace(/D/g, upperToHyphenLower);
// }

// let ans = styleHyphenFormat('aCDEeebeeeFG')
// console.log(ans);

// console.log('testtttest'.match(/test/g));

// let str = 'aaaaab'
// console.log(str.replace(/b/, '$&'));//aaaaaaaaaa


// (.*?)

// let str = `<a style="background-color: red;" href="www.baidu.com">百度<span>test</span></a>`
// let linkArr = str.match(/<a([^>]*)>/g);
// let ans = linkArr.map(item =>
//     item.replace(/<a.+?href=\"(.+?)\".*>/g, "$1")
// );
// console.log(ans);

// let ans = str.replace(/<a.+?href=\"(.+?)\".*>(.+?)<[^>].*><\/a>/g, (match, p1, p2) => {
//     return [p1, p2]
// })
console.log(ans);
// console.log('-------------------------------------------');
// console.log(str.replace(/<[^>]*>([^<>]*)<\/[^>]*>/g, '$1'));
// console.log('-------------------------------------------');
// console.log(str.match(/<[^>]*>([^<>]*)<\/[^>]*>/g));



