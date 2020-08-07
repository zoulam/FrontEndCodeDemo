// 网络io 文件io
// io 讲的是一次性的操作
// stream 涓涓细流：如看视频的时候不用一次全部缓存完就能看


// process.stdout.write();

// 标准输入输出 Linux中的概念

// 标准输入输出，pipe是管道
// process.stdin获取输入数据，直接通过管道传递给process.stdout 输出数据
// process.stdin.pipe(process.stdout);


const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        req.pipe(res);
    }
});

const port = 3005;
server.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});