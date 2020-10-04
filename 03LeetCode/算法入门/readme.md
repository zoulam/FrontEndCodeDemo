![排序算法的各项数据比较](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/4abde1748817d7f35f2bf8b6a058aa40)

# 排序算法模板

## 元素交换

```javascript
    function exch(nums, index1, index2) {
        let temp = nums[index1]; nums[index1] = nums[index2]; nums[index2] = temp;
    }
```



# 冒泡排序

> ​	代码实现：从首个元素开始与其后面的所有元素逐个对比。
>
> ​	优化思路：，找出最大和最小，放于0和length位置

```JavaScript
let nums = [4, 5, 7, 10, 9, 1, 2, 8, 3, 6];
function bubbleSort(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] > nums[j]) {
                let temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
    }
    return nums;

}
console.log(bubbleSort(nums));
```

# 选择排序

> ​	代码实现：存储索引的方式：找最大**或**最小，然后双指针往后**或**往前移动，再找最大**或**最小

```javascript
function selectionSort(nums) {
    let len = nums.length, temp, minIndex;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            // 判断出当前的最小数，并存储它的索引
            if (nums[j] < nums[minIndex]) {
                minIndex = j
            }
        }
        temp = nums[minIndex];
        nums[minIndex] = nums[i];
        nums[i] = temp;
    }
    return nums;
}

let nums = [4, 5, 7, 9, 1, 10, 2, 8, 3, 6];
console.log(selectionSort(nums));
```

# 插入排序

> 代码实现，取出当前元素（从下标1开始），然后比较前（左）边的元素，然后找到自己的位置插入。

```javascript
function insertSort(nums) {
    let len = nums.length;
    function exch(nums, index1, index2) {
        let temp = nums[index1]; nums[index1] = nums[index2]; nums[index2] = temp;
    }

    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) {
            exch(nums, j, j - 1)
        }
    }
    return nums;

}

let nums = [4, 5, 7, 9, 1, 10, 2, 8, 3, 6];
console.log(insertSort(nums));
```

# 奇妙的位运算符号

**更贴近计算机操作逻辑，运算效率高，一般出现在源码或者算法题中。**

## 按位非（NOT, ~）

> 1和0互换，  `~a  === -(a + 1)`

```javascript
var num1 = 25;
var num2 = ~num1;
console.log(num2);//-26
console.log(num2.toString(2));//-11010
```

## 按位与（AND,&）

> 在二进制的情况下1和1运算得一其余为0

```javascript
var result = 25 & 3;
console.log(result);//1
```

## 按位或（OR, |）

> 在二进制的情况下，0和0运算为0，其余为1 **（联想或：只要有一个是1就全部是1）**

```javascript
var result2 = 25 | 3;
console.log(result2);//27
```

## 按位异或（XOR，^）

> 在二进制的情况下，1和0运算为1，全0或全1运算为0

```javascript
var result3 = 25 ^ 3;
console.log(result3);//25
```

## 左移（ ，<<）

> 数值的绝对值会变大，左移之后的空位补0

```JavaScript
var result4 = 2;
console.log(result4 << 5);//64
var result5 = -2;
console.log(result5 << 5);//-64
```

## 右移

### 有符号右移（ ，>>）

```javascript
var result6 = 64;
console.log(result6 >> 5);//2
var result6 = -64;
console.log(result6 >> 5);//-2
```

### 无符号右移（ ，>>>）

> 无符号右移当操作数值为正是与有符号右移效果相同，但操作负数时有很大的不同

```javascript
var result7 = 64;
console.log(result7 >>>5);//2
var result8 = -64;
console.log(result8 >>>5);//134217726
```

**-64**

![计算器示例](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200429094648643.png)

**134217726**

![计算器示例](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200429094631620.png)

负数的无符号右移运算逻辑：

-64的二进制第一位数1不被识别为符号位-

则-64=4294967232

-64>>>5等价于4294967232>>5

![计算器示例](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200429095216419.png)



# 快速排序

> [wiki介绍](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
>
> 快速排序又被称为分区交换排序，因为效率高，故而又被称为快速排序
>
> ​	代码实现：拆分和递归

# 常用的的API

> 要熟练的记住**STL（标准库）**中的常用API这样能大大的提高效率和简化代码。

## [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

### 属性

length

### 常用方法

charAt

charCodeAt

trim 	trimStart 	rimRight

toLowerCase	 loUpperCase

repeat

indexOf 	includes

slice

split

### 常与正则一起使用的方法

match

test

## [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

> JavaScript数组使用push、unshift可以实现栈的效果，
>
> ​						使用pop、shift可以实现队列的效果

length

### 原数组上操作

push 	unshift

pop	 shift

splice

reverse

sort

fill

find 	findIndex

forEach

### 在新创建的数组操作

map

concat

filter

reduce

join 返回值是String

toString 返回值是String 复原方式是使用String方法：`split(',')`

slice

## [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

> 以键值对的映射关系存储在对象中

set 	get 	has 	delete	 clear

## [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

> 具有自动去重的功能，（`===`的比较方式，即`'1'` 和`1`不是相同类型，可以同时存在）

push	get 	has

## [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

max min

floor(取更小的整数**45.9=>45	-45.9=>-46**) 	round(正数四舍五入，负数：**-2.5=>2 	-2.6=>-3**)

random

abs

sqrt

sign (判断正负，整数`return 0` 负数`return -1`)

# kmp算法

> kmp算法是一种用于字符串匹配的算法（从主串中找到你想要的子串），通过分析子串获取比较信息，以达到主串**比较指针不会退，子串比较指针来回移动实现字符串的移动。**



