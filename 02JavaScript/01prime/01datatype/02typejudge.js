// typeof
// constructor
// instanceof
// Object.prototype.toString.call();

//node.js环境
// console.log(a);//ReferenceError: a is not defined
console.log(typeof (a));//undefined
console.log(typeof([]));//object
console.log(typeof({}));//object
console.log(typeof(null));//object
console.log(typeof(RegExp()));//object
console.log(typeof(undefined));//undefined
console.log(typeof(false));//boolean
console.log(typeof(""));//string
console.log(typeof(NaN));//number
console.log(typeof(95));//number
console.log(function(){});//[Function] 浏览器中：f(){}
console.log(typeof(Math));//object
//typeof返回值
console.log(typeof (typeof (a)));//string
console.log(typeof (typeof (123)));//string
console.log('-------------------------------------------');



//缺陷：无法判断基本数据类型，且所有的值都可以理解为实例化于Object,而且属于猜测性判断
console.log([] instanceof Array);//true
console.log({} instanceof Object);//true
console.log(function(){} instanceof Object);//true
console.log(new Date() instanceof Date);//true
// console.log(undefined instanceof Undefined);//true
// ReferenceError：Undefined is not defined
console.log('-------------------------------------------');



// 需要配合包装类判断，三个基本数据类型，String、Number、Boolean
// 而且不像java一样进行自动拆箱装箱，所以属于脱裤子放屁类型判断
console.log("".constructor == String);//true

// 不准确，哪怕是塞个String进去也是一样的结果
console.log(Number(5).constructor == Number);//true
// console.log(5.constructor == Number);//语法错误
// 不准确
console.log(Boolean(5).constructor == Boolean);//true
console.log('-------------------------------------------');


// node.js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
// Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(global) ; //[object global] window 是全局对象 global 的引用
console.log('-------------------------------------------');



// 自行封装
function getType(obj){
    let type  = typeof obj;
    if(type != "object"){
      return type;
    }
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, "");
    // 使用正则将 [object ]剔除
  }

  console.log( getType(''));//String
  console.log( getType(5));//number
  console.log( getType(NaN));//number