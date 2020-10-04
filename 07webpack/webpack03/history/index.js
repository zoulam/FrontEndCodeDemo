import calc from './test'

console.log(calc.minus(1, 2));

// scope hositing
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
// webpack 3.0之后会自动省略声明后并且被使用的变量（即直接输出6）
console.log(d);
// import React from 'react';
// import {render} from 'react-dom';

// render(<h1>jsx diao a</h1>,window.root)

// import jquery from 'jquery';
// import moment from 'moment';

// import 'moment/locale/zh-cn';

// moment.locale('zh-cn')
// let r = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
// console.log(r);