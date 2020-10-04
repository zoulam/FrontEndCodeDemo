let url = '';
if(DEV){
    url='htttp://localhost:3000'
}else{
    url='http://www.luluxi.com'
}
console.log(url);
console.log(typeof FLAG);
console.log(typeof EXPRESSION);

// import 'bootstrap'//开头没有加./是因为加载是已经安装的模块
// import './index.css'
// import './style' // 不写入后缀需要添加配置
// let xhr = new XMLHttpRequest();
// // 使用http-proxy来实现代理
// xhr.open('GET', '/user', true);

// xhr.onload = function () {
//     console.log(xhr.response);
// }

// xhr.send();


// console.log('home');
// class Log {
//     constructor(params) {
//         console.log('我是一个错误代码');
//     }
// }
// let log = new Log();