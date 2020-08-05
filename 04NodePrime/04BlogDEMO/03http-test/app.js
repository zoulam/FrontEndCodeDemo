const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];//将 querystring部分切割
    const query = querystring.parse(url.split('?')[1])// querystring

    //设置返回(server->client)格式为JSON
    res.setHeader('Content-type', 'application/json');

    // res.end('loading……');
    const resData = {
        method,
        url,
        path,
        query
    };

    if (method === 'GET') {
        res.end(
            JSON.stringify(resData)
        );
    }

    if (method === 'POST') {
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            resData.postData = postData;//将postData添加到resData中
            res.end(
                JSON.stringify(resData)
            );
        })
    }
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});
