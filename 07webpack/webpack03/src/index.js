// let button = document.createElement('button');
// button.innerHTML = 'click me'
// button.addEventListener('click', function () {
//     // console.log('lazy loading');
//     // 草案中的语法,jsonp实现动态加载文件需要添加@babel/plugin-syntax-dynamic-import插件
//     // 我在2020年使用的时候webpack已经支持了
//     import('./source.js').then(data=>{
//         console.log(data);
//         console.log(data.default);
//     })
// })

// document.body.appendChild(button);



import str from './source'
console.log(str);
if (module.hot) {
    module.hot.accept('./source', () => {
        // console.log('hot update');

        // import 只能在顶端使用
        let str = require('./source')
        console.log(str.default);
    })
}