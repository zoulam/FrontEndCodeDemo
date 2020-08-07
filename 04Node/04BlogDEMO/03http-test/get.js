const http = require('http')
const querystring = require('querystring');


const server = http.createServer((req, res) => {
    console.log('reqMethod: ', req.method);//GET
    const url = req.url;// 获取完整url
    console.log('url: ', url);
    req.query = querystring.parse(url.split('?')[1]);//解析query string
    console.log('query:' , req.query);
    res.end(//将query string 返回
        JSON.stringify(req.query)
    );

});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});