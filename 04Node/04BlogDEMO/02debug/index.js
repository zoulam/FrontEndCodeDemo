const http = require('http')


const server = http.createServer((req, res) => {
    // 获取两个请求，一个是localhost文档一个是favicon.ico
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end('<h1>helloworld</h1>')
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});