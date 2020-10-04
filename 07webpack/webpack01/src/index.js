// 打包图片
// 1）js中创建图片
// 2）css用background引入
// 3）html中用<img src="" alt=""/>
import gPic from './girl.jpg';//返回新的图片地址
import './index.less';
console.log(gPic);
let image = new Image();
image.src = gPic;
document.body.appendChild(image);



// import $ from 'expose-loader?exposes[]=$&exposes[]=jQuery!jquery'; // 将jquery以$的形式暴露在全局
// 暴露全局的loader：expose-loader
// loader 类型 pre 前置loader post后置loader normal普通loader  inline内联loader
// console.log($);
// console.log(window.$);


// let str = require('./module')
// console.log(str)

// require('./index.css')
// require('./index.less')
// let output = () => {
//     console.log('hello babel!');
// }

// output();

// @log
// class A {
//     a = 1;
//     constructor() {
//         this.name = 'luluxi';
//     }

//     say() {
//         console.log('learn babel~');
//     }
// }

// let a = new A();
// console.log(a);
// console.log(a.a);

// function log(target) {// @log 函数
//     console.log(23, target);
// }







