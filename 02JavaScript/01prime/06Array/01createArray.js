let arr1 = [];
let arr2 = new Array();
// 声明数组并指定数组长度为2
let arr3 = new Array(2);
// 直接声明数组内容
let arr4 = new Array(true, 123, false);
console.log(arr4);//[ true, 123, false ]
// 奇怪的声明方式,不建议使用
var arr5 = Array();
arr5.push('a');
console.log(arr5);//[ 'a' ]
