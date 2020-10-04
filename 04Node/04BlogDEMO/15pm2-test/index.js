const http = require('http');
const server = http.createServer((req, res) => {
    // 模拟日志
    console.log("普通日志");
    console.error("错误日志");


    // if (req.url === '/err') {
    //     throw new Error('我就是一个错误')
    // }
    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            erron: 0,
            msg: 'this is a pm2 test'
        })
    )
})

server.listen(3000, () => {
    console.log('http://localhost:3000');
})