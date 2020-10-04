常见OS面试题

## 进程（process）线程（thread）（前端面试常问）

> nodejs的进程可以访问计算机的大量信息，包括环境变量，软件版本等

```javascript
// console.log('process: ', process);// 打印进程信息
console.log('-------------------------------------------');
console.log(`当前工作目录是: ${process.cwd()}`); // current work dir 就是执行node命令的文件目录
console.log(process.versions.v8);
console.log(process.versions.node);
console.log(process.versions.http_parser);
console.log(process.versions.ares);
console.log(process.versions.openssl);
```

进程是资源分配的基本单位（进程可以理解成是一个程序的运行时状态）

​	进程间通信是很麻烦的（可以想象一下QQ和360共享信息~）

​	进程会占据一个独一无二的端口号（P_id）（冲突时需要kill掉）

线程是资源调度的基本单位（线程可以理解成是一个程序的一个功能）

​	共享地址空间的线程组成一个进程

[区别的理解](https://www.zhihu.com/question/25532384/answer/411179772)

[深入](https://www.zhihu.com/question/307100151/answer/894486042)

两个玩意我都稍微研究了一下，但是没看懂😅

## nodejs中的多进程(child_process)



## nodejs中的多线程(worker_threads)

[文章](https://zhuanlan.zhihu.com/p/74879045) 里面还讲了 cluster（集群）

# 文件

> 作用实现文件的增删查改，在实战中可以用于日志记录

## path

```javascript
// 两个全局变量
console.log('__dirname: ', __dirname);// 当前文件目录不包含文件
console.log('filename: ', __filename);// 完整路径（包含当前文件）

const path = require('path');
const { join, resolve } = require('path');// es6解构赋值更好用
// const  join  = require('path').join;// 上下两个效果相同

let extname = path.extname(__filename);// 解析文件后缀
console.log('extname', extname);
let basename = path.basename(__filename);
console.log('basename', basename);// 解析文件名(带后缀)
console.log('-------------------文件名拼接------------------------');
console.log(join(__dirname, basename));
// console.log(path.relative(A,B));// 从A文件到B文件的相对路径
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea'));
// 注：此处的斜杠是window下的
// ..\..
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/text/bbb'));
// ..\..\text\bbb
console.log('-------------------------------------------');
// console.log("global: ", global);
```

## fs

在10.22.0版本之后的nodejs中fs模块原生支持 promise语法，不用自行封装回调函数了

[fs.promises](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html)

结果都是Promise对象，可以使用then继续调用

```javascript
const fs = require('fs').promises
// 读
fs.readFile(path, { encoding: 'utf8' })
// 写
fs.writeFile(path, content, { encoding: 'utf8' })
// 重命名
fs.rename(path, newPath)
// 删除
fs.unlink(path)
```

完成复制 `data.txt` 并粘贴到 `copy/data-bak.txt`

```JavaScript
// 复制文件
const fs = require('fs');
const path = require('path');
// 创建目录
const curpath = path.join(__dirname, 'copy')
fs.mkdir(curpath, { recursive: true }, (err) => {
    if (err) throw err;
});

// 被复制文件
const fileName1 = path.resolve(__dirname, 'data.txt')
// 复制文件
const fileName2 = path.resolve(curpath, 'data-bak.txt')

// 创建读写流
const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream);
// 监听数据处理
readStream.on('data', chunk => {
    console.log(chunk.toString());
})
// 监听读写结束
console.log();
readStream.on('end', () => {
    console.log(`finish copy!`);
})
```

## 流（strem）

流的使用流程是

1、创建读写流  `const readStream = fs.createReadStream(路径名)`

2、`读.管道(写)`

3、监听

[入门文章](https://zhuanlan.zhihu.com/p/36728655)

面试题：你对node.js中stream的理解

> 流是文件以流水的形式通过管道 `pipe` 流向另一个位置的描述，[可以参考这个StackOverflow的问答](https://stackoverflow.com/questions/1216380/what-is-a-stream)

## Buffer（二进制形式）String



## 文件写入

向 `test.txt` 写入`我是zoulam\n`

```javascript
const fs = require('fs');
// 统一路径处理，兼容Mac和Windows
const path = require('path');

const fileName = path.resolve(__dirname, 'test.txt')


// 写
const content = '我是zoulam\n';
const opt = {
    flag: 'a',// 'a' 是add追加 'w'是write重写覆盖
}

fs.writeFile(fileName, content, opt, (err) => {
    if (err) {
        console.error(err)
        return
    }
});
// 只写入一行，大量操作也是极其耗费内存的



// 读
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    // data(二进制)=>字符串
    console.log(data.toString());
});
// 如果大文件读取会极大消耗内存

// 判断文件是否存在 exists api被废弃
// fs.exists(fileName, (exists) => {
//     console.log('exists:', exists);
// })

file = path.basename(fileName)
// 逻辑，没有错误就存在
fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});
```



## 文件读取

### 整个读取

### 行读取：用于分析日志

```JavaScript
const fs = require('fs');
const path = require('path');
const readline = require('readline');


const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');
console.log(fileName);
// F:\Code\vscode\FrontEndCodeDemo\04Node\04BlogDEMO\04blog1\logs\access.log
// 创建read stream
const readStream = fs.createReadStream(fileName);

// 创建readline 对象

const rl = readline.createInterface({
    input: readStream
})
let chromeNum = 0;
let sum = 0;
// lineData 就是读取的数据
rl.on('line', (lineData) => {
    if (!lineData) { // 剔除空行
        return
    }
    sum++
    const arr = lineData.split('--');
    // 日志包含chrome关键字
    if (arr[2] && arr[2].indexOf('Firefox') > 0) {
        chromeNum++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log('Chrome占比:',((chromeNum / sum) * 100).toFixed(2) + "%");
})
```

## http文件读取

`data.text`

```
helloworld
firefox
chrome
webkit
safari
```



```javascript
// httpReadFile.js
const fs = require('fs');
const path = require('path');
const http = require('http');


const fileName1 = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res);
    }
});


const port = 3005;
server.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
```

![读取结果](https://zoulam-pic-repo.oss-cn-beijing.aliyuncs.com/img/image-20200916100146140.png)