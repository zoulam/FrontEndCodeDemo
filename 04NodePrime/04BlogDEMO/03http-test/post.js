const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // post信息：数据格式
        console.log('req conteng-type', req.headers['content-type']);
    }
    // 接收数据 req.on(string,callback) 接收客户端传来的数据
    let postData = "";
    req.on('data', chunk => {// （一块块）小份数据
        postData += chunk.toString();
    });

    req.on('end', chunk => {
        console.log('postData',postData);
        res.end('hello world');// 在这里返回，因为是异步的
    });
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});
