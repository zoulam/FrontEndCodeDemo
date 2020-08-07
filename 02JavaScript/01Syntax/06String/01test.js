// trim ：修剪
const str1 = '                 hello world            ';
console.log(str1.trimStart());
const str2 = '                hello world            ';
console.log(str2.trim());
const str3 = '                hello world            ';
console.log(str3.trimRight());

const str4 = 'ABBCDdefg';
// 转成大写，转成小写
console.log(str4.toLowerCase());
console.log(str4.toUpperCase());

// 重复
console.log(str4.repeat(5));

// 拼接:性能极差用+号或者+=拼接比较好
const str5 = 'zoulam: '
console.log(str5.concat("hello world!"));

// 切薄
const str6 = 'The quick brown fox jumps over the lazy dog.';
console.log(str6.slice(31));
console.log(str6.slice(4, 19));

// 分割返回数组，用于取词
let nums = str6.split(' ');
let nums2 = str6.split(' ',5);
console.log(nums,nums2);

// 判断是否存在 第一个参数是判断内容，第二个参数是起始位置，不填默认是0
console.log(str6.includes('The', 8));
console.log(str6.indexOf('The', 8));

// 配合正则使用的函数
// 替换
const str7 = 'i are fish'
console.log(str7.replace('are', 'is'));
// match
// test


// 判断结尾，大小写敏感,用正则效果更好
console.log(str7.endsWith('fish'));
console.log(str7.endsWith('Fish'));