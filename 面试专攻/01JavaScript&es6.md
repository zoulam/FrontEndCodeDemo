# JavaScript

## 1、

|          | 原始值                                                       | 引用值                                 |
| -------- | ------------------------------------------------------------ | -------------------------------------- |
| 包含     | `number` `boolean` `undefined` `string` `null` `symbol` `bigInt` | `Number Boolean String Array 等`       |
| 存储方式 | 存储在栈中                                                   | 地址指针存储在栈中，内容存储在堆空间中 |
| 深拷贝   | 赋值                                                         | 递归拷贝、`JSON.stringify()`           |

### **`BigInt`** 

用于表示大于  `2**53 - 1` 的整数

声明方式 ：① `BigInt(9007199254740991)` 或 `9007199254740991n`

​	**注：** 超大数只能跟超大数运算

## 2、

`typeof` 

基本数据类型直接返回 `string`类型的**小写** 准确值，`function`返回`function`，

其他引用数据类型和`null`返回`object`



`Object.prototype.toString.call()`

准确返回  **string**类型的 `[object 对象名]`  **[小写 大写]**  **Null Undefined String Number Symbol BigInt Boolean**



`instanceof` 命令  `A instanceof B`  作用比对构造函数的 `prototype` 是否出现在实例化对象的原型链

实例化于 XX 构造函数，返回 **boolean**类型的值，注：`new` 出来的`String`和`Date`属于`Object`



`constructor` 获取内容构造器

`[Function Xx]`

### 2.1	数据类型转换

#### string=>number 

1、`Number(string)` 

严格数字，失败则为**NaN**

2、 `parserInt(string, radix)` 

能去尾，不能去头，且去处小数点后的内容，失败则为**NaN**，第二个参数可以指定进制。

```JavaScript
console.log(parseInt("070"));// 70
console.log(parseInt(070));//56
```

 3、`parseFloat(string)`

​	 `Float.toFix(2)`:四舍五入保留两位小数（返回 `string`,`Float`未被修改）

​	`Float.toPrecision(precision)`

```javascript
console.log((1234.5).toPrecision(2)); // 1.2e+3     (1200)
```

4、正号负号，自加自减，非加号运算符**（失败为NaN）**

```javascript
console.log(-'12', +'12', +'', +' ');// -12 12 0 0
// 自增自减不能直接使用
let a = '12', b = '';
console.log(a--, b++, b--);// 12 0 1(前面加了还没来得及减)
console.log(--a, ++b, --b);// 10（前面减了） 1 0

console.log(2 * '3');// 6
console.log(2 - '3');// -1
console.log(9 % '2');// 1
console.log(9 / '2');// 4.5
```

5、比较

字符串转化为 ASCII码从左至右比较（左边位数高）

#### number=>string

1、`12 +' '` 

2、`String(12)`

3、`Number(12).toString()`

## 3、

类数组的实质是包含了 `length` 的对象

对象=>数组

1、使用 `Array.form(obj)` 的方式可以格式成真的数组

2、`Object.keys(obj).map(key => obj[key]);`

数组=>对象（flatten）

```javascript
const flattenArr = (arr) => {
    return arr.reduce((map, item) => {
        map[item.id] = item;
        return map
    }, {})
}
```

常见的类数组： `Arguments` `NodeList`

## 4、

[more](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

原数组上操作 `push pop unshift shift sort reverse forEach splice`  

返回新数组 `map reduce filter concat slice fill flat【扁平化一层数组】 `

返回字符串或item `join toString find`

返回布尔值 `isArray includes【返回boolean】 indexOf【注返回的是-1或下标】 `

## 5、

`Array.map(a, b)`   等价于 `map.call(Array, a, b)`

|      | call                 | apply       | bind                                 |
| ---- | -------------------- | ----------- | ------------------------------------ |
| 功能 | 都是改变 `this` 指向 |             |                                      |
| 参数 | `(obj, ...agrs)`     | `(obj, [])` | `(obj, ...agrs)`                     |
| 执行 | 立即执行             | 立即执行    | 返回新的函数，可以二次传入参数再执行 |
| 场景 | 实现原型链继承       |             | `addEventListener()`                 |
| 位置 | `Function.prototype` |             |                                      |

```JavaScript
function person(...args) {
    console.log(...args);
    console.log(this.name);
}
let lala = {
    name: 'zoulam'
}

Function.prototype.newCall = function (obj, ...args) {
    // console.log(this);// 默认指向调用他的函数
    let fn = Symbol(1);
    obj[fn] = this;
    obj[fn](...args);
    delete obj[fn];
}

person.newCall(lala, '1', '2', '3');

Function.prototype.newApply = function (obj, arr) {
    let fn = Symbol(1);
    obj[fn] = this;
    if (!Array.isArray(arr)) throw new Error('please input Array in arguments[1]');
    obj[fn](...arr);
    delete obj[fn];
}
person.newApply(lala, ['1', '2', '3']);

Function.prototype.newBind = function (obj, ...args) {
    let fn = Symbol(1);
    // 返回一个新的函数，可以二次传入参数
    return (...args2) => {
        obj[fn] = this;
        obj[fn](...args.concat(...args2));
        delete obj[fn];
    }
}

let bind = person.newBind(lala, '1', '2', '3');
bind('4');
```

## 6、

[详细解答](https://juejin.im/post/6844903630605123598#heading-1)

1、创建实例化对象

2、构造函数的 `prototype`设置（`setPropertyOf`）为实例的属性

3、修改构造函数的`this`指向，并立即执行获取返回值。

3、构造函数返回值处理

​		3.1 原始数据类型，不处理返回实例

​		3.2 引用数据类型（包含Function），直接返回值该引用数据类型

```javascript
function myNew(Func, ...args) {
    const instance = {}
    Func.prototype && Object.setPrototypeOf(instance, Func.prototype);
    const res = Func.apply(instance, args);
    if (typeof res == 'function' || typeof res == 'object' && res !== null) {
        return res;
    }
    return instance;
}
```



## 7、

`this` 指向的内容一定是一个对象

下面由以下场景

| 场景   | 指向                                    |
| ------ | --------------------------------------- |
| 函数   | 未被实例化：`window` `global`           |
|        | **use strict** 且未被实例化 `undefined` |
|        | 实例化后：指向实例化后的对象            |
| 对象内 | 指向当前对象                            |

### 小测

```JavaScript
var o = {
    a: 10,
    b: {
        a: 12,
        fn: function () {
            console.log(this.a);
            console.log(this);
        },
    },
}
var j = o.b.fn;
j();// j 在全局作用域  undefined , window/global
o.b.fn(); // 这是普通函数 12 ,o.b
```

```JavaScript
var bar = {
    myname: 'bar',
    getName: function () {
        console.log(myname);
        console.log(this);
    }
}

function foo() {
    var myname = 'foo';
    return bar.getName;
}
var myname = 'global';
var __printName = foo();

__printName(); // 'global' window/global

bar.getName(); // 'global' bar
```

## 8、

>  我向从你家拿东西，但是你不肯，我只能从你的孩子下手。

[可以看这篇文章](http://www.alloyteam.com/2019/07/closure/)

**注：**执行前的操作被称为**预编译**

（全局环境）GO：①变量声明、函数声明②**执行**

（函数结构）AO：①形参和变量声明②实参赋值给形参③函数声明、函数赋值④**执行**变量赋值

闭包的好处：

​	1、干净，变量有单独的作用域（过去配合立即执行函数实现单文件的模块化开发）；

​	2、重复使用，没执行一次该函数就获取一份单独的变量，并且能复用函数逻辑。

**注**：过多的闭包可能会导致内存泄漏，将`内容实体==null`可清除。

```JavaScript
function counterCreator() {
    // 变量声明区
    var index = 1;
    // 函数功能实体
    return function counter() {
        return index ++;
    }
}

var counterA = counterCreator();
var counterB = counterCreator();
console.log(counterA());     // 1
console.log(counterA());     // 2
console.log(counterB());     // 1
console.log(counterB());     // 2
```

## 9、

原型：挂载在对象的一个特定名称的对象

原型链：与其他构造函数实现链条关系结构（如：当前对象不存在`toString()`方法，那么他就会顺着他的祖先对象去寻找，直到`Objecet.__proto__`上）

## 10、

[详细介绍](https://segmentfault.com/a/1190000016364830)

> 原型链的终点是 `Object.prototype`

```JavaScript
function Cat(color, name) {
    this.name = name;
    this.color = color;
}

Cat.weight = 0;// 只能用构造函数.属性取得
Cat.height = 0;
Cat.prototype.height = '15cm';
let cat = new Cat('red', 'zoulam');
console.log(cat);
Cat.prototype.cute = true;// 写在实例化之后才能取得
Cat.prototype = {// 必须写在实例化之前才能被取得
    cute: false
}
console.log(cat.cute, cat.weight, Cat.weight, cat.height);
```

![结果](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200822153912546.png)

|                    | `__proto__`（隐式原型）[[prototype]]                 | `prototype`（显式原型）          |
| ------------------ | ---------------------------------------------------- | -------------------------------- |
| 位置               | 对象下                                               | `__proto__`下的 `constructor` 下 |
| 抽象位置描述       | 对象的属性                                           | 函数特有结构                     |
| 相同的情况（关系） | 实例化后对象的 `__proto__`                           | 构造函数的 `prototype`           |
| 操作               | `Object.getPrototypeOf()`  `Object.setPrototypeOf()` |                                  |

## 11、

```javascript
let inherit = (function () {
    let Temp = function () { };
    return function inherit(Children, Father) {
        Temp.prototype = Father.prototype;
        Children.prototype = new Temp();
        Children.prototype.constructor = Children;
        Children.prototype.superClass = Father;
    }
})();
```

[参考](https://segmentfault.com/a/1190000016708006)

## 12、

深拷贝：对引用数据类型也进行深层次拷贝

浅拷贝：进行赋值拷贝，引用数据类型地址拷贝（后续修改会影响原先的内容）

## 13、

略

## 14、

作用域：即变量的有效范围

作用域链：如闭包中的的子函数包含父函数的作用域 ，就近取

```javascript
var go = 'global'
function father() {
    console.log(go);
    var name = 'father'
    return function children() {
        console.log(name);
    }
}

let run = father();
console.log('---------------------------------------------------------------------------');
run();
```

执行期上下文（一个对象内容）：**this**

### 14.1

[answer](https://github.com/YvetteLau/Step-By-Step/issues/21)

## 15、

### 标签选择器

​	获取单个、获取`nodeList`即伪数组

### DOM节点的增删改

| 操作  （A为父节点bc为兄弟子节点，D为document的简写） | 效果                                                   |
| ---------------------------------------------------- | ------------------------------------------------------ |
| `D.write()`                                          |                                                        |
| `D.createElement()`  `D.createDocumentFragment`      | 前者再原文档创建，后者在空白文档创建                   |
| `A.appendChild()`                                    |                                                        |
| `D.createTextNode()`                                 |                                                        |
| `A.replaceChild(b, c)`                               | **b换c**                                               |
| `A。insertBefore(b, c)`                              | **b插在c前面**                                         |
| `node.clone()`                                       | 含参数，默认是是`false` ，`true`是深拷贝，即包含子节点 |
| `removeChild()`                                      |                                                        |

### 行内属性的获取和设置，节点包含的（常用）属性

通常会使用 `attributes` 获取全部属性(包含自定义属性，以类数组的形式)，然后再具体操作

```JavaScript
      // 拆分键值对的方式，解构出来的只有自定义属性和类名  
	let attrs = oName.attributes;
        [...attrs].forEach(attr => {
            // 解构获取键值 name 和 value 如有必要可以进行重命名
            let { name, value : expr } = attr;
            console.log(name, value);
        })
```

`innerText（不包含子元素的文本） textContent（包含子元素的文本） innerHTML outerHTML value(表单元素特有) classList（类名列表）`

增删改

`element.getAttribute(name)`

`element.setAttribute(name, value)`

`element.removeAttribute(keyName)`

### 父子、兄弟节点

三个判定属性 `nodeType` `nodeName` `nodeValue`

[more](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)

#### 父亲节点

`parentNode`

#### 子节点列表

以下两个会出无法跳过换行，即会读取文本节点：`childNodes`  `firstChild` `lastChild`  

只读取元素节点：  `children`  `firstElementChild`  `lastElementChild` 

#### 兄弟节点

`nextSibling` `previousSibling`

### 自定义数据

`data-*`

`node.dataset`

复杂数据

`node.getAttribute("data-*")`

`JSON.parse(node.getAttribute('data-*'))` 解析成 `JSON`对象

### 节点位置信息

[看这篇文章把](https://juejin.im/post/6844903854157332487)



### 常用事件  

**MouseEvent** [more](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent)

meta:中文意思是可变化的意思

`click` 	`MouseEvent.shiftKey` `MouseEvent.ctrlKey` `MouseEvent.altKey` `MouseEvent.metaKey`

`dbclick` 

`mouseover` `mouseout`  传递到子元素

`mouseenter` `mouseleave`  不传递到资源

`mousemove` 

`mousedown` 按下未松开

`mouseup` 松开

**KeyboardEvent**[more](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent)

`keyup` 

`keydown`  `event.keyCode` (读取不区分大小写的字母和 `shift`等快捷键)

`keypress`  `event.charCode` （读取数组和区分大小写的字母）

**HTMLFormEvent** [more](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement)

`blur` `focus` `select` `change` 

这两个跟按钮的效果是一样的：`submit` `reset`

### 事件冒泡和捕获

冒泡：点击**子节点**，向父节点传递，直至 html文档。 **p -> div -> body -> html -> document**

捕获：点击**子节点**，从父节点向子节点传递，直至当前点击节点。

### 阻止事件

`event.preventDefault()` 阻止默认事件（如：点击超链接会跳转超链接），但不会阻塞后续事件

`event.stopPropagation()` 阻止事件冒泡或者捕获的传播

`event.stopImmediatePropagation()` 阻止后续相同类型的事件执行

### 事件委托

> 通过**父节点或祖先节点**给不存在的**子节点**绑定相应的事件,关键是使用 `event.target.nodeName` 获取创建的子节点

### 文档碎片

> 大量插入节点时提高效率的方式，
>
> 1、先创建一个父节点，
>
> 2、再将文档碎片插入到父节点中，
>
> 3、最后再将父节点插入到指定的位置

## 16、

`sort` 

默认排序顺序是在将元素**转换为字符串**，然后比较它们的UTF-16代码单元值序列构建的。

填入回调函数，根据返回值的正负来调整位置

## 17、

### ajax

> 1、用于表单验证和局部资源请求，但是会出现跨域问题，需要配合跨域技术使用。
>
> 2、异步的意思是不会干预原有JavaScript脚本执行，即不会刷新整个页面，也就是常说的局部刷新。

虽然ajax说的是 **asynchronous JavaScript and xml** 但现在xml已经被json所代替

1、实例化`XMLhtttpRequest`对象

​	1.1 可以插入大量方法（超时提醒）

```javascript
            xhr.timeout = 2000;
            xhr.ontimeout = function () {
                alert('当前网络状态不佳，请稍后重试')
            }
            xhr.onerror = function () {
                alert('无网络连接')
            }
```

​	1.2  `xhr.responseType = "json";`设置之后在后面不用 `JSON.parse()`解析

2、open(请求方法, url)

​	2.1 可以插入大量方法（设置响应头）

```JavaScript
            // 请求行
            xhr.open('POST', 'http://127.0.0.1:8000/server')
            // 请求头
            xhr.setRequestHeader('Content-Type','application/x-www-from-urlencode');
            // 设置自定义的请求头浏览的安全机制会报错，需要后端配合
            xhr.setRequestHeader('name','zoulam');
            // 请求体
            xhr.send('username=zoulam&password=123456');
```

3、send(body) 发送请求

4、readyState是xhr的声明周期  onreadystatechange：即监听状态改变

​		0：未初始化

​		1：open执行

​		2：send执行

​		3：服务端（开始）返回部分数据

​		4：服务端返回完整数据

当响应状态码在200-299之间即正确响应

```JavaScript
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:3000/test);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log(xhr.response);
                        ans.innerHTML = xhr.response;
                    }
                }
            }
```

其他方法

 `x.abort();`取消请求

下面的例子是实现简单防抖

```JavaScript
<body>
    <button>send</button>
    <button>cancel</button>
    <script>
        const btn = document.querySelectorAll('button');
        let x = null;
        let isSending = false;
        btn[0].onclick = function () {
            // 上一条请求未完成则取消请求
            if(isSending) x.abort();
            x = new XMLHttpRequest();
            isSending = true;
            x.open('GET', 'http://127.0.0.1:8000/outtime')
            x.send();
            x.onreadystatechange = function () {
                if (x.readyState === 4){
                    isSending = false;
                }
            }
        }
        btn[1].onclick = function () {
            x.abort();
        }
    </script>
</body>
```

### axios

这是现在常用的ajax请求库，支持promise语法，更加友好

### fetch

新增的全局函数，支持promise语法

`fetch(url,{options})`

[具体使用](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

## 18、

垃圾回收器是周期性运行的，而不是每时每刻

`标记清除` 

添加标记，离开环境时清除

```javascript
function addTen(num){  
   var sum += num;  //垃圾收集已将这个变量标记为“进入环境”。
    return sum;      //垃圾收集已将这个变量标记为“离开环境”。
 }
 addTen(10);  //输出20
```

```javascript
var user = {name : 'scott', age : '21', gender : 'male'}; //在全局中定义变量，标记变量为“进入环境”

user = null;  //最后定义为null，释放内存
```

`引用计数`

​	记录每个变量被引用的次数，当引用次数为0时就回收内存中的变量空间

**注**：出现循环引用会出现无法清除的情况，即引用计数始终为 `1`

```JavaScript
function test() {
    var a = new Object();//a引用次数=1
    var b = new Object();//b引用次数=1
    // var c = a;//a引用次数++   ==2
    // var d = b;//b引用次数++   ==2
    //循环引用永远无法被引用清除
    a.prop = b;//b=2
    b.prop = a;//a=2
    //引用清除（手动）
    a=null;
    b=null;
}
```



## 19、

数组API见4

### String

[more](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

`trim trimStart trimEnd tolowerCase toUpperCase startsWith`

`slice split replace indexOf includes`

`charAt` 直接用下标的方式代替 如 `String[5]` 取出字符串第六个字符

` charCodeAt`

### Math

`max min sqrt abs`

 ` floor ` -45.9=>-46 取更小的 45.9 =>45

`trunc` 抹零

`round` 四舍五入

指数运算`pow`  新语法 `**`  如二的十次方  `Math.pow(2, 10)`   或 `2 ** 10`

`parseFloat parseInt isNaN`

`1e9+7` 算法常用取模

`sign` 判断正负 **正0** **负-1**

[more](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

## 20、



## 21、

```javascript
Object.create = function(p) {
    function f(){};
    f.prototype = p;
    return new f();
}
```

## 22、

### 属性

| 属性     | 描述                                          |
| :------- | :-------------------------------------------- |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚）。       |
| host     | 设置或返回主机名和当前 URL 的端口号。         |
| hostname | 设置或返回当前 URL 的主机名。                 |
| href     | 设置或返回完整的 URL。                        |
| pathname | 设置或返回当前 URL 的路径部分。               |
| port     | 设置或返回当前 URL 的端口号 **一般无法查看**  |
| protocol | 设置或返回当前 URL 的协议。                   |
| search   | 设置或返回从问号 (?) 开始的 URL（查询部分）。 |

### 方法

| 属性      | 描述                     |
| :-------- | :----------------------- |
| assign()  | 加载新的文档。           |
| reload()  | 重新加载当前文档。       |
| replace() | 用新的文档替换当前文档。 |

## 23、

①DNS解析url 成ip地址，

②建立TCP连接，

③发送HTTP请求，

④服务器处理并返回报文，

⑤浏览器渲染页面，

> 读取HTML文档

1、创建DOM树，即创建document对象，解析html元素和字符数据，添加element节点和text节点到document中。此时， `document.readyState='loading'`.

2、遇到`<link />`引入外部css，创建线程加载，并继续解析文档

// 3.1或3.2 和 6 的顺序不是完全准确，可以颠倒

3、遇到 `<script>`引入外部JS

​	3.1、设置 `async`：异步加载脚本

​	3.2、设置 `defer='defer'`:延迟执行

|                  | async                                                      | defer                    |
| ---------------- | ---------------------------------------------------------- | ------------------------ |
| 引用             | 仅在外部引入生效 `src`                                     | 同                       |
| 下载             | 立即下载                                                   | 同                       |
| 顺序（两个相同） | 两个 `async` 无法确定顺序                                  | 两个 `defer`从上至下执行 |
| 全局顺序         | `window.onload` 之前，但无法保证 `DOMcontentloaded` 的前后 | 同                       |

4、遇到 img 等先解析dom结构，再引入 src 资源

5、document触发`DOMcontentloaded`事件，标志着程序执行由同步脚本执行阶段转化为事件驱动阶段

6、文档解析完成，此时  `document.readyState='interactive'`

7、所有静态资源加载完， `document.readyState='complete'` ，`window.onload`执行

8、此时异步响应方式处理用户输入、网络事件等

⑥连接结束

## 24、

## 生产模式下（`mode:production`）

### jsonp

利用script **src**请求资源不存在跨域问题，只能是get请求。

前端通过，`query`可以直接约定函数名，Jquery就是这样实现的。

```javascript
const express = require('express');
const app = express();
app.listen(3000);
app.get('/jsonp-server', (req, res) => {
    let data = {
        test: 'i am a jsonp '
    }
    let ans = JSON.stringify(data);
    res.end(`handle(${ans})`)
});
```

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="jsonp"></div>
    <script>
        function handle(data) {
            document.getElementById('jsonp').innerHTML = data.test;
        }
    </script>
    <script src="http://localhost:3000/jsonp-server"></script>
</body>

</html>
```

### cors

**Cross-Origin Resource Sharing**

> 填入 `*` 表示所有的域都允许请求资源，会出现不能携带cookie的问题，所以可以设置白名单对象

```javascript
const express = require('express');
const app = express();
app.listen(3000);
const url = require('url');
const whiteList = {
    '张三': 'http://127.0.0.1:5501',
    '李四': 'http://127.0.0.1:9000',

}

app.get('/cros-server', (req, res) => {
    console.log(res);
    const origin = req.headers.origin;
    const name = req.query.name;
    if (whiteList.hasOwnProperty(name)) {
        res.setHeader('Access-Control-Allow-Origin', `${whiteList[name]}`);
    }
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Method', ['get', 'post', 'options']);
        if (req.method === "OPTIONS") {
            res.send('hello cros') //让前端能够快速返回
    }
});
```

## `mode:development`

(webpack) httpserver nginx  等。

## 25、

### 回流（Reflow）

回流又被称为重排，通过视口（viewport）**计算**出可见元素的位置和大小，计算过程是回流

### 重绘（Repaints）

将节点的其他单位转化为具体的px并绘制，称为重绘。

### where

元素的大小和位置发生变化就会触发回流和重绘

### 优化

1、合并对同一元素多次操作

2、通过添加**新**类名的方式，添加新样式

3、脱离文档流修改，再插入回文档流

[more](https://segmentfault.com/a/1190000017329980)

[google官方文档的performance](https://developers.google.com/web/fundamentals)

## 26、

`arguments`是过去JavaScript获取不确定参数个数的方式，是一个伪数组（对象）

## 27、

普通任务>宏任务>微任务

## 28、

## 29、

## 30、

## 31、

## 32、

## 33、

## 34、

默认返回`undefined`，构造函数返回`this`，

当构造函数的返回值为**引用数据类型**则返回**引用数据类型**

## 35、

**anonymous**匿名，即无详细错误信息

`SyntaxError`语法错误

`RangeError`范围错误

`RefferenceError`引用错误

`TypeError`类型错误

`URIError` 

`EvalError`

自定义错误 

```javascript
var error = new Error('代码错误');
console.error(error);
var error = new SyntaxError('代码错误');
console.error(error);
```

### 错误处理

> `try`包裹可能出现错误的语句，`throw`抛出错误信息，`catch(e)`捕获错误信息，参数`e`是错误对象包含 `name` 和 `message` 两个属性，`finally` 包裹必须执行的代码，防止前面的错误阻塞，

## 36、

|        | `keys()`                 | `values()`               | `entries()`                                       |
| ------ | ------------------------ | ------------------------ | ------------------------------------------------- |
| 存在点 | **数组、对象、Set、Map** | **数组、对象、Set、Map** | **数组、对象、Set、Map**                          |
| 返回值 | 数组                     | 数组                     | 可迭代对象(**对象的item是数组**) **[key, value]** |

## 37、

[more](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用`with`语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee` 当前函数
- 不能使用`arguments.caller` 函数调用者
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

# ES6

## 1、2、

### 全局声明

```javascript
var tmp = 123; 
let a = 5；
console.log(window.tmp, window.a) //123 undefined
```

### 暂时性死区

​	即使全局声明了tmp，但是`{}`用`let`声明了变量就会造成暂时性死区

```javascript
var tmp = 123;
{
	tmp = 'abc';//报错，Uncaught ReferenceError: tmp is not defined
	let tmp;
}
```



| 声明方式 | 变量提升 | 暂时性死区 | 重复声明 | 初始值 | 作用域 |
| :------: | :------: | :--------: | :------: | :----: | :----: |
|   var    |   允许   |   不存在   |   允许   | 不需要 | 除块级 |
|   let    |  不允许  |    存在    |  不允许  | 不需要 |  块级  |
|  const   |  不允许  |    存在    |  不允许  |  需要  |  块级  |

**注** `const`声明的是引用值时，只会保证存放在栈空间中的**地址指针**不变，而不能保证其元素不变

## 3、

解构赋值可以拆解元素，导包时重命名

## 4、

箭头函数无`this`指针，只能顺着词法作用域去找

声明时决定了`this` ，无法使用`call` 等修改`this`执行的函数改变`this`指向

## 5、

给复杂对象添加新的属性和方法可以直接避免重名，**即创建独一无二的key**

```JavaScript
let newProp = Symbol(1);
oldObject.newProp = 'newvalue'

let obj = {
    [Symbol('say')]: function(){
                console.log("我可以发言")
            },
}
```

## 6、

`Set`   

​	属性：`length` 是去重后存入的内容

`Map` 

Vue3.0中用到了

 `WeakMap`

 `WeakSet`

## 7、

[可以看看这个问题](https://www.zhihu.com/question/276403215/answer/386904542)

Proxy是构造函数，Proxy 的 handler 的各种 trap 分别对应 Reflect 上的同名方法

## 8、

Reflect是全局对象，

> ​	1、过去的JavaScript大量操作对象的功能都是使用命令式难以维护，现在使用函数式方便后续维护（后面新增的方法都会添加到`Reflect`对象上），函数式的好处：有返回值（可以描述操作结果和状态）。
>
> ​	2、使用元编程，反射（自反）的意义：

```javascript
// 函数.apply(对象, 数组)
Math.floor.apply({}, [1.75])

// Reflect.apply(函数，对象，数组)
Reflect.apply(Math.floor, {}, [1.75])
```



## 9、

## 10、

```JavaScript
const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧'];
let iterator = xiyou[Symbol.iterator]();
//调用对象的next方法
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log('-------------------------------------------');

//声明一个对象
const banji = {
    name: "终极一班",
    stus: [
        'xiaoming',
        'xiaoning',
        'xiaotian',
        'knight'
    ],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.stus.length) {
                    let res = { value: this.stus[index], done: false }
                    index++;
                    return res;
                }
                else {
                    return { value: undefined, done: true }
                }
            }
        };
    }
}

//遍历这个对象
for (let v of banji) {
    console.log(v);
}
```



## 11、

for 循环

forEach Array、Map、Set等遍历函数

for...in 无法保证顺序，用于遍历对象（注：`Symbol`除外）

for...of 内部实现了迭代器才能使用（**即：**按照自己的需求遍历）

## 12、

## 13、

`async`   隐式返回`Promise` 对象

 `await` 只能在 `async` 函数内部使用，通常右侧是`Promise` 函数

## 14、

## 15、

|                                            | Func指代ES6之前使用的构造函数 |
| ------------------------------------------ | ----------------------------- |
| `class{}`                                  | `Func`                        |
| `constructor(){}`                          | `Object.constructor`          |
| `extends`                                  | 多种实现                      |
| `super()` 放在构造函数中，此处传入父类参数 |                               |
| `static` 不会被实例化                      | `Func.key`                    |



## 16、

## 17、

|      | common.js       | ES6 module                           |
| ---- | --------------- | ------------------------------------ |
| 范围 | es3、node.js    | es6、web                             |
| 语法 | require/exports | import/export                        |
| 引入 |                 | `<script src="xx.js" type="module">` |

```javascript
const fs = require('fs');
exports.fs = fs;
module.exports = fs;
// 也可以通过结构赋值来操作，但这不是common.js规范带来的
// 恶心的使用
exports.test = {name:'zoulam'}
console.log(require('./2').test.name);
```

```javascript
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```



```javascript
exports.count = 0
setTimeout(function () {
  console.log( ++exports.count) //1
}, 500)

// commonjs.js
const {count} = require('./counter')
setTimeout(function () {
  console.log( count)// 0
}, 1000)

//es6.js
import {count} from './counter'
setTimeout(function () {
  console.log( count)// 0
}, 1000)
```

