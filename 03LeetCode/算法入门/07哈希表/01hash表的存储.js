// 占用空间大，5000条数据需要申请10000的内存空间
function MyHashMap() {

}
//  ebcdic 不连续的字母
//  ASCII 只能表示（英文）字母 数字 和符号
//  ISO-8859-1 欧洲国家的编码
//  GB2312  GBK（生僻字） GB18030(完整的中文字符)
//  Unicode （UTF-8 UTF-16 UTF-32）


// 字母（a:1）和空格（0）
// hash化，将大数字转化成数组范围内的下标
// function hash(letter) {
//     let code = 0;
//     for (let i = 0; i < letter.length; i++) {
//         code += letter.charCodeAt(i) * 27 ** i;
//     }
//     return code;
// }

// hash冲突
// 链地址法（拉链法）  hashmap内的一个单元存储更多的元素
// 最常用的实现（Java的HashMap就是这样实现的）

// 开放地址法
// 寻找空白单元格，放置hash冲突的值
// 寻找空白单元格
/**
 *  线性探测
 *  二次探测（线性探测在hash出现聚集的情况效率低，二次探测优化了步长）
 *      其中5可以是其他质数
 *      newHash = 5 - (key % 5);
 *  再hash 更换取模的值
*/


// hash函数应该少用乘除法，即使用位运算